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
		let size = 100;
		return (
			<View style={styles.container}>
				<Text>Cat Sounds</Text>
				<CatVideoButton
					source={require('./assets/1.mp4')}
					size={size}
				/>
			</View>
		);
	}
}

class CatVideoButton extends React.Component {
	render() {
		return (
			<Expo.Video
				source={this.props.source}
				style={{
					width: this.props.width || this.props.size || 400,
					height: this.props.height || this.props.size || 400
				}}
				resizeMode="cover"
				shouldPlay={true}
				ref={c => {
					this._video = c;
				}}
			/>
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
