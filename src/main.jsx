import { Provider } from './components/ui/provider'
import { Theme }  from '@chakra-ui/react'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      {/* <Theme appearance="light"> */}
          <App />
      {/* </Theme> */}
    </Provider>
  </StrictMode>
)
