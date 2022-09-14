import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { serverSideRedirect } from './server-side-redirect';

export const privateServerSideProps = async <T>(
  ctx: GetServerSidePropsContext,
  callBackFn: (session: Session) => Promise<T>,
) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  return await callBackFn(session); // when pass here, we can access when we call this privateServerSideProps fn
};
