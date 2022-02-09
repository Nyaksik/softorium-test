import { useState } from "react"
import InputMask from "react-input-mask"
import { Link, useNavigate } from "react-router-dom"
import { ACCESS_TOKEN } from "../../constant"
import useContolInput from "../../hooks/useContolInput"
import SigninService from "../../services/signinService"
import TokenService from "../../services/tokenService"
import './LoginPage.css'

function LoginPage() {
    const navigate = useNavigate()
    const login = useContolInput('')
    const password = useContolInput('')
    const [err, setErr] = useState([])

    const data = {
        username: login.value,
        password: password.value
    }

    async function signin(e) {
        e.preventDefault()

        const res = await new SigninService().signinUser(data)
        const resJson = res.json()
        const { access_token } = resJson

        if(res.ok) {
            new TokenService().setToken(ACCESS_TOKEN, access_token)
            navigate('/signin')
        } else if(res.status === 422) {
            setErr([{ msg: 'Что-то пошло не так' }])
        } else {
            setErr(resJson)
        }
    }

    return (
        <div className="LoginPage">
            <InputMask { ...login } className="LoginPage__input" placeholder="Введите email или номер телефона" />
            <input { ...password } type="password" className="LoginPage__input" placeholder="Введите пароль" />
            <button className="LoginPage__btn" type="submit" onClick={signin}>Войти</button>
            {err.length > 0 && <p className="LoginPage__err">{err[0]?.msg}</p>} 
            <Link className="LoginPage__link" to="/signup">Нет аккаунта? Зарегистрируйся!</Link>
        </div>
    )
}

export default LoginPage
