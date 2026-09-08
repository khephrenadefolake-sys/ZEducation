import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import ProgressBar from "../components/ProgressBar";

export default function ProgressionScreen({
  niveau,
  scoreExercice = 0,
  totalExercices = 0,
  scoreQuiz = 0,
  totalQuiz = 0,
  onRetour,
}) {
  const pourcentageExercice =
    totalExercices > 0
      ? Math.round((scoreExercice / totalExercices) * 100)
      : 0;

  const pourcentageQuiz =
    totalQuiz > 0
      ? Math.round((scoreQuiz / totalQuiz) * 100)
      : 0;

  const moyenne =
    totalExercices + totalQuiz > 0
      ? Math.round(
          ((scoreExercice + scoreQuiz) /
            (totalExercices + totalQuiz)) *
            100
        )
      : 0;

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
          <Text style={styles.headerIcon}>📊</Text>

          <View style={styles.headerContent}>
            <Text style={styles.title}>
              MA PROGRESSION
            </Text>

            <Text style={styles.subtitle}>
              Niveau : {niveau || "Non défini"}
            </Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.mainIcon}>🎓</Text>

          <Text style={styles.mainTitle}>
            Ta progression générale
          </Text>

          <Text style={styles.mainScore}>
            {moyenne} %
          </Text>

          <ProgressBar progress={moyenne} />

          <Text style={styles.mainText}>
            Continue à travailler régulièrement pour
            améliorer tes résultats.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📝 Exercices
          </Text>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>
              Résultat
            </Text>

            <Text style={styles.scoreValue}>
              {scoreExercice} / {totalExercices}
            </Text>
          </View>

          <ProgressBar progress={pourcentageExercice} />

          <Text style={styles.percentage}>
            {pourcentageExercice} %
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🧠 Quiz
          </Text>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>
              Résultat
            </Text>

            <Text style={styles.scoreValue}>
              {scoreQuiz} / {totalQuiz}
            </Text>
          </View>

          <ProgressBar progress={pourcentageQuiz} />

          <Text style={styles.percentage}>
            {pourcentageQuiz} %
          </Text>
        </View>

        <View style={styles.objectiveBox}>
          <Text style={styles.objectiveTitle}>
            🎯 Ton objectif
          </Text>

          <Text style={styles.objectiveText}>
            Vise au moins 80 % de réussite. Relis tes
            leçons et recommence les exercices lorsque
            tu rencontres des difficultés.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.returnButton}
          onPress={onRetour}
          activeOpacity={0.8}
        >
          <Text style={styles.returnText}>
            ← RETOUR AU MENU
          </Text>
        </TouchableOpacity>

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
    alignSelf: "flex-start",
    marginBottom: 15,
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
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    color: "#DCEBFA",
    fontSize: 14,
    fontWeight: "bold",
  },

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
  },

  mainIcon: {
    fontSize: 45,
    marginBottom: 8,
  },

  mainTitle: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },

  mainScore: {
    color: "#123C69",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 12,
  },

  mainText: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 12,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
  },

  sectionTitle: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 14,
  },

  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  scoreLabel: {
    color: "#64748B",
    fontSize: 13,
  },

  scoreValue: {
    color: "#123C69",
    fontSize: 14,
    fontWeight: "bold",
  },

  percentage: {
    color: "#123C69",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 7,
  },

  objectiveBox: {
    backgroundColor: "#EAF2FA",
    borderRadius: 16,
    padding: 18,
    marginTop: 2,
    marginBottom: 15,
  },

  objectiveTitle: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7,
  },

  objectiveText: {
    color: "#526579",
    fontSize: 13,
    lineHeight: 20,
  },

  returnButton: {
    backgroundColor: "#123C69",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  returnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});