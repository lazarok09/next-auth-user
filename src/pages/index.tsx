import { GetServerSideProps } from 'next';

export default function Index() {
  return <h1>Hello world</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
