import { createGlobalStyle } from "styled-components";
import Router from "./router";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`

  //reset css
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {margin:0;padding:0}
  h1, h2, h3, h4, h5, h6 {font-size:100%;font-weight:400}
  ul {list-style:none}
  button, input, select {margin:0}
  html {box-sizing:border-box}
  *, :after, :before {box-sizing:inherit}
  img, video {height:auto;max-width:100%}
  iframe {border:0}
  table {border-collapse:collapse;border-spacing:0}
  td, th {padding:0}

  // fonts.google.com
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Router />
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
