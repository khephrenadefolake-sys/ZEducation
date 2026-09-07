import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

/* =========================================================
   Z.ÉDUCATION - CM2
   GRAMMAIRE FRANÇAISE
   ========================================================= */

/* =========================
   PROGRAMME DE GRAMMAIRE
   ========================= */

const GRAMMAIRE_CM2 = [
  {
    chapitre: "CHAPITRE 1 — LA PHRASE",
    lecons: [
      "Les types de phrases",
      "Les formes de phrases",
      "La phrase simple",
      "La phrase complexe",
      "Les constituants de la phrase",
      "Le groupe nominal",
      "Le groupe verbal",
    ],
  },
  {
    chapitre: "CHAPITRE 2 — LE GROUPE NOMINAL",
    lecons: [
      "Le nom",
      "Les différents types de déterminants",
      "Les pronoms",
      "L'adjectif qualificatif",
      "Les fonctions de l'adjectif qualificatif",
      "Le complément du nom",
      "L'expansion du nom",
    ],
  },
];

/* =========================
   LEÇON 1
   ========================= */

const LEÇON_1 = {
  titre: "Les types de phrases",

  objectif:
    "À la fin de cette leçon, l'élève doit être capable de reconnaître les différents types de phrases et d'utiliser correctement leur ponctuation.",

  explication:
    "Une phrase est un ensemble de mots organisé autour d'un sens. En français, on distingue quatre principaux types de phrases : la phrase déclarative, la phrase interrogative, la phrase impérative ou injonctive et la phrase exclamative.",

  regle:
    "Le type de phrase dépend de l'intention de celui qui parle ou qui écrit : déclarer une information, poser une question, donner un ordre ou exprimer une émotion.",

  types: [
    {
      nom: "La phrase déclarative",

      explication:
        "Elle sert à donner une information, raconter un fait ou exprimer une idée.",

      ponctuation:
        "Elle se termine généralement par un point (.).",

      exemples: [
        "Koffi va à l'école.",
        "Les élèves travaillent sérieusement.",
      ],
    },

    {
      nom: "La phrase interrogative",

      explication: "Elle sert à poser une question.",

      ponctuation:
        "Elle se termine par un point d'interrogation (?).",

      exemples: [
        "Où vas-tu ?",
        "As-tu terminé ton exercice ?",
      ],
    },

    {
      nom: "La phrase impérative ou injonctive",

      explication:
        "Elle sert à donner un ordre, un conseil, une consigne ou une interdiction.",

      ponctuation:
        "Elle peut se terminer par un point ou un point d'exclamation.",

      exemples: [
        "Ferme ton cahier.",
        "Écoute attentivement.",
      ],
    },

    {
      nom: "La phrase exclamative",

      explication:
        "Elle sert à exprimer une émotion forte : joie, surprise, colère, admiration, peur, etc.",

      ponctuation:
        "Elle se termine généralement par un point d'exclamation (!).",

      exemples: [
        "Quelle belle journée !",
        "C'est extraordinaire !",
      ],
    },
  ],

  retenir: [
    "Déclarative → donne une information.",
    "Interrogative → pose une question.",
    "Impérative / injonctive → donne un ordre, un conseil ou une interdiction.",
    "Exclamative → exprime une émotion.",
    "La ponctuation aide à reconnaître le type de phrase.",
  ],
};

/* =========================
   EXERCICES
   ========================= */

const EXERCICES_1 = [
  {
    question:
      "Quel est le type de cette phrase ? « Les élèves entrent dans la classe. »",

    options: [
      "Phrase déclarative",
      "Phrase interrogative",
      "Phrase impérative",
      "Phrase exclamative",
    ],

    reponseCorrecte: "Phrase déclarative",

    explication:
      "Cette phrase donne une information et se termine par un point.",
  },

  {
    question:
      "Identifie le type de cette phrase : « Prenez vos cahiers de brouillon ! »",

    options: [
      "Phrase déclarative",
      "Phrase interrogative",
      "Phrase impérative",
      "Phrase exclamative",
    ],

    reponseCorrecte: "Phrase impérative",

    explication:
      "Cette phrase donne un ordre. Elle est donc impérative.",
  },
];

/* =========================================================
   APPLICATION
   ========================================================= */

