import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
	Dimensions,
	Text,
	TextInput,
	View,
	StatusBar,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken, setId }) {
	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container} >
			<View style={styles.center}>
				<Text
					style={{
						color: "white",
						fontSize: 25,
						fontWeight: "300",
						marginBottom: 20
					}}
				>
					Rejoignez-nous !
						</Text>
				<TextInput
					style={styles.input}
					placeholder="email"
					autoCapitalize="none"
					value={email}
					autoCompleteType='email'
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="username"
					value={username}
					autoCompleteType='username'
					onChangeText={text => setUsername(text)}
				/>
				<TextInput
					style={styles.inputArea}
					placeholder="présentez-vous en quelques mots..."
					value={description}
					onChangeText={text => setDescription(text)}
				/>

				<TextInput
					style={styles.input}
					placeholder="mot de passe"
					secureTextEntry={true}
					autoCompleteType='password'
					value={password}
					onChangeText={text => setPassword(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="confirmez le mot de passe"
					secureTextEntry={true}
					autoCompleteType='password'
					value={confirm}
					onChangeText={text => setConfirm(text)}
				/>

				<TouchableOpacity
					style={styles.btn}
					onPress={async () => {
						try {
							const response = await axios.post(
								"https://api-airbnb.herokuapp.com/api/user/signup",
								{ email, username, description, password },
								{
									headers: {
										"Content-Type": "application/json"
									}
								}
							);
							setToken(response.data.token);
							setId(response.data._id)
							navigation.navigate("Home");
						} catch (error) {
							console.error(error);
						}
					}}
				>
					<Text style={styles.txtbtn}>S'inscrire</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.linkbtn}
					onPress={() => {
						navigation.navigate("SignIn");
					}}
				>
					<Text style={styles.link}>Déjà un compte ? Se connecter</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: Dimensions.get("window").height + StatusBar.currentHeight,
		backgroundColor: "#F14F55",
	},
	center: {
		height: '100%',
		alignItems: "center",
		justifyContent: "space-around",
		paddingVertical: 40,
	},
	input: {
		color: "white",
		borderBottomColor: "white",
		borderStyle: "solid",
		borderBottomWidth: 1,
		width: 300,
		marginBottom: 10
	},
	inputArea: {
		textAlignVertical: "top",
		paddingTop: 5,
		paddingLeft: 5,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "white",
		color: "white",
		marginBottom: 40,
		width: 300,
		height: 50
	},
	btn: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		width: 200,
		height: 44,
		marginTop: 80
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
		marginTop: 10
	}
});
