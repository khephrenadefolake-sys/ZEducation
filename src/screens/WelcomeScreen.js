import React from "react";
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	Image,
} from "react-native";

	function ClassroomBackdrop() {
		return (
			<View style={s.classroomBackdrop} pointerEvents="none">
				<View style={s.window} />
				<View style={s.digitalBoard}>
					<Text style={s.boardTitle}>ZEGBE EDUCATION CLUB</Text>
					<Text style={s.boardText}>APPRENDRE ENSEMBLE</Text>
				</View>
				<View style={s.shelf} />
				<View style={[s.student, s.studentOne]}>
					<View style={[s.head, { backgroundColor: "#D9966E" }]} />
					<View style={[s.body, { backgroundColor: "#4D8BC9" }]} />
				</View>
				<View style={[s.student, s.studentTwo]}>
					<View style={[s.head, { backgroundColor: "#8B5A3C" }]} />
					<View style={[s.body, { backgroundColor: "#E47755" }]} />
				</View>
				<View style={s.deskOne} />
				<View style={s.deskTwo} />
				<View style={s.floor} />
			</View>
		);
	}

export default function WelcomeScreen({ go }) {
	return (
		<SafeAreaView style={s.safe}>
			<StatusBar barStyle="light-content" backgroundColor="#123C69" />
				<View style={s.background}>
					<ClassroomBackdrop />
				<View style={s.backgroundWash} />
				<ScrollView contentContainerStyle={s.center}>
				<View style={s.brandMark} accessibilityLabel="Logo ZEGBE EDUCATION CLUB">
					<View style={s.capTop}>
						<Text style={s.capText}>Z</Text>
					</View>
					<View style={s.capBase} />
					<View style={s.capTassel} />
				</View>
				<Text style={s.app}>ZEGBE EDUCATION CLUB</Text>
				<Text style={s.sub}>L'excellence scolaire commence ici</Text>
				<View style={s.schoolVisual}>
					<Image
						source={require("../../assets/icon.png")}
						style={s.schoolImage}
						resizeMode="cover"
					/>
					<Text style={s.schoolCaption}>Apprendre • Comprendre • Réussir</Text>
				</View>
				<View style={s.card}>
					<Text style={s.welcome}>Bienvenue 👋</Text>
					<Text style={s.text}>
						Une application éducative destinée aux élèves du CP1 au CM2.
					</Text>
					<Text style={s.text}>Cours • Exercices • Quiz • Progression</Text>
				</View>
				<TouchableOpacity style={s.primary} onPress={() => go("INSCRIPTION")}>
					<Text style={s.primaryText}>CRÉER UN COMPTE</Text>
				</TouchableOpacity>
				<TouchableOpacity style={s.secondary} onPress={() => go("CONNEXION")}>
					<Text style={s.secondaryText}>SE CONNECTER</Text>
				</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const s = {
	safe: { flex: 1, backgroundColor: "#F4F7FB" },
	background: { flex: 1 },
	backgroundWash: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(244,247,251,0.86)",
	},
	classroomBackdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#DDECF3",
		overflow: "hidden",
	},
	window: {
		position: "absolute",
		top: 80,
		left: 18,
		width: 120,
		height: 170,
		borderWidth: 10,
		borderColor: "#FFFFFF",
		backgroundColor: "#A9D8EE",
	},
	digitalBoard: {
		position: "absolute",
		top: 85,
		left: "25%",
		width: "50%",
		height: 150,
		borderWidth: 8,
		borderColor: "#F2B84B",
		backgroundColor: "#315E78",
		alignItems: "center",
		justifyContent: "center",
	},
	boardTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
	boardText: { color: "#D9F2FF", fontSize: 10, marginTop: 10 },
	shelf: {
		position: "absolute",
		top: 300,
		right: 22,
		width: 100,
		height: 12,
		backgroundColor: "#B47A4D",
	},
	student: { position: "absolute", alignItems: "center" },
	studentOne: { top: "51%", left: "12%" },
	studentTwo: { top: "47%", right: "11%" },
	head: { width: 54, height: 54, borderRadius: 27 },
	body: { width: 100, height: 90, borderRadius: 36, marginTop: 8 },
	deskOne: {
		position: "absolute",
		left: "5%",
		top: "65%",
		width: "42%",
		height: 18,
		backgroundColor: "#D48B55",
		transform: [{ rotate: "-4deg" }],
	},
	deskTwo: {
		position: "absolute",
		right: "5%",
		top: "62%",
		width: "42%",
		height: 18,
		backgroundColor: "#D48B55",
		transform: [{ rotate: "4deg" }],
	},
	floor: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "29%",
		backgroundColor: "#C7DDE5",
	},
	center: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	brandMark: {
		width: 94,
		height: 78,
		marginBottom: 16,
		alignItems: "center",
		position: "relative",
	},
	capTop: {
		width: 72,
		height: 52,
		borderRadius: 18,
		backgroundColor: "#123C69",
		transform: [{ rotate: "-8deg" }],
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
	},
	capText: { color: "#FFFFFF", fontSize: 36, fontWeight: "900" },
	capBase: {
		position: "absolute",
		bottom: 8,
		width: 92,
		height: 13,
		borderRadius: 10,
		backgroundColor: "#F2B84B",
		transform: [{ rotate: "-8deg" }],
	},
	capTassel: {
		position: "absolute",
		right: 4,
		bottom: 0,
		width: 8,
		height: 19,
		borderRadius: 4,
		backgroundColor: "#F2B84B",
		transform: [{ rotate: "-8deg" }],
	},
	app: {
		fontSize: 27,
		fontWeight: "900",
		color: "#123C69",
		letterSpacing: 1,
		textAlign: "center",
	},
	sub: { marginTop: 8, color: "#607080", fontSize: 15, textAlign: "center" },
	schoolVisual: {
		width: "100%",
		height: 150,
		marginTop: 24,
		borderRadius: 18,
		overflow: "hidden",
		backgroundColor: "#E6F4FE",
		position: "relative",
		elevation: 2,
	},
	schoolImage: { width: "100%", height: "100%", opacity: 0.9 },
	schoolCaption: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 10,
		paddingHorizontal: 12,
		backgroundColor: "rgba(18,60,105,0.86)",
		color: "#FFF",
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
	},
	card: {
		width: "100%",
		backgroundColor: "#FFF",
		borderRadius: 18,
		padding: 22,
		marginTop: 20,
		marginBottom: 20,
		elevation: 3,
	},
	welcome: { fontSize: 22, fontWeight: "bold", color: "#123C69", marginBottom: 12 },
	text: { fontSize: 15, color: "#4B5563", lineHeight: 23, marginBottom: 8 },
	primary: {
		width: "100%",
		backgroundColor: "#123C69",
		paddingVertical: 15,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 14,
	},
	primaryText: { color: "#FFF", fontSize: 15, fontWeight: "bold" },
	secondary: {
		width: "100%",
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#123C69",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 12,
	},
	secondaryText: { color: "#123C69", fontSize: 15, fontWeight: "bold" },
};
