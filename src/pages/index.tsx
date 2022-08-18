import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data, status } = useSession();
  return (
    <h1>
      Hello world {JSON.stringify(data)} {status}
    </h1>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
