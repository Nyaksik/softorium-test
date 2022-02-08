import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN } from "../../constant"
import TokenService from "../../services/tokenService"
import UserService from "../../services/userService"
import './Home.css'

function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const token = new TokenService().getToken(ACCESS_TOKEN)

    useEffect(() => {
        async function getUser() {
            const res = await new UserService().getUser()
            setUser(res)
        }

        getUser()
    }, [])

    useEffect(() => {
        if(!token) {
            navigate('/signin')
        }
    }, [token, navigate])

    return (
        <div className="Home">
            <img className="Home__img" src={user.avatar} alt="avatar" />
            <div className="Home__info">
                <p><strong>Имя</strong>: {user.name}</p>
                <p><strong>Телефон</strong>: {user.phone}</p>
                <p><strong>Email</strong>: {user.email}</p>
                <p><strong>День рождения</strong>: {user.birthday}</p>
            </div>
        </div>
    )
}

export default Home
