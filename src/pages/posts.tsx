import { Wrapper } from 'components/Wrapper';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data } = useSession();
  return (
    <Wrapper>
      <h1>Posts {data?.user?.name}</h1>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
