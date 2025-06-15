import { APIClient } from '../../axios/instance';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: 'male' | 'female';
  address: string;
  date_of_birth: string;
  profile: string;
}

class AuthService extends APIClient {
  constructor() {
    super('baseService');
  }

  login(credentials: LoginCredentials) {
    return this.post<LoginResponse>('/auth/login', credentials);
  }

  
 regieter(credentials: any) {
  console.log('Sending registration data:', credentials); 
  return this.post<any>('/auth/register', credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

  currentUserProfile() {
    return this.get<UserInfo>('/user/profile/');
  }

  updateCurrentUserProfile(data: any) {
    return this.put<UserInfo>('/user/profile/', data);
  }

  logout() {
    return this.post<void>('/auth/logout');
  }
 

  forgetReset(data:any) {
    return this.post<void>('/auth/password-reset/', data)
  }

  resetPassword(token: string, email: string, data: Record<string, any>) {
    const params = new URLSearchParams({ 'reset-token': token, email });

    return this.post<any>(`/auth/password-reset?${params.toString()}`, data);
  }

  forgetPassword(data:any) {
    return this.post<void>('/auth/forgot-password', data);
  }

  verifyPhone(data:any) {
    return this.post<void>('/auth/verify', data);
  }
}

export const authService = new AuthService();
