import { TextInput } from 'components/TextInput';
import { Email } from '@styled-icons/material-outlined/Email';
import { Password } from '@styled-icons/material-outlined/Password';
import React, { useState } from 'react';
import * as Styled from './styles';
import { Button } from 'components/Button';

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};
export const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 5000));
    if (onLogin) {
      await onLogin(email, password);
    }
    setLoading(false);
  };
  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        name="user-identifier"
        label="Seu e-mail"
        onInputChange={(value) => setEmail(value)}
        value={email}
        icon={<Email />}
        type={'email'}
      />
      <TextInput
        name="user-password"
        label="Sua senha"
        onInputChange={(value) => setPassword(value)}
        value={password}
        icon={<Password />}
        type={'password'}
      />
      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}
      <Styled.ButtonWrapper>
        <Button disabled={loading}>{loading ? 'Enviando' : 'Entrar'}</Button>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};
