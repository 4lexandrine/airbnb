import React, { useState, useEffect, useCallback } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { AntDesign, } from "@expo/vector-icons";
import AppLayout from '../components/AppLayout';

const ProfileScreen = ({ setId, userId, setToken, token }) => {
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(true);
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
	const [uploading, setUploading] = useState(false);

	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [description, setDescription] = useState();
	const [user, setUser] = useState();
	const [image, setImage] = useState();

	const handleImagePicked = useCallback(async pickerResult => {
		let uploadResponse, uploadResult;
		try {
			setUploading(true);
			if (!pickerResult.cancelled) {
				const uri = pickerResult.uri;
				const uriParts = uri.split(".");
				const fileType = uriParts[uriParts.length - 1];
				const formData = new FormData();
				formData.append("photo", {
					uri,
					name: `photo.${fileType}`,
					type: `image/${fileType}`
				});

				uploadResponse = await axios.put(
					`https://api-airbnb.herokuapp.com/api/user/picture/${userId}`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							Accept: "application/json",
							"Content-Type": "multipart/form-data"
						}
					}
				);
				uploadResult = uploadResponse.data;
				if (
					Array.isArray(uploadResult) === true &&
					uploadResult.length
				) {
					setImage(uploadResult);
					// setUser(...user, uploadResult)
				}
			}
		} catch (e) {
			// console.error({ uploadResponse });
			// console.error({ uploadResult });
			console.error({ e });
			alert("Upload failed, sorry :(");
		} finally {
			setUploading(false);
		}
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api-airbnb.herokuapp.com/api/user/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						}
					}
				);
				setUser(response.data);
				setImage([response.data.account.photos[0]])
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [isUpdatingProfile]);

	return (
		<>
			{isLoading || isUpdatingProfile ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<ActivityIndicator size="large" color="lightgrey" />
				</View>
			) : (
					<AppLayout>
						<View style={{ height: "90%", justifyContent: 'space-around' }}>
							<TouchableOpacity
								style={{ alignItems: "center" }}
								onPress={async () => {
									const cameraRollPerm = await Permissions.askAsync(
										Permissions.CAMERA_ROLL
									);
									// if user allows permission to camera roll
									if (cameraRollPerm.status === "granted") {
										const pickerResult = await ImagePicker.launchImageLibraryAsync(
											{
												allowsEditing: true
											}
										);

										handleImagePicked(pickerResult);
									}
								}}
							>
								{!uploading ? (
									image && image[0] ? (
										<Image
											source={{ uri: image[0] }}
											style={{
												width: 200,
												height: 200,
												marginTop: 20,
												marginBottom: 10,
												borderRadius: 100
											}}
										/>
									) : (
											<View css={{
												width: 200,
												height: 200,
												marginBottom: 20,
											}}>
												<AntDesign name={"user"} size={120} color={"lightgrey"} />
											</View>
										)
								) : (
										<View style={{
											justifyContent: 'center',
											alignItems: 'center',
											width: 200,
											height: 200,
											marginTop: 20,
											marginBottom: 10,
										}}>
											<ActivityIndicator size="large" color="lightgrey" />
										</View>
									)}
							</TouchableOpacity>
							<View>
								<TextInput
									placeholder={'example@gmail.com'}
									defaultValue={user.email}
									autoCompleteType="email"
									autoCapitalize="none"
									style={styles.input}
									onChangeText={text => setEmail(text)}
								/>
								<TextInput
									placeholder={'username'}
									defaultValue={user.account.username}
									autoCapitalize="none"
									style={styles.input}
									onChangeText={text => setUsername(text)}
								/>
								<TextInput
									style={styles.inputArea}
									placeholder={'description'}
									defaultValue={user.account.description}
									onChangeText={text => setDescription(text)}
								/>
							</View>
							<View style={{ alignItems: "center" }}>
								<TouchableOpacity
									style={styles.btn}
									onPress={async () => {
										try {
											setIsUpdatingProfile(true)
											await axios.put(
												`https://api-airbnb.herokuapp.com/api/user/update/${userId}`,
												{ email, username, description },
												{
													headers: {
														Authorization: `Bearer ${token}`
													}
												}
											);
											setIsUpdatingProfile(false)
										} catch (error) {
											console.error(error);
										}
									}}
								>
									<Text style={styles.txtbtn}>Mettre à jour</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.btnfill}
									onPress={() => {
										setToken(null);
										setId(null);
									}}
								>
									<Text style={styles.txtbtnfill}>Se deconnecter</Text>
								</TouchableOpacity>
							</View>
						</View>
					</AppLayout>
				)}
		</>
	);
}
export default ProfileScreen;

const styles = StyleSheet.create({
	center: {
		alignItems: "center",
		justifyContent: "space-around",
	},
	input: {
		color: "black",
		borderBottomColor: "#F14F55",
		borderStyle: "solid",
		borderBottomWidth: 1,
		width: 300,
		marginBottom: 20
	},
	inputArea: {
		textAlignVertical: "top",
		paddingTop: 5,
		paddingLeft: 5,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#F14F55",
		marginBottom: 40,
		width: 300,
		height: 100
	},
	btn: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		borderColor: "#F14F55",
		borderWidth: 1,
		width: 200,
		height: 44,
		marginTop: 20
	},
	btnfill: {
		backgroundColor: "#F14F55",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		width: 200,
		height: 44,
		marginTop: 20
	},
	txtbtnfill: {
		color: "white",
		fontSize: 20,
		fontWeight: "normal"
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
