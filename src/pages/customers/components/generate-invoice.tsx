import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import InvoicePreviewModal from './invoice-preview';
import { reportService } from '@/api/services/customers/invoice.service';

interface GenerateInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  customer: {
    id: number;
    name: string;
    email: string;
  };
}

const formSchema = z.object({
  period: z.string()
    .min(1, 'Month is required')
    .regex(/^\d{4}-\d{2}$/, 'Must be in YYYY-MM format')
    .refine(value => {
      const [year, month] = value.split('-').map(Number);
      const inputDate = new Date(year, month - 1);
      const now = new Date();
      const maxDate = new Date(now.getFullYear(), now.getMonth() - 1);
      return inputDate <= maxDate;
    }, 'Cannot select current or future months'),
  customerId: z.number()
});

interface InvoiceData {
  invoiceNumber: string | null;
  invoiceId: number;
  invoiceDate: string;
  invoiceStatus: string;
  customerName: string;
  customerEmail: string;
  customerId: number;
  period: string;
  smsCount: number;
  total: number;
  smsSummaryData: {
    sender: string;
    price: number;
    network: string;
    smsSent: number;
    amount: number;
  }[];
}

export default function GenerateInvoice({ 
  isOpen, 
  onClose, 
  title = 'Generate Invoice', 
  customer 
}: GenerateInvoiceProps) {
  const [generatedInvoice, setGeneratedInvoice] = useState<InvoiceData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(''); // Track the selected period
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period: '',
      customerId: customer.id
    },
  });

  const { mutate: generateInvoice, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => 
      reportService.previewInvoice(data),
    onSuccess: (data: InvoiceData) => {
      queryClient.invalidateQueries({ queryKey: ['invoice', 'customer-details'] });
      setGeneratedInvoice({
        ...data,
        period: selectedPeriod, // Include the period in the invoice data
      });
    },
    onError: (error: any) => {
      const errorMessage = 
        error?.response?.data?.message || 'Failed to generate invoice';
      toast.error(errorMessage);
    }
  });

  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() - 1);
  const maxMonth = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, '0')}`;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setSelectedPeriod(values.period); // Store the selected period
    generateInvoice(values);
  };

  const handlePreviewClose = () => {
    setGeneratedInvoice(null);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period *</FormLabel>
                    <Input 
                      type="month" 
                      {...field} 
                      placeholder="Select month"
                      max={maxMonth}
                      required
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  loading={isPending}
                >
                  Generate Invoice
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {generatedInvoice && (
        <InvoicePreviewModal 
          isOpen={!!generatedInvoice}
          onClose={handlePreviewClose}
          invoiceData={generatedInvoice}
          period={selectedPeriod}
        />
      )}
    </>
  );
}