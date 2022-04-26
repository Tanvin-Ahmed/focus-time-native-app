import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RoundedButton from "../../components/RoundedButton";

const Timing = ({ onchangeTime }) => {
	return (
		<View style={styles.container}>
			<View style={styles.timingButton}>
				<RoundedButton size={75} title="10" onPress={() => onchangeTime(10)} />
			</View>
			<View style={styles.timingButton}>
				<RoundedButton size={75} title="15" onPress={() => onchangeTime(15)} />
			</View>
			<View style={styles.timingButton}>
				<RoundedButton size={75} title="20" onPress={() => onchangeTime(20)} />
			</View>
		</View>
	);
};

export default Timing;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	timingButton: {
		flex: 1,
		alignItems: "center",
	},
});
