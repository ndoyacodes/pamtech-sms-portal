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
        const base64String: string = await customerService.getCustomerKycFile(id);

        // 1. Decode the Base64 string to a Uint8Array
        const byteCharacters = atob(base64String); // Decode Base64
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'application/pdf' }); // Create Blob from Uint8Array
        const url = URL.createObjectURL(blob);
        return url;

      } catch (error) {
        console.error('Error loading PDF:', error);
        throw error;
      }
    },
  });  

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