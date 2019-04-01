import React from 'react'
import ReactDOM from 'react-dom'
import Smartcheckout from './components/Smartcheckout'

ReactDOM.hydrate(
  <Smartcheckout contentclient={window.__INITIAL__DATA__.contentclient} />,
  document.getElementById('root')
)
