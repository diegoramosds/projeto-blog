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
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';
import { FaSpinner } from 'react-icons/fa';
import BackToTop from './components/BackToTop';


function App() {


  const [user, setUser] = useState('');
  const {auth} = useAuthentication();
  const [loading, setLoading] = useState(true);
  
   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user'); 
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);


  if (loading) {
    return <p className="spinner"><FaSpinner/></p>;
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
            <Route path='/about' element={<About  />}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/posts/:id' element={<Post />}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to={"/"}/>}/>
            <Route path='/register' element={!user ? <Register/> : <Navigate to={"/"}/>}/>
            <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to={"/login"}/>}/>
            <Route path='/posts/edit/:id' element={user ? <EditPost/> : <Navigate to={"/login"}/>}/>
            <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to={"/login"}/>}/>  
          </Routes>
          <BackToTop />
        </div>
        <Footer />
        </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  )
}
export default App
