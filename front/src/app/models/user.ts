export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    gender: string;
    createDate: string;
    verifiedEmail: boolean;
    verificationCode: number;
    avatarKey: string;
}
