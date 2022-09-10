import { FormLogin } from 'components/FormLogin';
import { Wrapper } from 'components/Wrapper';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const LoginTemplate = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async (email: string, password: string) => {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (!response.ok) {
      setError('Usuário ou senha inválidos!');
      return;
    }
    const redirect = router.query?.redirect || '/';
    router.push(redirect as string);
  };

  return (
    <Wrapper>
      <FormLogin onLogin={handleLogin} errorMessage={error} />
    </Wrapper>
  );
};
