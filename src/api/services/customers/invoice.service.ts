import { APIClient } from '../../axios/instance';

class InvoiceService extends APIClient {
    constructor() {
        super('baseService');
    }

    previewInvoice(data:any){
        return this.post<any>('/invoice/preview', data);
    }

    generateInvoice(data:any){
        return this.post<any>('/invoice/generate', data);
    }
}

export const reportService = new InvoiceService();