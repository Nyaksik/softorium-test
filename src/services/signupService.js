import { DEVICE, URL } from "../constant"
import TokenService from "./tokenService"

export default function SignupService() {
    this.baseHeader = () => {
        return {
            'Content-Type': 'application/json',
            'X-APP-ID': new TokenService().getToken(DEVICE)
        }
    }

    this.postNewUser = async (data) => {
        const stringifyData = JSON.stringify(data)
        const res = await fetch(`${URL}signup`, {
            method: 'POST',
            headers: this.baseHeader(),
            body: stringifyData
        })
        return res
    }
}