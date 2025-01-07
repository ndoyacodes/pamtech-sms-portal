import { APIClient } from '../../axios/instance';

interface MessageData {
    id: number;
    content: string;
    recipients: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
}


class MessageService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all messages with pagination
    getMessages(params?: { page?: number; size?: number }) {
        return this.get<MessageData[]>('/sms', params);
    }

    // Get a single message by ID
    getMessageById(id: string) {
        return this.get<MessageData>(`/sms/${id}`);
    }

    // Send bulk SMS
    sendBulkSMS(data: any) {
        return this.post<MessageData>('/sms/send-bulk', data, 
            {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
        );
    }
}

export const messageService = new MessageService();