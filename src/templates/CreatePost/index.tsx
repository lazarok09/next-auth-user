import { FormPost } from 'components/FormPost';
import { Wrapper } from 'components/Wrapper';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_CREATE_POST } from 'graphql/mutations/post';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function CreatePostTemplate() {
  const { data } = useSession();
  const router = useRouter();
  const handleSave = async ({ title, content }) => {
    try {
      const response = await gqlClient.request(
        GQL_MUTATION_CREATE_POST,
        {
          title,
          content,
        },
        {
          Authorization: `Bearer ${data.accessToken}`,
        },
      );
      const {
        createPost: { post },
      } = response;
      if (post) {
        router.push(`/${post.id}`);
      }
    } catch (e) {
      console.log(e);
      throw new Error('Erro ao criar!');
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} />
    </Wrapper>
  );
}
