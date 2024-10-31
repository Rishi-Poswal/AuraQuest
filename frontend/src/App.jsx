import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios';

import { fromJSON } from 'postcss';

import { SignIn, SignUp , About} from './pages';
import Header from './components/Header/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <Routes>
      {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </>
  )
}

export default App
