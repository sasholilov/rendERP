import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "IBM Plex Sans", sans-serif;
}

a {
    text-decoration: none;
    color: #c5cede;;
}

button{
  appearance: none;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;
}

:root{
    &{
        --color-light: #f9f9f9; 
        --color-grey-0:#c5cede;
        --color-grey-1: #fefefe;
        --color-grey-2:#f8f8f8;
        --color-grey-3: #686868;
        --color-grey-4: #424242;
        --color-blue-1: #6384ea;
        --color-blue-2: #1a233a;
        --color-skyblue-1:#38c1f1;
        --color-skyblue-2:#10aee6;
        --color-red-1: #f1376e;
        --color-red-2: #bd1849;
        --color-yellow-1: #f9c20f;
        --color-yellow-2: #d0a005;
        --box-shadow-1: 0 2px 4px rgba(0, 0, 0, 0.1);
        --border-bottom:solid 1px rgba(0, 0, 0, 0.1);
        --border-radius-4:4px;
        --border-radius-8:8px;
        --border-radius-16:16px;
    }
}

`;
export default GlobalStyles;
