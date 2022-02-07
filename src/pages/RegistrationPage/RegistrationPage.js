import { useState } from "react"
import useContolInput from "../../hooks/useContolInput"
import useVideoPlayer from "../../hooks/useVideoPlayer"
import WebCam from "../../components/WebCam/WebCam"
import TokenService from "../../services/tokenService"
import { PHOTO_URL } from "../../constant"
import './RegistrationPage.css'

function LoginPage() {
    const name = useContolInput()
    const phone = useContolInput('')
    const password = useContolInput()
    const email = useContolInput()
    const birthday = useContolInput()
    const videoPlayer = useVideoPlayer()
    const [refresh, setRefresh] = useState(false)

    const data = {
        phone: phone.value,
        password: password.value,
        name: name.value,
        email: email.value,
        birthday: birthday.value,
        avatar: new TokenService().getToken(PHOTO_URL) || ''
    }

    function previewFile(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        
        reader.addEventListener("load", function () {
            new TokenService().setToken(PHOTO_URL, reader.result)
            setRefresh(!refresh)
        }, false)
    
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <div className="Registration">
                <input { ...name } className="Registration__input" placeholder="Введите имя и/или Фамилию" />
                <input { ...phone } className="Registration__input" type="tel" placeholder="Введите номер телефона" />
                <input { ...email } className="Registration__input" type="email" placeholder="Введите email" />
                <input { ...password } className="Registration__input" placeholder="Введите пароль" />
                <input { ...birthday } className="Registration__input" type="date" placeholder="Введите дату вашег рождения" />
                <input className="Registration__input" placeholder="Выберите часовой пояс" />
                <label htmlFor="file">Загрузить аватар</label>
                <input className="Registration__input" id="file" onChange={previewFile} type="file" placeholder="Upload an avatar" />
                <button onClick={videoPlayer.clickHandler}>Сделать снимок</button>
                <img className="Registration__img" src={new TokenService().getToken(PHOTO_URL)} alt="avatar" />
                <button onClick={() => console.log(data)}>Зарегистрироваться</button>
            </div>
                <WebCam { ...videoPlayer } />
        </>
    )
}

export default LoginPage
