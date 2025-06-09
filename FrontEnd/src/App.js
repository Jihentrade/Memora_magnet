import "./App.css";
import { store } from "./redux/store";
import RouterConfig from "./routes/routerConfig";
import { persistStore } from "redux-persist";
import theme from "./styles/theme";
import LoadingPage from "./components/Loading/loading";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const persistor = persistStore(store);
  return (
    
    <HelmetProvider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterConfig />
        </ThemeProvider>
      </PersistGate>
    </HelmetProvider>
  );
}

export default App;
