// App.tsx
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import LandingPage from './pages/Landing/LandingPage'
import GameArena from './pages/Match/GameArena'
import { Arena } from './pages/Match/Arena'
import { About } from './pages/Landing/About'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Settings from './pages/Landing/Settings'
import { useUserStore } from './utils/store'

function App() {

  const user = useUserStore( (state)=> {
    return state
  })

  return (
    <>
      <Router>
        <Routes>
          {/* Auth routes without sidebar */}
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
          {/* Routes with sidebar layout */}
          <Route path="/*" element={<Layout />}>
            <Route index element={<LandingPage/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="dashboard" element={<Home/>}/>
            <Route path="match" element={<GameArena/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="settings" element={<Settings/>}/>
            {/* Add more routes here as needed */}
          </Route>
          <Route path="/arena" element={<Arena/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App