import { GetServerSidePropsContext } from 'next';

export const serverSideRedirect = (
  ctx: GetServerSidePropsContext,
  redirectTo?: string,
) => {
  const newPath = redirectTo || encodeURI(ctx.resolvedUrl); // path resolved by next

  return {
    props: {},
    redirect: {
      destination: `${process.env.NEXT_PUBLIC_LOGIN_URI}/?redirect=${newPath}`,
      permanent: false,
    },
  };
};
