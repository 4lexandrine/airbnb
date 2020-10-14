import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
	ActivityIndicator,
	FlatList,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import axios from "axios";
import Room from "../components/Room";

export default function HomeScreen() {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://api-airbnb.herokuapp.com/api/room?city=paris"
			);
			setData(response.data.rooms);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<>
			{isLoading ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size="large" color="lightgrey" />
				</View>
			) : (
					<View style={styles.container}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={data}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("Room", { roomId: item._id });
										}}
									>
										<Room {...item} />
									</TouchableOpacity>
								);
							}}
							keyExtractor={item => {
								return item._id;
							}}
						/>
					</View>
				)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "white",
		paddingTop: StatusBar.currentHeight
	}
});
