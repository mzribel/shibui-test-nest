export class UserDto {
    id: number;
    email:string;
    role: Role
}

export const Role: {
    ADMIN: 'ADMIN',
    ETUDIANT: 'ETUDIANT',
    ENTREPRISE: 'ENTREPRISE',
    VERIFICATEUR: 'VERIFICATEUR'
} = {
    ADMIN: 'ADMIN',
    ETUDIANT: 'ETUDIANT',
    ENTREPRISE: 'ENTREPRISE',
    VERIFICATEUR: 'VERIFICATEUR'
}
export type Role = typeof Role[keyof typeof Role]
