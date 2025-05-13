// src/context/AuthContext.ts
import { createContext } from 'react';
import { AuthContextType } from '@/types/models/auth'

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
