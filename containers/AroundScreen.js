import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, StyleSheet, View, Text, TouchableHighlight } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/core";

export default function AroundScreen() {
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(true);

	const [location, setLocation] = useState();
	const [coords, setCoords] = useState([]);

	const getLocation = useCallback(async () => {
		try {
			const { status } = await Location.requestPermissionsAsync();
			if (status !== "granted") {
				setErrorMessage("Permission refusée");
			} else {
				const location = await Location.getCurrentPositionAsync({});
				setLocation(location);
				const response = await axios.get(
					`https://api-airbnb.herokuapp.com/api/room/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
				);

				setCoords(response.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.error(error);
		}
	});

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View>
					<ActivityIndicator size="large" color="lightgrey" />
				</View>
			) : (
					<View style={{ width: "100%", height: "100%" }}>
						<MapView
							initialRegion={{
								latitude: location.coords.latitude,
								longitude: location.coords.longitude,
								latitudeDelta: 0.2,
								longitudeDelta: 0.2
							}}
							showsUserLocation={true}
							provider={PROVIDER_GOOGLE}
							style={{ width: "100%", height: "100%" }}
							minZoomLevel={5}
							maxZoomLevel={19}
						>
							{coords.map(marker => {
								return (
									<View key={marker._id}>
										<MapView.Marker
											title={marker.title}
											description={marker.description}
											coordinate={{
												latitude: marker.loc[1],
												longitude: marker.loc[0]
											}}
											onCalloutPress={() => {
												navigation.navigate("Room", { roomId: marker._id });
											}}
										>
											<MapView.Callout tooltip>
												<TouchableHighlight
													underlayColor='#dddddd'>
													<View style={{ backgroundColor: 'white', padding: 10 }}>
														<Text>{marker.title}</Text>
													</View>
												</TouchableHighlight>
											</MapView.Callout>
										</MapView.Marker>
									</View>
								);
							})}
						</MapView>
					</View>
				)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: "white",
	}
});
