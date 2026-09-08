import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import {
  RUBRIQUES_CP,
  RUBRIQUES_CE_CM,
} from "../data/matieres";

export default function FrancaisScreen({
  niveau,
  onRubrique,
  onRetour,
}) {
  const estCP = niveau === "CP1" || niveau === "CP2";

  const rubriques = estCP
    ? RUBRIQUES_CP
    : RUBRIQUES_CE_CM;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onRetour}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>‹ Retour</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerIcon}>📚</Text>

          <View style={styles.headerContent}>
            <Text style={styles.title}>FRANÇAIS</Text>

            <Text style={styles.subtitle}>
              Niveau : {niveau || "Non défini"}
            </Text>
          </View>
        </View>

        <Text style={styles.introduction}>
          Choisis une rubrique pour accéder à tes
          cours et à tes activités de français.
        </Text>

        {rubriques.map((rubrique) => (
          <TouchableOpacity
            key={rubrique.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => onRubrique(rubrique)}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                {rubrique.icon}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {rubrique.nom}
              </Text>

              <Text style={styles.cardDescription}>
                Accéder aux cours et aux exercices.
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            🎓 Conseil
          </Text>

          <Text style={styles.infoText}>
            Travaille régulièrement chaque rubrique
            pour améliorer ton niveau de français.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  container: {
    padding: 18,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 15,
    alignSelf: "flex-start",
  },

  backText: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "bold",
  },

  header: {
    backgroundColor: "#123C69",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  headerIcon: {
    fontSize: 38,
    marginRight: 14,
  },

  headerContent: {
    flex: 1,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    color: "#DCEBFA",
    fontSize: 14,
    fontWeight: "bold",
  },

  introduction: {
    color: "#526579",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: "#EAF2FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  icon: {
    fontSize: 29,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  cardDescription: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
  },

  chevron: {
    color: "#94A3B8",
    fontSize: 30,
    marginLeft: 8,
  },

  infoBox: {
    backgroundColor: "#EAF2FA",
    borderRadius: 16,
    padding: 17,
    marginTop: 10,
  },

  infoTitle: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  infoText: {
    color: "#526579",
    fontSize: 13,
    lineHeight: 19,
  },
});