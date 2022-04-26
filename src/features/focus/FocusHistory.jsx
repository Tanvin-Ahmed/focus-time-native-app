import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React from "react";
import { fontSize } from "../../utils/sizes";
import RoundedButton from "../../components/RoundedButton";

const HistoryItem = ({ item, index }) => {
	return (
		<Text style={styles.historyItem(item.status)} key={index}>
			{item.subject}
		</Text>
	);
};

const FocusHistory = ({ focusHistory, onClear }) => {
	const clearHistory = () => {
		onClear();
	};

	return (
		<>
			<SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
				{!!focusHistory.length && (
					<>
						<Text style={styles.title}>Things we've focus on</Text>
						<FlatList
							style={{ flex: 1 }}
							contentContainerStyle={{ flex: 1, alignItems: "center" }}
							data={focusHistory}
							renderItem={HistoryItem}
							keyExtractor={(_, index) => index}
						/>
						<View style={styles.clearContainer}>
							<RoundedButton size={75} title="Clear" onPress={clearHistory} />
						</View>
					</>
				)}
			</SafeAreaView>
		</>
	);
};

export default FocusHistory;

const styles = StyleSheet.create({
	historyItem: status => ({
		color: status === 1 ? "#03fc1c" : "#ff1f39",
		fontSize: fontSize.md,
	}),
	title: {
		color: "white",
		fontSize: fontSize.lg,
	},
	clearContainer: {
		marginBottom: 20,
	},
});
