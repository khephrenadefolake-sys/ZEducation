import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import { CHAPITRES_CM2 } from "../data/programmeCM2";

export default function GrammaireScreen({
  niveau,
  onChapitre,
  onRetour,
}) {
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
          <Text style={styles.headerIcon}>📝</Text>

          <View style={styles.headerContent}>
            <Text style={styles.title}>
              GRAMMAIRE
            </Text>

            <Text style={styles.subtitle}>
              Niveau : {niveau || "CM2"}
            </Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>
            📚 Programme de grammaire
          </Text>

          <Text style={styles.summaryText}>
            11 chapitres • 72 leçons
          </Text>

          <Text style={styles.summaryDescription}>
            Sélectionne un chapitre pour découvrir
            les leçons correspondantes.
          </Text>
        </View>

        {CHAPITRES_CM2.map((chapitre, index) => (
          <TouchableOpacity
            key={chapitre.id || index}
            style={styles.card}
            onPress={() => onChapitre(chapitre)}
            activeOpacity={0.8}
          >
            <View style={styles.numberBox}>
              <Text style={styles.number}>
                {index + 1}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {chapitre.nom || chapitre.titre}
              </Text>

              <Text style={styles.cardDescription}>
                {chapitre.lecons
                  ? `${chapitre.lecons.length} leçons`
                  : "Voir les leçons"}
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            🎓 ZEGBE CLUB EDUCATION
          </Text>

          <Text style={styles.footerText}>
            Maîtrise la grammaire, progresse en français
            et prépare-toi à l'excellence.
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
    paddingBottom: 45,
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

  summaryBox: {
    backgroundColor: "#EAF2FA",
    borderRadius: 16,
    padding: 17,
    marginBottom: 18,
  },

  summaryTitle: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  summaryText: {
    color: "#123C69",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  summaryDescription: {
    color: "#526579",
    fontSize: 13,
    lineHeight: 19,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  numberBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#123C69",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  number: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 20,
    marginBottom: 4,
  },

  cardDescription: {
    color: "#64748B",
    fontSize: 13,
  },

  chevron: {
    color: "#94A3B8",
    fontSize: 30,
    marginLeft: 8,
  },

  footer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 17,
    marginTop: 10,
  },

  footerTitle: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },

  footerText: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
});