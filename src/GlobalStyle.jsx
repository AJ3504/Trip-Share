import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
body {
overflow-x:hidden; /* 페이지 가로 스크롤 없애기 */
background-color: rgb(236, 249, 255);
}
`;

export default GlobalStyle;
