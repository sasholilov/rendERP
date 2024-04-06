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

:root{
    &{
        --color-light: #f9f9f9; 
        --color-grey-0:#c5cede;
        --color-grey-1: #fefefe;
        --color-grey-2:#f8f8f8;
        --color-grey-3: #686868;
        --color-grey-4: #424242;
        --color-blue-1:#6384ea;
        --color-blue-2:#1a233a;
        --box-shadow-1: 0 2px 4px rgba(0, 0, 0, 0.1);
        --border-bottom:solid 1px rgba(0, 0, 0, 0.1);
        --border-radius-4:4px;
    }
}

`;
export default GlobalStyles;
