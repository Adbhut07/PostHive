import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Signin from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'

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
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />  
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/createpost' element={<CreatePost />} />  
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
