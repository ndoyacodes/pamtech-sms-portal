  // User Information Type
  export interface UserInfo {
    userId: string;
    phoneNumber: string;
    email: string;
    roles: string[];
    permissions: string[];
    firstName?: string;
    lastName?: string;
    currentMembershipSaccoId?: string | null;
  }
  
  // Authentication State Type
  export interface AuthState {
    user: UserInfo | null;
    tokens: {
      access: string | null;
      refresh: string | null;
    };
    isAuthenticated: boolean;
  }
  