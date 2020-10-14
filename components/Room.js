import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const windowWidth = Dimensions.get('window').width;

const Room = ({ title, price, ratingValue, reviews, photos, user }) => {
	let results = [];
	for (let i = 0; i < 5; i++) {
		if (ratingValue && ratingValue > i) {
			results.push("yellow");
		} else {
			results.push("grey");
		}
	}
	return (
		<View style={styles.container}>
			<Image style={styles.img} source={{ uri: photos[0] }} />
			<View style={styles.greyBorder}>
				<View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between" }}>
					<View>
						<View style={styles.priceBox}>
							<Text style={styles.price}>{price} €</Text>
						</View>
						<Text numberOfLines={1} style={{ fontSize: 18, marginBottom: 5 }}>
							{title}
						</Text>
						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
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
							<Text style={styles.reviews}>{reviews} avis</Text>
						</View>
					</View>
					<Image
						style={styles.profilePhoto}
						source={{ uri: user.account.photos[0] }}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		paddingHorizontal: 20,
		width: windowWidth - 20
	},
	priceBox: {
		position: "absolute",
		top: -70,
		backgroundColor: "black",
		height: 50,
		width: 60,
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
	greyBorder: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderStyle: "solid",
		borderColor: "lightgrey",
		borderBottomWidth: 1,
		paddingBottom: 20
	},
	img: {
		height: '100%',
		height: 300,
		resizeMode: "cover",
		position: "relative",
		marginBottom: 10
	},
	profilePhoto: {
		width: 50,
		height: 50,
		borderRadius: 50
	}
});

export default Room;
