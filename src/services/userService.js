import { ACCESS_TOKEN, DEVICE, URL } from "../constant"
import TokenService from "./tokenService"

export default function UserService() {
    this.baseHeader = () => {
        return {
            'Content-Type': 'application/json',
            'X-APP-ID': new TokenService().getToken(DEVICE),
            'Authorization': `Bearer ${new TokenService().getToken(ACCESS_TOKEN)}`
        }
    }

    this.getUser = async () => {
        const res = await fetch(`${URL}users/me`, {
            method: 'GET',
            headers: this.baseHeader(),
        })
        if(res.ok) {
            return res.json()
        } else {
            this.logout()
        }
    }

    this.logout = () => {
        new TokenService().removeToken(ACCESS_TOKEN)
    }
}