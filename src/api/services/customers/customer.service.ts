import { CustomerData } from '@/pages/customers/data/types';
import { APIClient } from '../../axios/instance';

class CustomerService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all customers with pagination
    getCustomers(params?: { page?: number; size?: number }) {
        return this.get<CustomerData>('/customer', params);
    }

    //approve customer
    approveCustomer(data:any){
        return this.post<any>('/customer/approve', data);
    }

    // Get a single customer by ID GET
    getCustomerById(id: any) {
        return this.get<any>(`/customer/${id}`);
    }

     // Get a single customer by ID
     getCustomerKycFile(id: any) {
        return this.get<any>(`/customer/attachment/${id}`,{})
    }

    // Create a new customer
    createCustomer(data: any) {
        return this.post<CustomerData>('/customer', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    }

    // Update a customer
    updateCustomer(id: number, data: Partial<any>) {
        return this.patch<CustomerData>(`/customer/${id}`, data, 
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
        );
    }

    // Delete a customer
    deleteCustomer(id: number) {
        return this.delete<void>(`/customer/${id}`, {id: id});
    }


    uploadCustomerAttachment(data: FormData) {
        return this.post('/api/attachment', data, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
}
}




export const customerService = new CustomerService();