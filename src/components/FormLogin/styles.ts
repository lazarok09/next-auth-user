import styled, { css } from 'styled-components';

export const Wrapper = styled.form`
    ${() => css`
    `}
`;

export const ButtonWrapper = styled.div`
    ${() => css`
    `}
`;
export const ErrorMessage = styled.p`
    ${({ theme }) => css`
        background: ${theme.colors.warning};
        color: ${theme.colors.white};
        padding: ${theme.spacings.xsmall} ${theme.spacings.small} 
    `}
`;
