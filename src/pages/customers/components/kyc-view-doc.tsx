import React from 'react';
import { customerService } from '@/api/services/customers/customer.service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const PDFViewerModal = ({ isOpen, onClose, title = 'Document Viewer' }: PDFViewerModalProps) => {
  const { id } = useParams();
  
  const { data: pdfUrl, isLoading: loadingKyc, error } = useQuery({
    queryKey: ['customer-kycfile', id],
    queryFn: async () => {
      try {
        const response = await customerService.getCustomerKycFile(id);
        
        console.log('Response type:', typeof response);
        
        let pdfBlob: Blob;
        if (typeof response === 'string') {
          const byteCharacters = Array.from(response).map(char => char.charCodeAt(0));
          const byteArray = new Uint8Array(byteCharacters);
          
          pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
          
          console.log('Created Blob size:', pdfBlob.size);
        } else {
          throw new Error('Expected string response');
        }
        
        const url = URL.createObjectURL(pdfBlob);
        console.log('Created URL:', url);
        return url;
      } catch (error) {
        console.error('Error loading PDF:', error);
        throw error;
      }
    },
  });

  React.useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  console.log('PDF URL:', pdfUrl);
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {loadingKyc ? (
          <div className="flex items-center justify-center h-full">
            Loading document...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <div className="text-center">
              <div className="font-medium">Error loading document</div>
              <div className="text-sm mt-1">{error instanceof Error ? error.message : 'Please try again'}</div>
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full h-full min-h-[60vh]">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                className="rounded-md"
                title="PDF Viewer"
                // sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No document available
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerModal;