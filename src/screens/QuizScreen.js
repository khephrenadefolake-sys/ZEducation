import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import { QUIZ } from "../data/quiz";

export default function QuizScreen({
  niveau,
  onRetour,
}) {
  const [questionActuelle, setQuestionActuelle] = useState(0);
  const [score, setScore] = useState(0);
  const [reponseSelectionnee, setReponseSelectionnee] =
    useState(null);
  const [correctionVisible, setCorrectionVisible] =
    useState(false);
  const [termine, setTermine] = useState(false);

  const question = QUIZ[questionActuelle];

  const choisirReponse = (index) => {
    if (correctionVisible) {
      return;
    }

    setReponseSelectionnee(index);
    setCorrectionVisible(true);

    if (index === question.reponse) {
      setScore((ancienScore) => ancienScore + 1);
    }
  };

  const questionSuivante = () => {
    if (questionActuelle < QUIZ.length - 1) {
      setQuestionActuelle(
        (ancienneQuestion) => ancienneQuestion + 1
      );
      setReponseSelectionnee(null);
      setCorrectionVisible(false);
    } else {
      setTermine(true);
    }
  };

  const recommencer = () => {
    setQuestionActuelle(0);
    setScore(0);
    setReponseSelectionnee(null);
    setCorrectionVisible(false);
    setTermine(false);
  };

  if (!question && !termine) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🧠</Text>

          <Text style={styles.emptyTitle}>
            Aucun quiz disponible
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onRetour}
          >
            <Text style={styles.primaryButtonText}>
              ← RETOUR
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (termine) {
    const pourcentage =
      QUIZ.length > 0
        ? Math.round((score / QUIZ.length) * 100)
        : 0;

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.resultContainer}
        >
          <Text style={styles.resultIcon}>🏆</Text>

          <Text style={styles.resultTitle}>
            QUIZ TERMINÉ !
          </Text>

          <Text style={styles.resultScore}>
            {score} / {QUIZ.length}
          </Text>

          <Text style={styles.resultPercentage}>
            {pourcentage} %
          </Text>

          <View style={styles.resultBox}>
            <Text style={styles.resultBoxTitle}>
              {pourcentage >= 80
                ? "🌟 Excellent !"
                : pourcentage >= 50
                ? "👍 Bon travail !"
                : "💪 Continue tes efforts !"}
            </Text>

            <Text style={styles.resultBoxText}>
              {pourcentage >= 80
                ? "Tu as très bien réussi ce quiz. Continue ainsi !"
                : pourcentage >= 50
                ? "Tu progresses bien. Revois les notions que tu maîtrises moins."
                : "Relis tes leçons et recommence le quiz pour progresser."}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={recommencer}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              🔄 RECOMMENCER LE QUIZ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onRetour}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>
              ← RETOUR AU MENU
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerIcon}>🧠</Text>

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>
              QUIZ
            </Text>

            <Text style={styles.headerLevel}>
              Niveau : {niveau || "CM2"}
            </Text>
          </View>
        </View>

        <View style={styles.progressBox}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Question {questionActuelle + 1} / {QUIZ.length}
            </Text>

            <Text style={styles.scoreText}>
              Score : {score}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progress,
                {
                  width: `${
                    ((questionActuelle + 1) /
                      QUIZ.length) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.questionBox}>
          <Text style={styles.question}>
            {question.question}
          </Text>
        </View>

        <Text style={styles.answerTitle}>
          Choisis la bonne réponse :
        </Text>

        {question.options.map((option, index) => {
          const estBonne =
            index === question.reponse;

          const estChoisie =
            index === reponseSelectionnee;

          let optionStyle = styles.option;
          let optionTextStyle = styles.optionText;

          if (correctionVisible && estBonne) {
            optionStyle = [
              styles.option,
              styles.correctOption,
            ];

            optionTextStyle = [
              styles.optionText,
              styles.correctText,
            ];
          } else if (
            correctionVisible &&
            estChoisie &&
            !estBonne
          ) {
            optionStyle = [
              styles.option,
              styles.wrongOption,
            ];

            optionTextStyle = [
              styles.optionText,
              styles.wrongText,
            ];
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => choisirReponse(index)}
              activeOpacity={0.8}
              disabled={correctionVisible}
            >
              <View style={styles.optionNumber}>
                <Text style={styles.optionNumberText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>

              <Text style={optionTextStyle}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}

        {correctionVisible && (
          <View style={styles.correctionBox}>
            <Text style={styles.correctionTitle}>
              {reponseSelectionnee === question.reponse
                ? "✅ Bonne réponse !"
                : "❌ Mauvaise réponse"}
            </Text>

            <Text style={styles.correctionText}>
              {question.correction ||
                "La réponse correcte est celle indiquée en vert."}
            </Text>
          </View>
        )}

        {correctionVisible && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={questionSuivante}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {questionActuelle < QUIZ.length - 1
                ? "QUESTION SUIVANTE →"
                : "VOIR MON RÉSULTAT →"}
            </Text>
          </TouchableOpacity>
        )}

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

  progressBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  progressText: {
    color: "#123C69",
    fontSize: 13,
    fontWeight: "bold",
  },

  scoreText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "bold",
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#E2E8F0",
    borderRadius: 5,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#123C69",
    borderRadius: 5,
  },

  questionBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    elevation: 2,
  },

  question: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 27,
  },

  answerTitle: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  optionNumber: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#EAF2FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  optionNumberText: {
    color: "#123C69",
    fontWeight: "bold",
  },

  optionText: {
    flex: 1,
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
  },

  correctOption: {
    borderColor: "#178A45",
    backgroundColor: "#EAF8EF",
  },

  correctText: {
    color: "#146C38",
    fontWeight: "bold",
  },

  wrongOption: {
    borderColor: "#B42318",
    backgroundColor: "#FDECEC",
  },

  wrongText: {
    color: "#B42318",
    fontWeight: "bold",
  },

  correctionBox: {
    backgroundColor: "#FFF8E7",
    borderRadius: 15,
    padding: 17,
    marginTop: 5,
    marginBottom: 15,
  },

  correctionTitle: {
    color: "#8A5A00",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7,
  },

  correctionText: {
    color: "#6B5500",
    fontSize: 14,
    lineHeight: 21,
  },

  nextButton: {
    backgroundColor: "#123C69",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  resultContainer: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },

  resultIcon: {
    fontSize: 65,
    marginBottom: 15,
  },

  resultTitle: {
    color: "#123C69",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },

  resultScore: {
    color: "#123C69",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 15,
  },

  resultPercentage: {
    color: "#64748B",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 3,
  },

  resultBox: {
    width: "100%",
    backgroundColor: "#EAF2FA",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    marginBottom: 15,
  },

  resultBoxTitle: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 7,
    textAlign: "center",
  },

  resultBoxText: {
    color: "#526579",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#123C69",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  secondaryButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#123C69",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },

  secondaryButtonText: {
    color: "#123C69",
    fontSize: 14,
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});