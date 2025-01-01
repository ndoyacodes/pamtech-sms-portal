export type CustomerType = 'POSTPAID' | 'PREPAID';

export interface CustomerPostData {
    email: string;
    firstName: string;
    lastName: string;
    timezone: string;
    status: boolean;
    language: string;
    companyName: string;
    website: string;
    kycFile: string;
    customerType: CustomerType;
    countryCode: string;
    //Typo from the API
    phoneNUmber: string; 
    password: string;
    confirmPassword: string;
}

export interface CustomerData extends CustomerPostData {
    id: number;  
}