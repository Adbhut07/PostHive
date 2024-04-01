import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Signin from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
