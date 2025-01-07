import { APIClient } from '../../axios/instance';

class PlanService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all plans with pagination
    getPlans(params?: { page?: number; size?: number }) {
        return this.get<any>('/plan', params);
    }

    // Get a single plan by ID
    getPlanById(id: string) {
        return this.get<any>(`/plan/${id}`);
    }

    // Create a new plan
    createPlan(data: any) {
        return this.post<any>('/plan', data);
    }

    createPlanSUbscription(data: any) {
        return this.post<any>('/plan/subscribe', data);
    }

    // Update a plan
    updatePlan(id: number, data: Partial<any>) {
        return this.patch<any>(`/plan/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    // Delete a plan
    deletePlan(id: number) {
        return this.delete<void>(`/plan/${id}`, {id:id});
    }
}

export const planService = new PlanService();