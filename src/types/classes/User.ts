import { UserRole } from '../enums/UserRole';
import { UserStatus } from '../enums/UserStatus';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  organizationId?: string;
  agencyId?: string;
  status: UserStatus;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserService {
  login(): Promise<string>;
  logout(): Promise<void>;
  getUser(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  createUser(user: Partial<User>): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  updateUserStatus(id: string, status: UserStatus): Promise<User>;
  changePassword(id: string, oldPassword: string, newPassword: string): Promise<boolean>;
  verifyPassword(id: string, password: string): Promise<boolean>;
  canManageAgency(): boolean;
  canManageOrganization(): boolean;
  getUsersByOrganization(organizationId: string): Promise<User[]>;
  getUsersByAgency(agencyId: string): Promise<User[]>;
  assignUserToAgency(userId: string, agencyId: string): Promise<User>;
}
