import { DEVICE, URL } from "../constant"
import TokenService from "./tokenService"

export default function SigninService() {
    this.baseHeader = () => {
        return {
            'X-APP-ID': new TokenService().getToken(DEVICE)
        }
    }

    this.signinUser = async (data) => {
        const formData = new FormData()
        
        formData.set("username", data.username)
		formData.set("password", data.password)
        
        const res = await fetch(`${URL}signin`, {
            method: 'POST',
            headers: this.baseHeader(),
            body: formData
        })
        return res
    }
}