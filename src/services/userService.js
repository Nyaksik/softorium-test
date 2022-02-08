import { ACCESS_TOKEN, DEVICE, URL } from "../constant"
import TokenService from "./tokenService"

export default function UserService() {
    this.baseHeader = () => {
        return {
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
            new TokenService().removeToken(ACCESS_TOKEN)
        }
    }
}