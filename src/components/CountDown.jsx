import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { fontSize, spacing } from "../utils/sizes";

const minutesToMills = minutes => minutes * 1000 * 60;

const formatTime = time => (time < 10 ? `0${time}` : time);

const CountDown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
	const interval = useRef(null);
	const [mills, setMills] = useState(null);

	const countDown = () => {
		setMills(time => {
			if (time === 0) {
				clearInterval(interval.current);
				return time;
			}
			const timeLeft = time - 1000;
			return timeLeft;
		});
	};

	useEffect(() => {
		onProgress(mills / minutesToMills(minutes));
		if (mills === 0) {
			onEnd();
		}
	}, [mills]);

	useEffect(() => {
		if (isPaused) {
			if (interval.current) {
				clearInterval(interval.current);
			}
			return;
		}
		interval.current = setInterval(countDown, 1000);
		return () => clearInterval(interval.current);
	}, [isPaused]);

	useEffect(() => {
		setMills(minutesToMills(minutes));
	}, [minutes]);

	const minute = Math.floor(mills / 1000 / 60) % 60;
	const seconds = Math.floor(mills / 1000) % 60;
	return (
		<View>
			<Text style={styles.text}>
				{formatTime(minute)} : {formatTime(seconds)}
			</Text>
		</View>
	);
};

export default CountDown;

const styles = StyleSheet.create({
	text: {
		fontSize: fontSize.xxl,
		fontWeight: "bold",
		color: "#fff",
		padding: spacing.lg,
		backgroundColor: "rgba(166, 39, 245, 0.76)",
	},
});
