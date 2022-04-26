import { StyleSheet, Text, View, Platform, Vibration } from "react-native";
import React, { useState, useRef } from "react";
import { spacing } from "../../utils/sizes";
import CountDown from "../../components/CountDown";
import RoundedButton from "../../components/RoundedButton";
import { ProgressBar } from "react-native-paper";
import Timing from "./Timing";
import { useKeepAwake } from "expo-keep-awake";

const DEFAULT_TIME = 0.1;

const Timer = ({ focusedSubject, onTimerEnd, clearSubject }) => {
	useKeepAwake();
	const [isStarted, setIsStarted] = useState(false);
	const [progress, setProgress] = useState(1);
	const progressRef = useRef(0);
	const [minutes, setMinutes] = useState(DEFAULT_TIME);

	const onProgress = progress => {
		setProgress(progress);
	};

	const changeTime = min => {
		setMinutes(min);
		setProgress(1);
		setIsStarted(false);
	};

	const vibrate = () => {
		if (Platform.OS === "ios") {
			const interval = setInterval(() => Vibration.vibrate(), 1000);
			setTimeout(() => clearInterval(interval), 10000);
		} else {
			Vibration.vibrate(1000);
		}
	};

	const onEnd = () => {
		vibrate();
		setMinutes(DEFAULT_TIME);
		setProgress(1);
		setIsStarted(false);
		onTimerEnd();
	};

	return (
		<View style={styles.container}>
			<View style={styles.countDown}>
				<CountDown
					minutes={minutes}
					isPaused={!isStarted}
					onProgress={onProgress}
					onEnd={onEnd}
				/>
			</View>
			<View style={{ paddingTop: spacing.xxl }}>
				<Text style={styles.title}>Focusing on: </Text>
				<Text style={styles.task}>{focusedSubject}</Text>
			</View>
			<ProgressBar
				color="#af85ff"
				progress={progress}
				style={{ height: 10, marginTop: 10 }}
			/>
			<View style={styles.buttonWrapper}>
				<Timing onchangeTime={changeTime} />
			</View>
			<View style={styles.buttonWrapper}>
				{isStarted ? (
					<RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
				) : (
					<RoundedButton title="Start" onPress={() => setIsStarted(true)} />
				)}
			</View>
			<View style={styles.clearSubject}>
				<RoundedButton title="-" size={50} onPress={clearSubject} />
			</View>
		</View>
	);
};

export default Timer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		color: "#fff",
		textAlign: "center",
	},
	task: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "bold",
	},
	countDown: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonWrapper: {
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center",
	},
	clearSubject: {
		paddingBottom: 25,
		paddingLeft: 25,
	},
});
