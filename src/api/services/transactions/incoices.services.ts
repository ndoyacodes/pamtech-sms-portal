import { APIClient } from '../../axios/instance';

class InvoicesService extends APIClient {
        constructor() {
                super('baseService');
        }
        
        // Get all campaigns
        getInvoices(params?: { page?: number; size?: number }) {
                return this.get<any[]>('/transactions/invoices', params);
        }

}

export const invoicesService = new InvoicesService();