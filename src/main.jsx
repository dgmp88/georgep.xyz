import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

