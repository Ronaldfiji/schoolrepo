import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
/* Configure bootstrap and fontawsome */

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

/** Toast Configuration */
import 'react-toastify/dist/ReactToastify.css';

//const queryClient = new QueryClient()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 5000, /*25 seconds*/
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>   
  // </React.StrictMode>
  <BrowserRouter>
   <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <App />
    </AuthProvider>  
    <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider> 
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
