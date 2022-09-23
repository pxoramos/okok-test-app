import {PermissionsAndroid} from 'react-native';

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Mic and camera permissions granted');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.log(err);
    console.warn(err);
  }
};

export {requestCameraAndAudioPermission};
