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

    // Get a single customer by ID
    getCustomerById(id: string) {
        return this.get<CustomerData>(`/customer/${id}`);
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
        return this.delete<void>(`/customer/${id}`);
    }
}

export const customerService = new CustomerService();