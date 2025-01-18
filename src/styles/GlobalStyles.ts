'use client'
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    position: relative;
    background: #000;
    color: #fff;
    font-family: "Courier New", Courier, monospace;
  }

  section {
    min-height: 100vh;
    overflow: hidden;
  }

  h1 {
    font-size: 54px;
    line-height: 68px;
    font-family: "Courier Prime", monospace;
  }

  h3 {
    text-align: center;
  }

  p {
    font-size: 24px;
    line-height: 36px;
    font-family: "Courier Prime", monospace;
    margin-bottom: 40px;
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 34px;
      line-height: 42px;
    }

    p {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 20px;
    }
  }
`;

export default GlobalStyles;

