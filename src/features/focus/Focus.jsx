import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import RoundedButton from "../../components/RoundedButton";
import { fontSize, spacing } from "../../utils/sizes";

const Focus = ({ addSubject }) => {
	const [subject, setSubject] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>What would you like to focus on?</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputTextField}
						onSubmitEditing={({ nativeEvent }) => setSubject(nativeEvent.text)}
					/>
					<RoundedButton
						title="+"
						size={50}
						onPress={() => addSubject(subject)}
					/>
				</View>
			</View>
		</View>
	);
};

export default Focus;

const styles = StyleSheet.create({
	container: {
		flex: 0.5,
	},
	innerContainer: {
		flex: 1,
		padding: spacing.md,
		justifyContent: "center",
	},
	title: {
		fontWeight: "bold",
		color: "#fff",
		fontSize: fontSize.lg - 2,
	},
	inputContainer: {
		paddingTop: spacing.md,
		flexDirection: "row",
		alignItems: "center",
	},
	inputTextField: {
		flex: 1,
		marginRight: spacing.sm,
	},
});
