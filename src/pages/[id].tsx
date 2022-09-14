import { PrivateComponent } from 'components/PrivateComponent';
import { gqlClient } from 'graphql/client';
import { GQL_QUERY_GET_POST } from 'graphql/queries/post';
import { GetServerSideProps } from 'next';
import { UpdatePostTemplate } from 'templates/UpdatePost';
import { privateServerSideProps } from 'utils/private-server-side-props';

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
  return await privateServerSideProps(ctx, async (session) => {
    try {
      const { id } = ctx.query;

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
      // no posts
      console.log(e);
      return {
        props: {
          session,
        },
      };
    }
  });
};
