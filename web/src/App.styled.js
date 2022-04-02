import styled, { createGlobalStyle } from 'styled-components';

export const AppWrapper = styled.main`
  text-align: center;
  padding: 20px;
  .caption {
    color: ${props => props.theme.grey};
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.fg};
    background: ${props => props.theme.bg};
    font-family: ${props => props.theme.fontFamily};
  }
`;

export const RequestFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  .outputTypeContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    background: ${props => props.theme.darkGrey};
    width: 100%;
    border-radius: 5px;
    padding: 20px;
  }

  .dataResult {
    font-style: italic;
  }
`;
export default AppWrapper;