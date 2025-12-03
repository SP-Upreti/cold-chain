export enum UserRole {
  SUDOADMIN = "SUDOADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
