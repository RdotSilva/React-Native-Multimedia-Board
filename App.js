import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
	_setAudioModeAsync = async () => {
		await Expo.Audio.setAudioModeAsync({
			playInSilentModeIOS: true,
			allowsRecordingIOS: false,
			shouldDuckAndroid: true,
			interruptionModeAndroid:
				Expo.Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
			interruptionModeIOS:
				Expo.Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
		});
	};

	componentWillMount() {
		this._setAudioModeAsync();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Cat Sounds</Text>
				<Expo.Video
					source={require('./assets/1.mp4')}
					style={{
						width: 400,
						height: 400
					}}
					resizeMode="cover"
					shouldPlay={true}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
