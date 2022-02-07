import { useRef, useState } from "react"
import TokenService from "../services/tokenService"
import { HEIGTH, PHOTO_URL, WIDTH } from "../constant"

export default function useVideoPlayer() {
    const [isShow, setIsShow] = useState(false)
    const webCam = useRef(null)
    const canvasPhoto = useRef(null)

    function photo() {
        const video = webCam.current 
        const canvas = canvasPhoto.current
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0)
        new TokenService().setToken(PHOTO_URL, canvasPhoto.current.toDataURL())
        setIsShow(false)
    }

    function close() {
        const video = webCam.current
        setIsShow(false)
        video.pause()
    }

    async function clickHandler() {
        const constraints = { audio: false, video: { width: WIDTH, height: HEIGTH } }
        
        setIsShow(true)
        await navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {
                const video = webCam.current
                video.srcObject = mediaStream
                video.onloadedmetadata = function(e) {
                    video.play()
                }
            })
            .catch(function(err) { console.log(`${err.name}: ${err.message}`) })
    }

    return {
        isShow, webCam, canvasPhoto, photo, close, clickHandler
    }
}