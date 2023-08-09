

export const CallModal = ({ callFrom, startCall, rejectCall }) => {

    const acceptWithVideo = (video) => {
        const config = { audio: true, video }
        // инициализация `PeerConnection`
        startCall(false, callFrom, config)
       }

       return (
        <div className='call-modal'>
          <div className='inner'>
            <p>{`${callFrom} is calling`}</p>
            <div className='control'>
              {/* принимаем звонок с видео */}
              <button onClick={() => acceptWithVideo(true)}>
              <i class="bi bi-camera-video"></i>
              </button>
              {/* принимаем звонок без видео */}
              <button onClick={() => acceptWithVideo(false)}>
              <i class="bi bi-telephone"></i>
              </button>
              {/* отклоняем звонок */}
              <button onClick={rejectCall} className='reject'>
              <i class="bi bi-telephone-plus"></i>
              </button>
            </div>
          </div>
        </div>
       )
   }