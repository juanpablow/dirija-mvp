import { UserRole } from '@prisma/client';

export interface CreateInstructorDTO {
  name: string;
  email: string;
  phone: string;
}

export interface InstructorResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}
