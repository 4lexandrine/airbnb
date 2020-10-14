import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import Carousel from 'react-native-snap-carousel';
import AppLayout from '../components/AppLayout';

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
	const { params } = useRoute();
	const [isLoading, setIsLoading] = useState(true);

	const [data, setData] = useState();
	const [lines, setLines] = useState(3);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api-airbnb.herokuapp.com/api/room/${params.roomId}`
				);
				setData(response.data);

				setLatitude(response.data.loc[1]);
				setLongitude(response.data.loc[0]);

				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	// rating stars
	let results = [];
	for (let i = 0; i < 5; i++) {
		if (data && data.ratingValue > i) {
			results.push("yellow");
		} else {
			results.push("grey");
		}
	}

	return (
		<>
			{isLoading ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size="large" color="lightgrey" />
				</View>
			) : (
					<AppLayout>
						{/* <FlatList
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							data={data.photos}
							ItemSeparatorComponent={() => <View style={{ width: 20 }}></View>}
							getItemLayout={(data, index) => (
								{ length: windowWidth, offset: (windowWidth + 20) * index, index }
							)}
							renderItem={({ item }) => {
								return (
									<View style={{ alignItems: 'center', width: windowWidth }}>
										<Image source={{ uri: item }} style={styles.img} />
									</View>
								)
							}}
							keyExtractor={item => {
								return item;
							}}
						/> */}

						<View style={{ alignItems: 'center', width: windowWidth, height: 300, position: 'relative' }}>
							<Carousel
								data={data.photos}
								renderItem={({ item }) => {
									return (
										<Image source={{ uri: item }} style={styles.img} />
									)
								}}
								sliderWidth={windowWidth}
								itemWidth={windowWidth}
								inactiveSlideScale={1}
								autoplay
								loop
							/>
							<View style={styles.priceBox}>
								<Text style={styles.price}>{data.price} €</Text>
							</View>
						</View>
						<View style={styles.bottomContainer}>
							<View style={{ flex: 1 }}>
								<Text numberOfLines={1} style={{ fontSize: 18, marginVertical: 8 }}>
									{data.title}
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between"
									}}
								>
									<Text>
										{results.map((result, index) => {
											if (result === "yellow") {
												return (
													<FontAwesome
														key={index}
														name={"star"}
														size={20}
														color={"gold"}
													/>
												);
											} else if (result === "grey") {
												return (
													<FontAwesome
														key={index}
														name={"star"}
														size={20}
														color={"lightgrey"}
													/>
												);
											}
										})}
									</Text>
									<Text style={styles.reviews}>{data.reviews} avis</Text>
								</View>
							</View>
							<Image
								style={styles.profilePhoto}
								source={{ uri: data.user.account.photos[0] }}
							/>
						</View>
						<View style={styles.description}>
							<TouchableOpacity
								onPress={() => {
									if (lines === 3) {
										setLines(0);
									} else {
										setLines(3);
									}
								}}
							>
								<Text numberOfLines={lines}>{data.description}</Text>
							</TouchableOpacity>
						</View>
						<MapView
							initialRegion={{
								latitude,
								longitude,
								latitudeDelta: 0.1,
								longitudeDelta: 0.1
							}}
							provider={PROVIDER_GOOGLE}
							style={{ width: '100%', height: 200, marginTop: 20, borderRadius: 5 }}
							minZoomLevel={5}
							maxZoomLevel={18}
						>
							<>
								<MapView.Marker
									coordinate={{ latitude, longitude }}
								/>
							</>
						</MapView>
					</AppLayout>
				)}
		</>
	);
}

const styles = StyleSheet.create({
	priceBox: {
		position: "absolute",
		bottom: 40,
		left: 0,
		height: 50,
		width: 60,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center"
	},
	price: {
		color: "white",
		fontSize: 18
	},
	reviews: {
		color: "#B3B2B3",
		fontSize: 18
	},
	bottomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 20,
		paddingHorizontal: 20
	},
	img: {
		width: "100%",
		height: '100%',
		resizeMode: "cover",
		// marginBottom: 20,
	},
	profilePhoto: {
		width: 50,
		height: 50,
		borderRadius: 50
	},
	description: {
		paddingHorizontal: 10,
		width: '95%'
	}
});
