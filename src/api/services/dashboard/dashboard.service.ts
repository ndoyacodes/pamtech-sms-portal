import { APIClient } from '../../axios/instance';

class DashboardService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all messages with pagination
    getCustomerDashboardData() {
        return this.get<any>('/dashboard/customer');
    }

   
}

export const dashboardService = new DashboardService();