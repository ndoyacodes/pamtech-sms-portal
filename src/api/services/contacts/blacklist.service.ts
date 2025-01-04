

import { APIClient } from '../../axios/instance';

// Define interface for Blacklist data
interface BlacklistData {
    id: string;
    // Add other relevant fields here
}

class BlacklistService extends APIClient {
        constructor() {
                super('baseService');
        }

        // Get all blacklist entries with pagination
        getBlacklist(params?: { page?: number; size?: number }) {
                return this.get<BlacklistData[]>('/blacklist', params);
        }

        // Get a single blacklist entry by ID
        getBlacklistById(id: string) {
                return this.get<BlacklistData>(`/blacklist/${id}`);
        }

        // Get blacklist entries for all customers
        getCustomerBlacklist() {
                return this.get<BlacklistData[]>('/blacklist/customer');
        }

        // Get blacklist entries for a specific customer
        getCustomerBlacklistById(customerId: string) {
                return this.get<BlacklistData[]>(`/blacklist/customer/${customerId}`);
        }

        // Create a new blacklist entry
        createBlacklistEntry(data: Partial<BlacklistData>) {
                return this.post<BlacklistData>('/blacklist', data);
        }

        // Delete a blacklist entry
        deleteBlacklistEntry(id: number) {
                return this.delete<void>(`/blacklist/${id}`);
        }
}

export const blacklistService = new BlacklistService();