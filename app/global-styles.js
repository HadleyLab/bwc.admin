import { injectGlobal } from 'styled-components';
// import 'typeface-roboto'
/* eslint no-unused-expressions: 0 */
injectGlobal`
    html {
    font-size: 16px;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif !important;
    font-weight:normal;
  }
  * {
    margin: 0;
}
  *, *::after, *::before {
      box-sizing: border-box;
  }
  
  input, textarea, select, button {
  font-family: 'Open Sans', sans-serif !important;
  }
`;
