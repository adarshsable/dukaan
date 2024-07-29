import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// mui theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: "light",
    // background: {
    //   default: "#27293D",
    //   paper: "#27293D",
    // },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={darkTheme}>
        {/* <CssBaseline /> */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
