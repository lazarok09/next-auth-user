import { PrivateComponent } from 'components/PrivateComponent';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { CreatePostTemplate } from 'templates/CreatePost';

import { serverSideRedirect } from 'utils/server-side-redirect';

export default function CreatePostPage() {
  return (
    <PrivateComponent>
      <CreatePostTemplate />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }
  try {
    return {
      props: {
        session,
      },
    };
  } catch (e) {
    console.log(e);
  }
};
