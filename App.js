import { useState, useEffect } from "react";
import { StatusBar as Status } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import Focus from "./src/features/focus/Focus";
import FocusHistory from "./src/features/focus/FocusHistory";
import Timer from "./src/features/timer/Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STATUS = {
	COMPLETED: 1,
	CANCELED: 0,
};

export default function App() {
	const [focusedSubject, setFocusedSubject] = useState("");
	const [focusHistory, setFocusHistory] = useState([]);

	const addFocusHistorySubjectWithState = (subject, status) => {
		setFocusHistory([...focusHistory, { subject, status }]);
	};

	const onClear = () => {
		setFocusHistory([]);
	};

	const saveFocusHistory = async () => {
		try {
			await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		saveFocusHistory();
	}, [focusHistory]);

	const loadHistory = async () => {
		try {
			const data = await AsyncStorage.getItem("focusHistory");
			if (data) {
				const history = JSON.parse(data);
				if (history.length) {
					setFocusHistory(history);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		loadHistory();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Status style="light" />
			<LinearGradient
				// Background Linear Gradient
				colors={["#8732a8", "#5a32a8"]}
				style={styles.background}
			/>
			{focusedSubject ? (
				<Timer
					focusedSubject={focusedSubject}
					onTimerEnd={() => {
						addFocusHistorySubjectWithState(focusedSubject, STATUS.COMPLETED);
						setFocusedSubject("");
					}}
					clearSubject={() => {
						addFocusHistorySubjectWithState(focusedSubject, STATUS.CANCELED);
						setFocusedSubject("");
					}}
				/>
			) : (
				<>
					<Focus addSubject={setFocusedSubject} />
					<FocusHistory focusHistory={focusHistory} onClear={onClear} />
				</>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 0,
	},
});
