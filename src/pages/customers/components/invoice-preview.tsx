import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/custom/button';
  import { Badge } from '@/components/ui/badge';
  import { useMutation } from '@tanstack/react-query';
  import { toast } from 'react-toastify';
  import { reportService } from '@/api/services/customers/invoice.service';
  
  interface InvoicePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    invoiceData: {
      invoiceNumber: string | null;
      invoiceId: number;
      invoiceDate: string;
      invoiceStatus: string;
      customerName: string;
      customerEmail: string;
      customerId: number;
      smsCount: number;
      total: number;
      smsSummaryData: {
        sender: string;
        price: number;
        network: string;
        smsSent: number;
        amount: number;
      }[];
    };
    period: string; // Add period as a prop
    onSendSuccess?: () => void;
  }
  
  export default function InvoicePreviewModal({ 
    isOpen, 
    onClose, 
    invoiceData,
    period,
    onSendSuccess
  }: InvoicePreviewModalProps) {
    const { mutate: sendInvoice, isPending } = useMutation({
      mutationFn: () => reportService.generateInvoice({
        invoiceId: invoiceData.invoiceId,
        customerId: invoiceData.customerId,
        period: period
      }),
      onSuccess: () => {
        toast.success('Invoice sent successfully');
        onClose();
        onSendSuccess?.();
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || 'Failed to send invoice';
        toast.error(errorMessage);
      }
    });
  
    const getStatusBadge = (status: string) => {
      const statusClasses: Record<string, string> = {
        SENT: 'bg-blue-500',
        PAID: 'bg-green-500',
        PENDING: 'bg-yellow-500',
        CANCELLED: 'bg-red-500',
        DEFAULT: 'bg-gray-500'
      };
  
      return (
        <Badge className={statusClasses[status] || statusClasses.DEFAULT}>
          {status}
        </Badge>
      );
    };

    console.log(invoiceData)
  
    const handleSendInvoice = () => {
      if (!invoiceData.invoiceId) {
        toast.error('Invoice ID is missing');
        return;
      }
      if (!period) {
        toast.error('Period is missing');
        return;
      }
      sendInvoice();
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>
  
          <div className="space-y-6">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">{invoiceData.customerName}</h3>
                <p className="text-sm text-muted-foreground">{invoiceData.customerEmail}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  {getStatusBadge(invoiceData.invoiceStatus)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {invoiceData.invoiceDate}
                </p>
                {invoiceData.invoiceNumber && (
                  <p className="text-sm text-muted-foreground">
                    Invoice #: {invoiceData.invoiceNumber}
                  </p>
                )}
              </div>
            </div>
  
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total SMS</p>
                <p className="text-xl font-semibold">
                  {invoiceData.smsCount}
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-xl font-semibold">
                  {invoiceData?.total?.toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'TZS',
                    minimumFractionDigits: 2
                  })}
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Customer ID</p>
                <p className="text-xl font-semibold">{invoiceData.customerId}</p>
              </div>
            </div>
  
            {/* SMS Breakdown Table */}
            <div>
              <h4 className="font-medium mb-3">SMS Breakdown</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left text-xs font-medium">Sender</th>
                      <th className="p-3 text-left text-xs font-medium">Network</th>
                      <th className="p-3 text-right text-xs font-medium">SMS Sent</th>
                      <th className="p-3 text-right text-xs font-medium">Price/SMS</th>
                      <th className="p-3 text-right text-xs font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {invoiceData?.smsSummaryData?.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 text-sm">{item.sender}</td>
                        <td className="p-3 text-sm">{item.network}</td>
                        <td className="p-3 text-sm text-right">
                          {item.smsSent.toLocaleString()}
                        </td>
                        <td className="p-3 text-sm text-right">
                          {item.price.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'TZS',
                            minimumFractionDigits: 2
                          })}
                        </td>
                        <td className="p-3 text-sm text-right">
                          {item.amount.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'TZS',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <div className="flex justify-end pt-4 gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={handleSendInvoice}
              loading={isPending}
              disabled={isPending || invoiceData.invoiceStatus === 'SENT'}
            >
              {invoiceData.invoiceStatus === 'SENT' ? 'Already Sent' : 'Send Invoice'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }