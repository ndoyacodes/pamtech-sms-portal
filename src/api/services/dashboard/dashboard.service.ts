import { APIClient } from '../../axios/instance';

class DashboardService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all messages with pagination
    getCustomerDashboardData() {
        return this.get<any>('/dashboard/customer');
    }

    getCustomerChartsData() {
    return this.get<any>('/dashboard/customer/chat');
   }

   generateCustomerApiKey() {
    return this.get<any>('/api-key/generate');
   }

   
}

export const dashboardService = new DashboardService();