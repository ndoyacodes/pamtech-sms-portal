import { APIClient } from '../../axios/instance';

interface MessageData {
    id: number;
    content: string;
    recipients: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface BulkSMSRequest {
    recipients: string[];
    message: string;
    templateId?: number;
}

class MessageService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all messages with pagination
    getMessages(params?: { page?: number; size?: number }) {
        return this.get<MessageData[]>('/api/sms', params);
    }

    // Get a single message by ID
    getMessageById(id: string) {
        return this.get<MessageData>(`/api/sms/${id}`);
    }

    // Send bulk SMS
    sendBulkSMS(data: BulkSMSRequest) {
        return this.post<MessageData>('/api/sms/send-bulk', data);
    }
}

export const messageService = new MessageService();