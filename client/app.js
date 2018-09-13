import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AddProductForm from './components/Admin-AddProductForm'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AddProductForm />
    </div>
  )
}

export default App
