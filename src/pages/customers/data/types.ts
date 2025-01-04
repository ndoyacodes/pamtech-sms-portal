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
    kycFile: any;
    customerType: CustomerType;
    countryCode: string;
    //Typo from the API
    phoneNumber: string; 
    password: string;
    confirmPassword: string;
}

export interface CustomerData  {
    
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    timezone: string;
    status: boolean;
    language: string;
    companyName: string;
    website: string;
    customerType: CustomerType;


}  
//   {
//         "id": 52,
//         "email": "widambedeograss5@gmail.com",
//         "firstName": "DEOGRASS",
//         "lastName": "WIDAMBE",
//         "timezone": "Africa/Dar_es_Salaam",
//         "status": false,
//         "language": "en",
//         "companyName": "Widambe LTD",
//         "website": "http://localhost:5173/sign-up",
//         "customerType": "POSTPAID"
//     },