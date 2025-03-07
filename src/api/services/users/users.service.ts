import { APIClient } from '../../axios/instance';

class UsersService extends APIClient {
    constructor() {
        super('baseService');
    }

    getUsers(data: any) {
        return this.post<any>('/users/get', data);
    }

    getUser(id: string) {
        return this.get<any>(`/users/${id}`);
    }

    createUser(data: any) {
        return this.post<any>('/users', data);
    }

    updateStatus(id: number) {
        return this.put<any>('/users/'+ id);
    }
}

export const usersService = new UsersService();