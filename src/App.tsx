// import React from 'react'
// import logo from './logo.svg'
// import './App.css'
// import List from './pages/manager/List'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
import 'antd/dist/reset.css'

function App() {
  return (
    <div className='App'>
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  )
}

export default App
