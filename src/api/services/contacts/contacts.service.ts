import { APIClient } from '../../axios/instance'

class ContactServices extends APIClient {
  constructor() {
    super('baseService')
  }

  uploadPhoneBook(data: FormData, p0: { name: string; description: string }) {
    return this.post(
      `/phonebook/upload?name=${p0.name}&description=${p0.description}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  addPhoneBookNumber(data: any) {
    return this.post('/phonebook/add-number', data)
  }

  getPhoneBooks(p0: { page: number; size: number }) {
    return this.get('/phonebook', p0)
  }

  getPhoneBookNUmbers(id: string | number, p0: { page: number; size: number }) {
    return this.get(`/phonebook/numbers/${id}`, p0)
  }

  getPhoneBookById(id: string | number) {
    return this.get(`/phonebook/${id}`)
  }

  getCustomerPhoneBooks(p0: { page: number; size: number }) {
    return this.get('/phonebook/customer', p0)
  }

    deletePhoneBookNumber(id: string | number) {
        return this.delete(`/phonebook/delete-number/${id}`)
    }
}

export const contactService = new ContactServices()
