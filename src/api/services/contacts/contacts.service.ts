

import { APIClient } from '../../axios/instance';


class ContactServices extends APIClient {
        constructor() {
                super('baseService');
        }

        uploadPhoneBook(data: FormData, p0: { name: string; description: string; }) {
            return this.post(`/phonebook/upload?name=${p0.name}&description=${p0.description}`, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
        }

        getPhoneBooks(p0: { page: number; size: number; }) {
            return this.get('/phonebook', p0);
        }

        getPhoneBookById(id: string | number) {
            return this.get(`/phonebook/${id}`);
        }

        getCustomerPhoneBooks(p0: { page: number; size: number; }) {
            return this.get('/phonebook/customer', p0);
        }
       
}

export const contactService = new ContactServices();