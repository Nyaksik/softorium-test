import { DEVICE, URL } from "../constant"
import TokenService from "./tokenService"

export default function LiginService() {
    this.baseHeader = () => {
        return {
            'Content-Type': 'application/json',
            'X-APP-ID': new TokenService().getToken(DEVICE)
        }
    }

    this.postNewUser = async (data) => {
        const stringifyData = JSON.stringify(data)
        const res = await fetch(`${URL}singup`, {
            method: 'POST',
            headers: this.baseHeader(),
            body: stringifyData
        })
        console.log(res.json())
    }
}