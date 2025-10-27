export type User = {
    id: string,
    organizer_id: string,
    organizer: Organizer,
    fullname: string,
    email: string,
    contacts: string[],
    role: UserRole,
    code_qr: string,
    status: UserStatus,
    created_at: Date,
    verified_at?: Date | undefined,
    updated_at?: Date | undefined
}


export type Organizer = {
    id: string,
    name: string,
    email: string,
    contacts: string[],
    code_qr: string,
    created_at: Date,
    updated_at?: Date | undefined,
    verified_at?: Date | undefined
}


export type UserRole = 'ADMIN' | 'ORGANIZER' | 'USER';


export const UserConstantStatus = {
  ACTIVE: 'ACTIVE',
  VERIFIED: 'VERIFIED',
  DISABLE: 'DISABLE',
  BLOCKED: 'BLOCKED'
};

export type UserStatus = (typeof UserConstantStatus)[keyof typeof UserConstantStatus];


export const getUserStatusConfig = (status: UserStatus) => {
  const statusConfigs = {
    [UserConstantStatus.ACTIVE]: {
      label: 'Actif',
      variant: 'default' as const,
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    [UserConstantStatus.VERIFIED]: {
      label: 'Vérifié',
      variant: 'outline' as const,
      className: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    [UserConstantStatus.DISABLE]: {
      label: 'Désactivé',
      variant: 'secondary' as const,
      className: 'bg-gray-100 text-gray-800 border-gray-200'
    },
    [UserConstantStatus.BLOCKED]: {
      label: 'Bloqué',
      variant: 'destructive' as const,
      className: 'bg-red-100 text-red-800 border-red-200'
    }
  };

  return statusConfigs[status] || {
    label: 'Inconnu',
    variant: 'secondary' as const,
    className: 'bg-gray-100 text-gray-800 border-gray-200'
  };
};
