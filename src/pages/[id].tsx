import { FormPost } from 'components/FormPost';
import { Wrapper } from 'components/Wrapper';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_UPDATE_POST } from 'graphql/mutations/post';
import { GQL_QUERY_GET_POST } from 'graphql/queries/post';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { frontEndRedirect } from 'utils/front-end-redirect';
import { serverSideRedirect } from 'utils/server-side-redirect';
export type PostPageProps = {
  post: StrapiPost;
};
export default function PostPage({ post }: PostPageProps) {
  const { data, status } = useSession();

  if (status === 'loading') return null; // prevent server side loading

  if (status === 'unauthenticated') return frontEndRedirect();
  const handleSave = async ({ id, title, content }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_UPDATE_POST,
        {
          id,
          title,
          content,
        },
        {
          Authorization: `Bearer ${data.accessToken}`,
        },
      );
    } catch (e) {
      console.log(e);
      alert('erro ao salvar o post');
    }
  };
  return (
    <Wrapper>
      <FormPost onSave={handleSave} post={post} />
    </Wrapper>
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
