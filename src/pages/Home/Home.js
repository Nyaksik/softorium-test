import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { ACCESS_TOKEN } from "../../constant"
import TokenService from "../../services/tokenService"
import UserService from "../../services/userService"
import './Home.css'

function Home() {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const token = new TokenService().getToken(ACCESS_TOKEN)

    function logout() {
        new UserService().logout()
        navigate('/signin')
    }

    useEffect(() => {
        async function getUser() {
            const res = await new UserService().getUser()
            setUser(res)
        }

        getUser()
    }, [])

    return (
        <>
            {!token && <Navigate to='/signin' />}
            {user ? <div className="Home">
                <img className="Home__img" src={user.avatar} alt="avatar" />
                <div className="Home__info">
                    <p><strong>Имя</strong>: {user.name}</p>
                    <p><strong>Телефон</strong>: {user.phone}</p>
                    <p><strong>Email</strong>: {user.email}</p>
                    <p><strong>День рождения</strong>: {user.birthday}</p>
                    <button onClick={logout}>Выйти</button>
                </div>
            </div>
                : <div className="Home">
                    <p>Загрузка</p>
                </div>
            }
        </>
    )
}

export default Home
