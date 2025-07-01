import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background: ${({ theme }) => theme.colors.neutrals.gray50};
    color: ${({ theme }) => theme.colors.neutrals.gray900};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  input, textarea, select {
    font-family: inherit;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.neutrals.gray300} transparent;
  }

  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutrals.gray300};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  *::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutrals.gray400};
  }
`;