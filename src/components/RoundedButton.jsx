import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const RoundedButton = ({
	style = {},
	textStyle = {},
	size = 125,
	...props
}) => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={[styles(size).radius, style]}
		>
			<Text style={[styles(size).btnText, textStyle]}>{props.title}</Text>
		</TouchableOpacity>
	);
};

export default RoundedButton;

const styles = size =>
	StyleSheet.create({
		radius: {
			borderRadius: size / 2,
			width: size,
			height: size,
			alignItems: "center",
			justifyContent: "center",
			borderColor: "#fff",
			borderWidth: 2,
		},
		btnText: {
			color: "#fff",
			fontSize: size / 3,
		},
	});
