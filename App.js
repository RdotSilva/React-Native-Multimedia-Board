import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

let green = '#477009';
let yellow = '#fcd602';

export default class App extends React.Component {
	state = {
		isReady: false
	};

	_setAudioModeAsync = async () => {
		await Expo.Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
			allowsRecordingIOS: false,
			playThroughEarpieceAndroid: false,
			shouldDuckAndroid: true,
			interruptionModeAndroid:
				Expo.Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
			interruptionModeIOS:
				Expo.Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
		});
	};

	_loadFontsAsync = async () => {
		await Expo.Font.loadAsync({
			CooperBlackRegular: require('./assets/CooperBlackRegular.ttf')
		});
	};

	_setupAsync = async () => {
		await Promise.all([this._setAudioModeAsync(), this._loadFontsAsync()]);
		this.setState({ isReady: true });
	};

	componentWillMount() {
		this._setupAsync();
	}

	render() {
		if (!this.state.isReady) {
			return <Expo.AppLoading />;
		}

		let size = 100;
		return (
			<View style={styles.container}>
				<Text
					style={{
						color: yellow,
						fontSize: 42
					}}
				>
					Cat Sounds
				</Text>
				<CatVideoButton
					source={require('./assets/1.mp4')}
					size={size}
				/>
			</View>
		);
	}
}

class CatVideoButton extends React.Component {
	resetAsync = async () => {
		await this._video.stopAsync();
		await this._video.setPositionAsync(0);
	};

	playAsync = async () => {
		await this._video.replayAsync();
	};

	render() {
		return (
			<View>
				<TouchableHighlight
					onPress={() => {
						this.playAsync();
					}}
				>
					<View>
						<Expo.Video
							source={this.props.source}
							style={{
								width:
									this.props.width || this.props.size || 400,
								height:
									this.props.height || this.props.size || 400
							}}
							resizeMode="cover"
							shouldPlay={true}
							ref={c => {
								this._video = c;
							}}
							onPlaybackStatusUpdate={status => {
								if (status.didJustFinish) {
									this.resetAsync();
								}
							}}
						/>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
