import sha1 from 'js-sha1'
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import TokenService from './services/tokenService'
import { DEVICE } from './constant'

function App() {
    const userDevice = navigator.userAgent
    new TokenService().setToken(DEVICE, sha1(userDevice))
    return (
        <>
            <RegistrationPage />
        </>
    )
}

export default App
