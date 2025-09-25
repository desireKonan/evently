export type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    verifiedAt?: string | undefined,
    createdAt: Date,
    updatedAt?: Date | undefined
}