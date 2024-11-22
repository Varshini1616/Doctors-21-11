// // VideoCall.tsx
// import React, { useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { StreamVideo } from '@stream-io/video-react-native-sdk';
// import { RTCView } from '@stream-io/react-native-webrtc';

// const VideoCall = () => {
//     useEffect(() => {
//         // Initialize your WebRTC configuration here
//         // For example, connecting to a signaling server
//     }, []);

//     return (
//         <View style={styles.container}>
//             <StreamVideo>
//                 <RTCView style={styles.video} />
//             </StreamVideo>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     video: {
//         width: '100%',
//         height: '100%',
//     },
// });

// export default VideoCall;
