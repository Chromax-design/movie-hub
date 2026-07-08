import { createGlobalStyle } from "styled-components";

// Supports weights 100-900
import '@fontsource-variable/roboto-slab/wght.css';
// Supports weights 100-900
import '@fontsource-variable/roboto/wght.css';

const GlobalStyles = createGlobalStyle`
*,*::before,*::after{
    margin:0;
    padding:0;
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
    font-family: 'Roboto Slab Variable', serif;
}

html{
    scroll-behavior: smooth;
}

body{
    color: #cbd5e1;
    font-family: 'Roboto Variable', sans-serif;
}

*{
    color: inherit;
    text-decoration: none;
}
`;

export default GlobalStyles;
