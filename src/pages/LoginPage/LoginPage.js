import InputMask from "react-input-mask"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN } from "../../constant"
import useContolInput from "../../hooks/useContolInput"
import SigninService from "../../services/signinService"
import TokenService from "../../services/tokenService"
import './LoginPage.css'

function LoginPage() {
    const navigate = useNavigate()
    const login = useContolInput('')
    const password = useContolInput('')

    const data = {
        username: login.value,
        password: password.value
    }

    async function signin(e) {
        e.preventDefault()
        const res = await new SigninService().signinUser(data)
        const { access_token } = res

        new TokenService().setToken(ACCESS_TOKEN, access_token)

        if(new TokenService().getToken(ACCESS_TOKEN)) {
            navigate('/')
        } else {
            navigate('/signup')
        }
    }

    return (
        <div className="LoginPage">
            <InputMask { ...login } className="LoginPage__input" placeholder="Введите email" />
            <input { ...password } type="password" className="LoginPage__input" placeholder="Введите пароль" />
            <button className="LoginPage__btn" type="submit" onClick={signin}>Войти</button>
        </div>
    )
}

export default LoginPage
