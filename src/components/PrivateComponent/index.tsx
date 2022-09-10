import { useSession } from 'next-auth/react';
import React from 'react';
import { frontEndRedirect } from 'utils/front-end-redirect';

type PrivateComponentProps = {
  children: React.ReactNode;
};
export const PrivateComponent = ({ children }: PrivateComponentProps) => {
  const { status } = useSession();

  if (status === 'loading') return null; // prevent server side loading

  if (status === 'unauthenticated') return frontEndRedirect();

  return children;
};
