import { PrivateComponent } from 'components/PrivateComponent';
import { gqlClient } from 'graphql/client';
import { GQL_QUERY_GET_POST } from 'graphql/queries/post';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { UpdatePostTemplate } from 'templates/UpdatePost';
import { serverSideRedirect } from 'utils/server-side-redirect';
export type PostPageProps = {
  post: StrapiPost;
};
export default function PostPage({ post }: PostPageProps) {
  return (
    <PrivateComponent>
      <UpdatePostTemplate post={post} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const { id } = ctx.query;
  if (!session) {
    return serverSideRedirect(ctx);
  }
  try {
    const { post } = await gqlClient.request(
      GQL_QUERY_GET_POST,
      {
        id: id,
      },
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );
    return {
      props: {
        session,
        post,
      },
    };
  } catch (e) {
    console.log(e);
  }
};
