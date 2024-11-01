

import Navbar from './home/components/Navbar/Navbar'
import LandingLayout from './landing/landingLayout';

import './App.css'

import {Routes, Route} from 'react-router-dom'

import { SignIn, SignUp , About} from './pages';
import Header from './home/components/Header/Header';


function App() {


  return (
    <>

    
      <Navbar/>
      <LandingLayout/>
    
      

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
