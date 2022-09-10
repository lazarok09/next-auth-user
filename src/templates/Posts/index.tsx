import { Wrapper } from 'components/Wrapper';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_DELETE_POST } from 'graphql/mutations/post';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type PostTemplateProps = {
  posts?: StrapiPost[];
};
export default function PostTemplate({ posts = [] }: PostTemplateProps) {
  const { data } = useSession();
  const [statePosts, setStatePosts] = useState(posts);
  const [deletingPost, setDeletingPost] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
  }, [posts]);

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
