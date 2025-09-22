export type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    verifiedAt?: string | null,
    createDate: Date
}