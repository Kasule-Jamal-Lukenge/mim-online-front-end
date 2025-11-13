import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store.js'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>
// )


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
)