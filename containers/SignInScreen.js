import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen({ setToken, setId }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();
	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container}>
			<View style={styles.home}>
				<Ionicons
					name="ios-home"
					size={150}
					color="white"
					style={{ textAlign: "center", marginBottom: 100 }}
				/>
				<View>
					<TextInput
						placeholder="Email"
						value={email}
						autoCompleteType="email"
						autoCapitalize="none"
						style={styles.input}
						onChangeText={text => setEmail(text)}
					/>
					<TextInput
						placeholder="Password"
						value={password}
						secureTextEntry={true}
						autoCompleteType='password'
						style={styles.input}
						onChangeText={text => setPassword(text)}
					/>
				</View>
				<View style={{ alignItems: "center" }}>
					<TouchableOpacity
						style={styles.btn}
						onPress={async () => {
							try {
								const response = await axios.post(
									"https://api-airbnb.herokuapp.com/api/user/login",
									{ email, password },
									{
										headers: {
											"Content-Type": "application/json"
										}
									}
								);
								setToken(response.data.token);
								setId(response.data._id);
							} catch (error) {
								console.error(error);
							}
						}}
					>
						<Text style={styles.txtbtn}>Se connecter</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.linkbtn}
						onPress={() => {
							navigation.navigate("SignUp");
						}}
					>
						<Text style={styles.link}>Pas de compte ? S'inscrire</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F14F55"
	},
	home: {
		height: Dimensions.get("window").height - 80,
		alignItems: "center",
		justifyContent: "space-around",
		marginVertical: 40
	},
	input: {
		color: "white",
		borderBottomColor: "white",
		borderStyle: "solid",
		borderBottomWidth: 1,
		marginBottom: 60,
		width: 300
	},
	btn: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		width: 200,
		height: 44,
		marginTop: 50
	},
	txtbtn: {
		color: "#F14F55",
		fontSize: 20,
		fontWeight: "normal"
	},
	linkbtn: {
		borderStyle: "solid",
		borderBottomWidth: 1,
		borderBottomColor: "white"
	},
	link: {
		color: "white",
		marginTop: 50
	}
});
