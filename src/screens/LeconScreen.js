import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function LeconScreen({
  lecon,
  niveau,
  onRetour,
}) {
  const titre =
    typeof lecon === "string"
      ? lecon
      : lecon?.nom ||
        lecon?.titre ||
        "Leçon de français";

  const contenu =
    typeof lecon === "object" && lecon
      ? lecon
      : {};

  const definition =
    contenu.definition ||
    contenu.explication ||
    contenu.contenu ||
    "Cette leçon permet de découvrir et de maîtriser une nouvelle notion de français.";

  const exemples = Array.isArray(contenu.exemples)
    ? contenu.exemples
    : [];

  const exercices = Array.isArray(contenu.exercices)
    ? contenu.exercices
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onRetour}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>
            ‹ Retour
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerIcon}>📖</Text>

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>
              LEÇON
            </Text>

            <Text style={styles.headerLevel}>
              Niveau : {niveau || "CM2"}
            </Text>
          </View>
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.lessonTitle}>
            {titre}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📚 À retenir
          </Text>

          <Text style={styles.definition}>
            {definition}
          </Text>
        </View>

        {exemples.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              ✏️ Exemples
            </Text>

            {exemples.map((exemple, index) => (
              <View
                key={index}
                style={styles.exampleBox}
              >
                <Text style={styles.exampleNumber}>
                  {index + 1}
                </Text>

                <Text style={styles.exampleText}>
                  {typeof exemple === "string"
                    ? exemple
                    : exemple?.texte ||
                      exemple?.phrase ||
                      JSON.stringify(exemple)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {exercices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              📝 Exercices
            </Text>

            {exercices.map((exercice, index) => (
              <View
                key={index}
                style={styles.exerciseBox}
              >
                <Text style={styles.exerciseNumber}>
                  Exercice {index + 1}
                </Text>

                <Text style={styles.exerciseText}>
                  {typeof exercice === "string"
                    ? exercice
                    : exercice?.question ||
                      exercice?.texte ||
                      JSON.stringify(exercice)}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>
            💡 Conseil
          </Text>

          <Text style={styles.tipText}>
            Lis attentivement la leçon, retiens les
            règles importantes et entraîne-toi avec
            les exemples avant de passer aux exercices.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.returnButton}
          onPress={onRetour}
          activeOpacity={0.8}
        >
          <Text style={styles.returnText}>
            ← Retour aux leçons
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

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  headerLevel: {
    color: "#DCEBFA",
    fontSize: 14,
    fontWeight: "bold",
  },

  titleBox: {
    backgroundColor: "#EAF2FA",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  lessonTitle: {
    color: "#123C69",
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 28,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },

  sectionTitle: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 12,
  },

  definition: {
    color: "#334155",
    fontSize: 15,
    lineHeight: 23,
  },

  exampleBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F4F7FB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },

  exampleNumber: {
    color: "#FFFFFF",
    backgroundColor: "#123C69",
    width: 25,
    height: 25,
    borderRadius: 13,
    textAlign: "center",
    paddingTop: 3,
    fontWeight: "bold",
    marginRight: 10,
  },

  exampleText: {
    flex: 1,
    color: "#334155",
    fontSize: 14,
    lineHeight: 21,
  },

  exerciseBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#123C69",
    backgroundColor: "#F8FAFC",
    padding: 13,
    marginBottom: 10,
    borderRadius: 8,
  },

  exerciseNumber: {
    color: "#123C69",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },

  exerciseText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 21,
  },

  tipBox: {
    backgroundColor: "#FFF8E7",
    borderRadius: 16,
    padding: 17,
    marginBottom: 15,
  },

  tipTitle: {
    color: "#8A5A00",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  tipText: {
    color: "#6B5500",
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
    fontSize: 15,
    fontWeight: "bold",
  },
});