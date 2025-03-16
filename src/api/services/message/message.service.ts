import { APIClient } from '../../axios/instance';

class MessageService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all messages with pagination
    /*getMessages(params?: { page?: number; size?: number }) {
        return this.get<any[]>('/sms', params);
    }*/

    getMessages(data: any) {
        return this.post<any[]>('/sms/search', data);
    }

  searchMessages(data: any) {
    return this.post<any[]>('/sms/search', data);
  }

    // Get a single message by ID
    getMessageById(id: string) {
        return this.get<any>(`/sms/${id}`);
    }

    // Quick Send
    sendBulkSMS(data: any) {
        return this.post<any>('/sms/send-bulk', data, 
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
        );
    }
}

export const messageService = new MessageService();