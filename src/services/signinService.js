import { DEVICE, URL } from "../constant"
import TokenService from "./tokenService"

export default function SigninService() {
    this.baseHeader = () => {
        return {
            'X-APP-ID': new TokenService().getToken(DEVICE)
        }
    }

    this.signinUser = async (data) => {
        const stringifyData = JSON.stringify(data)
        const formData = new FormData()
        formData.append("username", data.username);
		formData.append("password", data.password);
        console.log(stringifyData)
        const res = await fetch(`${URL}signin`, {
            method: 'POST',
            headers: this.baseHeader(),
            body: formData
        })
        return res.json()
    }
}