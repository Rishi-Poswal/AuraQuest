import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios';
import './App.css'
import { fromJSON } from 'postcss';

import { SignIn, SignUp } from './pages';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>

        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
      
      </Routes>
    </>
  )
}

export default App
