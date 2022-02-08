import { Route, Routes } from 'react-router-dom'
import sha1 from 'js-sha1'
import Home from './pages/Home/Home'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import TokenService from './services/tokenService'
import { DEVICE } from './constant'

function App() {
    const userDevice = navigator.userAgent
    new TokenService().setToken(DEVICE, sha1(userDevice))

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<LoginPage />} />
                <Route path='/signup' element={<RegistrationPage />} />
            </Routes>
        </>
    )
}

export default App
