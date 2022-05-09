import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import { darkTheme } from "./style/theme";
import "./assets/fonts/font.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
