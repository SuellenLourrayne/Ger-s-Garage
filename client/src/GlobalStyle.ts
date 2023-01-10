import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}
  body, html {
    background: #19308a;
    padding: 0 !important;
    margin: 0 !important;
  }
  .btn-link {
    text-decoration: none;
  }
`;

export default GlobalStyle;
