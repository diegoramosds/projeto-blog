import './App.css'

import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"

import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { AuthProvider } from './context/AuthContext'
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';

function App() {

  const [user, setUser] = useState('');
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>;
  }


  return (
    <>
      <div className='App'>
        <AuthProvider value={{ user }}>
        <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to={"/"}/>}/>
            <Route path='/register' element={!user ? <Register/> : <Navigate to={"/"}/>}/>
            <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to={"/login"}/>}/>
            <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to={"/login"}/>}/>
          </Routes>
        </div>
        <Footer />
        </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  )
}
export default App
