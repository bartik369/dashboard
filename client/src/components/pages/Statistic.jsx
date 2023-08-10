import { useState, useEffect } from 'react';
import VideoPlayer from '../media-call/VideoPlayer';
import Options from '../media-call/Options';
import Notifications from '../media-call/Notifications';
import { ContextProvider } from '../media-call/SocketContext';

const Statistics = () => {

   
    return (
        <div>
         <h5>Video chat</h5>
         <ContextProvider>
         <VideoPlayer />
         <Options>
             <Notifications />
         </Options>
         </ContextProvider>
        </div>
      );
}

export default Statistics; 