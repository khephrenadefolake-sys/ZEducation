import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function LeconsScreen({
  chapitre,
  niveau,
  onLecon,
  onRetour,
}) {
  const titreChapitre =
    chapitre?.nom ||
    chapitre?.titre ||
    "Chapitre de grammaire";

  const lecons = chapitre?.lecons || [];

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
          <Text style={styles.headerIcon}>📖</Text>

          <View style={styles.headerContent}>
            <Text style={styles.title}>
              LEÇONS
            </Text>

            <Text style={styles.subtitle}>
              {niveau || "CM2"}
            </Text>
          </View>
        </View>

        <View style={styles.chapterBox}>
          <Text style={styles.chapterLabel}>
            CHAPITRE
          </Text>

          <Text style={styles.chapterTitle}>
            {titreChapitre}
          </Text>

          <Text style={styles.chapterCount}>
            {lecons.length} leçon
            {lecons.length > 1 ? "s" : ""}
          </Text>
        </View>

        {lecons.length > 0 ? (
          lecons.map((lecon, index) => {
            const titre =
              typeof lecon === "string"
                ? lecon
                : lecon?.nom ||
                  lecon?.titre ||
                  `Leçon ${index + 1}`;

            return (
              <TouchableOpacity
                key={lecon?.id || index}
                style={styles.lessonCard}
                onPress={() => onLecon(lecon, index)}
                activeOpacity={0.8}
              >
                <View style={styles.lessonNumber}>
                  <Text style={styles.numberText}>
                    {index + 1}
                  </Text>
                </View>

                <View style={styles.lessonContent}>
                  <Text style={styles.lessonLabel}>
                    LEÇON {index + 1}
                  </Text>

                  <Text style={styles.lessonTitle}>
                    {titre}
                  </Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📚</Text>

            <Text style={styles.emptyTitle}>
              Aucune leçon disponible
            </Text>

            <Text style={styles.emptyText}>
              Le contenu de ce chapitre sera bientôt
              disponible.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            🎓 ZEGBE CLUB EDUCATION
          </Text>

          <Text style={styles.footerText}>
            Lis attentivement chaque leçon et entraîne-toi
            régulièrement pour progresser.
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    color: "#DCEBFA",
    fontSize: 14,
    fontWeight: "bold",
  },

  chapterBox: {
    backgroundColor: "#EAF2FA",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  chapterLabel: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
  },

  chapterTitle: {
    color: "#123C69",
    fontSize: 19,
    fontWeight: "bold",
    lineHeight: 25,
    marginBottom: 5,
  },

  chapterCount: {
    color: "#526579",
    fontSize: 13,
  },

  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  lessonNumber: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#123C69",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  numberText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  lessonContent: {
    flex: 1,
  },

  lessonLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
  },

  lessonTitle: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 20,
  },

  chevron: {
    color: "#94A3B8",
    fontSize: 30,
    marginLeft: 8,
  },

  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 7,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
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