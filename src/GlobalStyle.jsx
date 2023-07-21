import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
body {
background-color: rgb(236, 249, 255);
}
${reset}`;

export default GlobalStyle;
