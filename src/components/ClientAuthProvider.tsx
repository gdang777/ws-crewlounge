'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';

// This is a client component wrapper for AuthProvider
// It ensures that AuthProvider (which uses localStorage) only runs on the client side
const ClientAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ClientAuthProvider;
