import { ACCESS_TOKEN, DEVICE, PHOTO_URL, UNDEFINED_TOKEN } from "../constant"

export default function TokenService() {
    this.setToken = (kindOfToken, token) => {
        switch(kindOfToken) {
            case 'DEVICE':
                localStorage.setItem(DEVICE, token)
                break
            case 'ACCESS_TOKEN':
                localStorage.setItem(ACCESS_TOKEN, token)
                break
            case 'PHOTO_URL':
                localStorage.setItem(PHOTO_URL, token)
                break
            default:
                localStorage.setItem(UNDEFINED_TOKEN, token)
                break
        }
    }

    this.getToken = (tokenKey) => {
        return localStorage.getItem(tokenKey)
    }

    this.removeToken = (tokenKey) => {
        localStorage.removeItem(tokenKey)
    }
}