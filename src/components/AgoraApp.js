import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from 'react-native-agora';

import {requestCameraAndAudioPermission} from '_utils/permissions/livestreaming';

const appId = '';

const AgoraApp = async ({props}) => {
  const [state, setState] = React.useState({
    isHost: true,
    joinSucceed: false,
    peerIds: [],
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }, []);
  const rtcEngine = createAgoraRtcEngine();
  await rtcEngine.initialize({appId});
  await rtcEngine.enableVideo();
  await rtcEngine.setChannelProfile(
    ChannelProfileType.ChannelProfileLiveBroadcasting,
  );
  await rtcEngine.setClientRole(
    state.isHost
      ? ClientRoleType.ClientRoleBroadcaster
      : ClientRoleType.ClientRoleAudience,
  );
};

export default AgoraApp;
