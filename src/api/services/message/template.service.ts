import { APIClient } from '../../axios/instance';

interface TemplateData {
    id: number;
    name: string;
    content: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

class TemplateService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Get all templates with pagination
    getTemplates(params?: { page?: number; size?: number }) {
        return this.get<TemplateData[]>('/templates', params);
    }

    // Get a single template by ID
    getTemplateById(id: string) {
        return this.get<TemplateData>(`/templates/${id}`);
    }

    // Create a new template
    createTemplate(data: Partial<TemplateData>) {
        return this.post<TemplateData>('/templates', data);
    }

    // Update a template
    updateTemplate(id: number, data: Partial<TemplateData>) {
        return this.patch<TemplateData>(`/templates/${id}`, data);
    }

    // Delete a template
    deleteTemplate(id: number) {
        return this.delete<void>(`/templates/${id}`, {id: id});
    }

    getCustomerTemplates(id:any,p0: { page: number; size: number; }) {
        return this.get(`/templates/customer/${id}`, p0);
    }
}

export const templateService = new TemplateService();