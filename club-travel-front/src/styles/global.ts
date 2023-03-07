import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .mainContent {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
   
    .mainContent  main {
        flex: 1;
    }
`