export default function App() {
  const [ecran, setEcran] = useState("MENU");

  const [indexQuestion, setIndexQuestion] = useState(0);

  const [score, setScore] = useState(0);

  const [reponseSelectionnee, setReponseSelectionnee] =
    useState(null);

  const [exerciceTermine, setExerciceTermine] =
    useState(false);

  /* =========================
     OUVRIR UNE LEÇON
     ========================= */

  const selectionnerLecon = (lecon) => {
    if (lecon === "Les types de phrases") {
      setEcran("COURS");
      return;
    }

    Alert.alert(
      "Bientôt disponible",
      `La leçon "${lecon}" est en cours de rédaction.`
    );
  };

  /* =========================
     LANCER / RELANCER EXERCICES
     ========================= */

  const relancerExercices = () => {
    setIndexQuestion(0);
    setScore(0);
    setReponseSelectionnee(null);
    setExerciceTermine(false);
    setEcran("EXERCICES");
  };

  /* =========================
     SELECTIONNER UNE REPONSE
     ========================= */

  const validerReponse = (option) => {
    if (reponseSelectionnee !== null) {
      return;
    }

    setReponseSelectionnee(option);

    const bonneReponse =
      EXERCICES_1[indexQuestion].reponseCorrecte;

    if (option === bonneReponse) {
      setScore((ancienScore) => ancienScore + 1);
    }
  };

  /* =========================
     QUESTION SUIVANTE
     ========================= */

  const questionSuivante = () => {
    if (indexQuestion + 1 < EXERCICES_1.length) {
      setIndexQuestion((ancienIndex) => ancienIndex + 1);
      setReponseSelectionnee(null);
    } else {
      setExerciceTermine(true);
    }
  };

  /* =========================
     RETOUR MENU
     ========================= */

  const retourMenu = () => {
    setEcran("MENU");
    setIndexQuestion(0);
    setScore(0);
    setReponseSelectionnee(null);
    setExerciceTermine(false);
  };

  /* =========================
     QUESTION ACTUELLE
     ========================= */

  const questionActuelle =
    EXERCICES_1[indexQuestion];

  /* =========================================================
     AFFICHAGE
     ========================================================= */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2C3E50"
      />

      {/* =========================
          EN-TÊTE
          ========================= */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Z.ÉDUCATION — CM2 GRAMMAIRE
        </Text>
      </View>

      {/* =====================================================
          MENU PRINCIPAL
          ===================================================== */}

      {ecran === "MENU" && (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcomeText}>
            Bienvenue dans ton espace d'apprentissage !
          </Text>

          <Text style={styles.introductionText}>
            Découvre les leçons de grammaire du CM2,
            comprends les règles et entraîne-toi avec
            des exercices.
          </Text>

          {GRAMMAIRE_CM2.map((item, indexChapitre) => (
            <View
              key={indexChapitre}
              style={styles.cardChapitre}
            >
              <Text style={styles.titreChapitre}>
                {item.chapitre}
              </Text>

              {item.lecons.map((lecon, indexLecon) => (
                <TouchableOpacity
                  key={indexLecon}
                  style={styles.boutonLecon}
                  onPress={() =>
                    selectionnerLecon(lecon)
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.texteLecon}>
                    {lecon}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      )}

      {/* =====================================================
          COURS
          ===================================================== */}

      {ecran === "COURS" && (
        <View style={styles.flexContainer}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titreCours}>
              {LEÇON_1.titre}
            </Text>

            <View style={styles.sectionCours}>
              <Text style={styles.soustitreSection}>
                Objectif de la leçon
              </Text>

              <Text style={styles.corpsTexte}>
                {LEÇON_1.objectif}
              </Text>

              <Text style={styles.soustitreSection}>
                Explication
              </Text>

              <Text style={styles.corpsTexte}>
                {LEÇON_1.explication}
              </Text>

              <Text style={styles.soustitreSection}>
                Règle d'or
              </Text>

              <Text style={styles.corpsTexte}>
                {LEÇON_1.regle}
              </Text>
            </View>

            {LEÇON_1.types.map((typePhrase, indexType) => (
              <View
                key={indexType}
                style={styles.cardTypePhrase}
              >
                <Text style={styles.nomTypePhrase}>
                  {typePhrase.nom}
                </Text>

                <Text style={styles.corpsTexte}>
                  {typePhrase.explication}
                </Text>

                <Text style={styles.ponctuationTexte}>
                  Ponctuation :{" "}
                  {typePhrase.ponctuation}
                </Text>

                <Text style={styles.exempleTitre}>
                  Exemples :
                </Text>

                {typePhrase.exemples.map(
                  (exemple, indexExemple) => (
                    <Text
                      key={indexExemple}
                      style={styles.exempleTexte}
                    >
                      "{exemple}"
                    </Text>
                  )
                )}
              </View>
            ))}

            <View style={styles.sectionCours}>
              <Text style={styles.soustitreSection}>
                À retenir absolument
              </Text>

              {LEÇON_1.retenir.map(
                (element, indexElement) => (
                  <Text
                    key={indexElement}
                    style={styles.corpsTexte}
                  >
                    {element}
                  </Text>
                )
              )}
            </View>
          </ScrollView>

          <View style={styles.barreNavigation}>
            <TouchableOpacity
              style={styles.boutonRetour}
              onPress={retourMenu}
              activeOpacity={0.7}
            >
              <Text style={styles.texteBoutonRetour}>
                Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.boutonAction}
              onPress={relancerExercices}
              activeOpacity={0.7}
            >
              <Text style={styles.texteBoutonAction}>
                S'exercer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =====================================================
          EXERCICES
          ===================================================== */}

      {ecran === "EXERCICES" && (
        <View style={styles.flexContainer}>
          {!exerciceTermine ? (
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.progressionText}>
                Question {indexQuestion + 1} sur{" "}
                {EXERCICES_1.length}
              </Text>

              <View style={styles.cardQuestion}>
                <Text style={styles.texteQuestion}>
                  {questionActuelle.question}
                </Text>
              </View>

              {questionActuelle.options.map(
                (option, indexOption) => {
                  const estSelectionnee =
                    reponseSelectionnee === option;

                  const estCorrecte =
                    option ===
                    questionActuelle.reponseCorrecte;

                  let styleOption =
                    styles.boutonOption;

                  if (reponseSelectionnee !== null) {
                    if (estCorrecte) {
                      styleOption = [
                        styles.boutonOption,
                        styles.optionCorrecte,
                      ];
                    } else if (estSelectionnee) {
                      styleOption = [
                        styles.boutonOption,
                        styles.optionFausse,
                      ];
                    }
                  }

                  return (
                    <TouchableOpacity
                      key={indexOption}
                      disabled={
                        reponseSelectionnee !== null
                      }
                      style={styleOption}
                      onPress={() =>
                        validerReponse(option)
                      }
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.texteOption,
                          reponseSelectionnee !== null &&
                            (estCorrecte ||
                              estSelectionnee) &&
                            styles.texteOptionResultat,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}

              {reponseSelectionnee !== null && (
                <View style={styles.cardExplication}>
                  <Text style={styles.titreExplication}>
                    {reponseSelectionnee ===
                    questionActuelle.reponseCorrecte
                      ? "Bonne réponse !"
                      : "Mauvaise réponse"}
                  </Text>

                  <Text style={styles.corpsExplication}>
                    {questionActuelle.explication}
                  </Text>

                  <Text style={styles.reponseCorrecteText}>
                    Réponse correcte :{" "}
                    {questionActuelle.reponseCorrecte}
                  </Text>

                  <TouchableOpacity
                    style={styles.boutonSuivant}
                    onPress={questionSuivante}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.texteBoutonSuivant}>
                      {indexQuestion + 1 <
                      EXERCICES_1.length
                        ? "Question suivante"
                        : "Voir mon résultat"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          ) : (
            /* =========================
               RESULTAT
               ========================= */

            <View style={styles.containerResultat}>
              <Text style={styles.emojiResultat}>
                Bravo !
              </Text>

              <Text style={styles.titreResultat}>
                Exercice terminé !
              </Text>

              <Text style={styles.scoreText}>
                {score} / {EXERCICES_1.length}
              </Text>

              <Text style={styles.messageResultat}>
                {score === EXERCICES_1.length
                  ? "Excellent ! Tu maîtrises très bien les types de phrases."
                  : score > 0
                  ? "Bon travail ! Continue à réviser pour progresser."
                  : "Courage ! Relis la leçon et recommence."}
              </Text>

              <TouchableOpacity
                style={styles.boutonActionResultat}
                onPress={relancerExercices}
                activeOpacity={0.7}
              >
                <Text style={styles.texteBoutonAction}>
                  Recommencer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.boutonRetourResultat}
                onPress={retourMenu}
                activeOpacity={0.7}
              >
                <Text style={styles.texteBoutonRetour}>
                  Retour au menu
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F7",
  },

  flexContainer: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },

  /* =========================
     HEADER
     ========================= */

  header: {
    backgroundColor: "#2C3E50",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },

  /* =========================
     MENU
     ========================= */

  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
    lineHeight: 27,
  },

  introductionText: {
    fontSize: 14,
    color: "#566573",
    lineHeight: 21,
    marginBottom: 20,
  },

  cardChapitre: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7E9",
  },

  titreChapitre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
  },

  boutonLecon: {
    backgroundColor: "#F8F9F9",
    borderWidth: 1,
    borderColor: "#D5D8DC",
    borderRadius: 8,
    padding: 13,
    marginBottom: 8,
  },

  texteLecon: {
    fontSize: 15,
    color: "#34495E",
    lineHeight: 21,
  },

  /* =========================
     COURS
     ========================= */

  titreCours: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 18,
  },

  sectionCours: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7E9",
  },

  soustitreSection: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2980B9",
    marginTop: 8,
    marginBottom: 8,
  },

  corpsTexte: {
    fontSize: 15,
    color: "#424949",
    lineHeight: 23,
    marginBottom: 12,
  },

  cardTypePhrase: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderLeftColor: "#2980B9",
    borderWidth: 1,
    borderColor: "#E5E7E9",
  },

  nomTypePhrase: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
  },

  ponctuationTexte: {
    fontSize: 14,
    color: "#8E44AD",
    fontWeight: "600",
    marginBottom: 12,
    lineHeight: 20,
  },

  exempleTitre: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 6,
  },

  exempleTexte: {
    fontSize: 15,
    color: "#34495E",
    marginBottom: 6,
    lineHeight: 21,
  },

  /* =========================
     NAVIGATION
     ========================= */

  barreNavigation: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#D5D8DC",
  },

  boutonRetour: {
    flex: 1,
    backgroundColor: "#ECF0F1",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 5,
  },

  texteBoutonRetour: {
    color: "#2C3E50",
    fontSize: 14,
    fontWeight: "bold",
  },

  boutonAction: {
    flex: 1,
    backgroundColor: "#2980B9",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 5,
  },

  texteBoutonAction: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  /* =========================
     EXERCICES
     ========================= */

  progressionText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2980B9",
    marginBottom: 12,
    textAlign: "center",
  },

  cardQuestion: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7E9",
  },

  texteQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    lineHeight: 26,
  },

  boutonOption: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7",
  },

  texteOption: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },

  texteOptionResultat: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  optionCorrecte: {
    backgroundColor: "#2ECC71",
    borderColor: "#27AE60",
  },

  optionFausse: {
    backgroundColor: "#E74C3C",
    borderColor: "#C0392B",
  },

  cardExplication: {
    backgroundColor: "#EAEDED",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 20,
  },

  titreExplication: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },

  corpsExplication: {
    fontSize: 14,
    color: "#34495E",
    lineHeight: 21,
    marginBottom: 10,
  },

  reponseCorrecteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#27AE60",
    lineHeight: 20,
  },

  boutonSuivant: {
    backgroundColor: "#2980B9",
    padding: 13,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },

  texteBoutonSuivant: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  /* =========================
     RESULTAT
     ========================= */

  containerResultat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  emojiResultat: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 15,
  },

  titreResultat: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
    textAlign: "center",
  },

  scoreText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#27AE60",
    marginBottom: 15,
  },

  messageResultat: {
    fontSize: 16,
    color: "#566573",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 25,
  },

  boutonActionResultat: {
    width: "100%",
    backgroundColor: "#2980B9",
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: "center",
    marginBottom: 10,
  },

  boutonRetourResultat: {
    width: "100%",
    backgroundColor: "#ECF0F1",
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: "center",
  },
});