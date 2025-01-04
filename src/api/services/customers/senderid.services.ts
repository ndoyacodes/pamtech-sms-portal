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
        getSenderIdById(id: string) {
                return this.get<SenderIdData>(`/sender-id/${id}`);
        }

        // Create a new sender ID
        createSenderId(data: Partial<SenderIdData>) {
                return this.post<SenderIdData>('/sender-id', data);
        }

        // Update a sender ID
        updateSenderId(id: number, data: Partial<SenderIdData>) {
                return this.patch<SenderIdData>(`/sender-id/${id}`, data);
        }

        // Delete a sender ID
        deleteSenderId(id: number) {
                return this.delete<void>(`/sender-id/${id}`);
        }
}

export const senderIdService = new SenderIdService();