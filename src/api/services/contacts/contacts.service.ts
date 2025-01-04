

import { APIClient } from '../../axios/instance';


class ContactServices extends APIClient {
        constructor() {
                super('baseService');
        }

        uploadPhoneBook(data: FormData) {
            return this.post('/phonebook/upload', data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
        }

        getPhoneBooks() {
            return this.get('/phonebook');
        }

        getPhoneBookById(id: string | number) {
            return this.get(`/phonebook/${id}`);
        }

        getCustomerPhoneBooks() {
            return this.get('/phonebook/customer');
        }
       
}

export const contactService = new ContactServices();