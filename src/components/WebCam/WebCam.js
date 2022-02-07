import { HEIGTH, WIDTH } from "../../constant"
import './WebCam.css'

function WebCam({ webCam, canvasPhoto, isShow, close, photo }) {

    return (
        isShow && <div className="WebCam">
            <div className="WebCam__player player">
                <video className="player_video" ref={webCam} autoPlay muted></video>
                <canvas className="player__canvas" ref={canvasPhoto} width={WIDTH} height={HEIGTH}></canvas>
                <button onClick={photo} className="player__shot">Сделать снимок</button>
                <button onClick={close} className="player__close">Закрыть</button>
            </div>
        </div>
    )
}

export default WebCam
