import { APIClient } from '../../axios/instance';

interface SenderIdData {
    id: number;
    senderId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    // Add other relevant fields based on your API response
}

class SenderIdService extends APIClient {
        constructor() {
                super('baseService');
        }

        // Get all sender IDs with pagination
        getSenderIds(params?: { page?: number; size?: number }) {
                return this.get<SenderIdData[]>('/sender-id', params);
        }

        // Get a single sender ID by ID
        getSenderIdById(id: any) {
                return this.get<SenderIdData>(`/sender-id/${id}`);
        }

            // Get a single sender ID by ID
        approveSenderId(data: any) {
                return this.post<SenderIdData>(`/sender-id/approve`, data);
        }

        // Create a new sender ID
        createSenderId(data: Partial<SenderIdData>) {
                return this.post<SenderIdData>('/sender-id', data);
        }

        // Update a sender ID
        updateSenderId(_id: number, data: Partial<SenderIdData>) {
                return this.put<SenderIdData>(`/sender-id`, data);
        }

        // Delete a sender ID
        deleteSenderId(id: number) {
                // @ts-ignore
          return this.delete<void>(`/sender-id/${id}`);
        }

        getCustomerSenderIds(p0: { page: number; size: number; }) {
            return this.get('/sender-id/customer', p0);
        }
}

export const senderIdService = new SenderIdService();