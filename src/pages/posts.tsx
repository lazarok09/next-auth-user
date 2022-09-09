import { Wrapper } from 'components/Wrapper';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_DELETE_POST } from 'graphql/mutations/post';

import { GQL_QUERY_GET_POSTS } from 'graphql/queries/post';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { frontEndRedirect } from 'utils/front-end-redirect';
import { serverSideRedirect } from 'utils/server-side-redirect';

export type StrapiPost = {
  title: string;
  content: string;
  id?: string;
};

export type PostPageProps = {
  posts?: StrapiPost[];
};
export default function PostPage({ posts = [] }: PostPageProps) {
  const { data, status } = useSession();
  const [statePosts, setStatePosts] = useState(posts);
  const [deletingPost, setDeletingPost] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
  }, [posts]);

  if (status === 'loading') return null; // prevent server side loading

  if (status === 'unauthenticated') return frontEndRedirect();

  const handleButtonDelete = async (id: string) => {
    setDeletingPost(true);
    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_POST,
        {
          id: id,
        },
        {
          Authorization: `Bearer ${data.accessToken}`,
        },
      );

      setStatePosts((s) => s.filter((p) => p.id !== id)); // keep posts that are not this, deleting this one
      setDeletingPost(false);
    } catch (e) {
      setDeletingPost(false);
      console.log(e);
      alert('Post não excluído, :(');
    }
  };
  return (
    <Wrapper>
      <h1>Posts {data?.user?.name}</h1>
      {statePosts.map((p) => (
        <p key={`post-${p.id}`}>
          <Link href={`/${p.id}`}>
            <a>{p.title}</a>
          </Link>
          <button
            disabled={deletingPost}
            onClick={() => handleButtonDelete(p.id)}
          >
            Excluir
          </button>
        </p>
      ))}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const { posts } = await gqlClient.request(GQL_QUERY_GET_POSTS, null, {
      Authorization: `Bearer ${session.accessToken}`,
    });
    return { props: { session, posts } };
  } catch (e) {
    console.log(e);
    return serverSideRedirect(ctx);
  }
};
