import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { SnackbarProvider } from './components/Snackbar/SnackbarProvider.js';

// project import
import App from './App';
import { store } from './store';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ReduxProvider store={store}>
      <BrowserRouter basename="/">
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
