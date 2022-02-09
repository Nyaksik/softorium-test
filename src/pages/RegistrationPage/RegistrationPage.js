import { useState } from "react"
import useContolInput from "../../hooks/useContolInput"
import useVideoPlayer from "../../hooks/useVideoPlayer"
import WebCam from "../../components/WebCam/WebCam"
import TokenService from "../../services/tokenService"
import { PHOTO_URL, TIMEZONE } from "../../constant"
import './RegistrationPage.css'
import InputMask from "react-input-mask"
import SignupService from "../../services/signupService"
import { Link, useNavigate } from "react-router-dom"

function LoginPage() {
    const name = useContolInput('')
    const phone = useContolInput('')
    const password = useContolInput('')
    const email = useContolInput('')
    const birthday = useContolInput()
    const timezone = useContolInput('+00')
    const videoPlayer = useVideoPlayer('')
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)
    const [err, setErr] = useState([])

    const data = {
        phone: phone.value,
        password: password.value,
        name: name.value,
        email: email.value,
        birthday: birthday.value,
        time_zone: timezone.value,
        avatar: new TokenService().getToken(PHOTO_URL)
            ? new TokenService().getToken(PHOTO_URL).split(',')[1]
            : ''
    }

    async function singup(e) {
        e.preventDefault()

        const res = await new SignupService().postNewUser(data)

        if(res.ok) {
            setErr([])
            navigate('/signin')
        } else if(res.status === 422) {
            setErr([{ msg: 'Что-то пошло не так'}])
        } else {
            const rs = await res.json()
            setErr(rs)
        }
    }

    function previewFile(e) {
        const currentFile = e.target.files[0]
        const reader = new FileReader()
        
        reader.addEventListener("load", function () {
            new TokenService().setToken(PHOTO_URL, reader.result)
            setRefresh(!refresh)
        }, false)
    
        if (currentFile) {
            reader.readAsDataURL(currentFile)
        }
    }

    return (
        <>
            <div className="Registration">
                <label>Введите Ваше имя</label>
                <input { ...name } className="Registration__input" placeholder="Введите имя и/или Фамилию" />
                <label>Введите Ваш номер телефона</label>
                <InputMask { ...phone } className="Registration__input" mask="+99999999999" placeholder="Введите номер телефона" />
                <label>Введите Ваш email</label>
                <input { ...email } className="Registration__input" type="email" placeholder="Введите email" />
                <label>Введите пароль</label>
                <input { ...password } type="password" className="Registration__input" placeholder="Введите пароль" />
                <label>Введите Вашу дату рождения</label>
                <input { ...birthday } className="Registration__input" type="date" placeholder="Введите дату вашег рождения" />
                <label>Выберите часовой пояс</label>
                <select { ...timezone } className="Registration__input" placeholder="Выберите часовой пояс">
                    {TIMEZONE.map((it, index) => {
                        return <option key={index} value={it.timezone}>{it.city} UTC{it.timezone}</option>
                    })}
                </select>
                <input className="Registration__input" id="file" onChange={previewFile} type="file" placeholder="Upload an avatar" />
                <div className="Registration__img">
                    <img src={new TokenService().getToken(PHOTO_URL)} alt="" />
                    <label htmlFor="file">Загрузить<br/>аватар</label>
                </div>
                <button className="Registration__btn" onClick={videoPlayer.clickHandler}>Сделать снимок</button>
                <button className="Registration__btn" type="submit" onClick={singup}>Зарегистрироваться</button>
                {err.length > 0 && <p className="Registration__err">{err[0]?.msg}</p>}
                <Link className="Registration__link" to='/signin'>Назад</Link>
            </div>
                <WebCam { ...videoPlayer } />
        </>
    )
}

export default LoginPage
