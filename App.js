import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
	_setAudioModeAsync = async () => {
		await Expo.Audio.setAudioModeAsync({
			playInSilentModeIOS: true
		});
	};

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
