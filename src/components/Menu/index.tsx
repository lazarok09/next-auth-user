import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Styled from './styles';
export const Menu = () => {
  const { data: session } = useSession();
  const [redirect, setRedirect] = useState('/');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setRedirect(encodeURI(window.location.pathname));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut({
      redirect: false,
    });
  };

  return (
    <Styled.Wrapper>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
      <Link href={'/posts'}>
        <a>Posts</a>
      </Link>
      <Link href={'/create-post'}>
        <a>Create Post</a>
      </Link>
      {session ? (
        <Link href={'#'}>
          <a onClick={handleClick}>Sair</a>
        </Link>
      ) : (
        <Link
          href={{
            pathname: '/login',
            query: { redirect },
          }}
        >
          <a>Login</a>
        </Link>
      )}

      <span>Oi</span>
    </Styled.Wrapper>
  );
};
