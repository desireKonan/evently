export type User = {
    id: string,
    organizer_id: string,
    organizer: Organizer,
    fullname: string,
    email: string,
    contacts: string[],
    role: UserRole,
    code_qr: string,
    status: string,
    verified_at?: Date | undefined,
    created_at: Date,
    updated_at?: Date | undefined
}


export type Organizer = {
    id: string,
    name: string,
    email: string,
    contacts: string[],
    code_qr: string,
    created_at: Date,
    updated_at: Date | undefined,
    verified_at: Date | undefined
}


export type UserRole = 'ADMIN' | 'ORGANIZER' | 'USER'