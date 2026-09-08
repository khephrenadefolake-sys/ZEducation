import React, { useState } from "react";
import {
  RUBRIQUES_FRANCAIS_CP1,
  RUBRIQUES_MATHS_CP1,
  getCP1Lesson,
} from "./src/data/CP1";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import Header from "./src/components/Header";

import { NIVEAUX } from "./src/data/niveaux";

import {
  MATIERES_CP,
  MATIERES_CE_CM,
  RUBRIQUES_CP,
  RUBRIQUES_CE_CM,
} from "./src/data/matieres";

import {
  CHAPITRES_CM2,
  PROGRAMMES_GRAMMAIRE,
} from "./src/data/programmeCM2";

import { QUIZ } from "./src/data/quiz";
import { obtenirContenu } from "./src/data/lecons";
import {
  RUBRIQUES_FRANCAIS_CP1,
  RUBRIQUES_MATHS_CP1,
  getCP1Lesson,
} from "./src/data/CP1";
export default function App() {
  // =========================================================
  // ÉTATS
  // =========================================================

  const [ecran, setEcran] = useState("WELCOME");

  const [eleve, setEleve] = useState(null);

  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [niveau, setNiveau] = useState("");

  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] =
    useState("");

  const [emailConnexion, setEmailConnexion] = useState("");
  const [motDePasseConnexion, setMotDePasseConnexion] =
    useState("");

  const [niveauOuvert, setNiveauOuvert] = useState(false);

  const [niveauSelectionne, setNiveauSelectionne] = useState(null);

  const [matiereSelectionnee, setMatiereSelectionnee] =
    useState(null);

  const [rubriqueSelectionnee, setRubriqueSelectionnee] =
    useState(null);

  const [chapitreSelectionne, setChapitreSelectionne] =
    useState(null);

  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizTermine, setQuizTermine] = useState(false);

  // =========================================================
  // NORMALISATION DU NIVEAU
  // =========================================================

  const niveauNormalise = String(
    eleve?.niveau || niveauSelectionne || niveau || ""
  )
    .toUpperCase()
    .replace(/\s+/g, "");

  const estCP =
    niveauNormalise === "CP1" ||
    niveauNormalise === "CP2" ||
    niveauNormalise.startsWith("CP");

  // =========================================================
  // MATIÈRES
  // =========================================================

  const matieres = estCP ? MATIERES_CP : MATIERES_CE_CM;

  // =========================================================
  // RUBRIQUES FRANÇAIS
  // =========================================================

  const rubriquesFrançais = estCP
    ? RUBRIQUES_CP
    : RUBRIQUES_CE_CM;

  // =========================================================
  // INSCRIPTION
  // =========================================================

  const inscrireEleve = () => {
    const nomPropre = nom.trim();
    const prenomsPropres = prenoms.trim();
    const emailPropre = email.trim().toLowerCase();
    const confirmationEmailPropre =
      confirmationEmail.trim().toLowerCase();

    if (!nomPropre || !prenomsPropres || !niveau) {
      Alert.alert(
        "Champs incomplets",
        "Veuillez renseigner le nom, les prénoms et le niveau."
      );
      return;
    }

    if (!emailPropre || !confirmationEmailPropre) {
      Alert.alert(
        "Email manquant",
        "Veuillez renseigner et confirmer votre adresse email."
      );
      return;
    }

    if (!emailPropre.includes("@")) {
      Alert.alert(
        "Email incorrect",
        "Veuillez saisir une adresse email valide."
      );
      return;
    }

    if (emailPropre !== confirmationEmailPropre) {
      Alert.alert(
        "Erreur",
        "Les deux adresses email ne correspondent pas."
      );
      return;
    }

    if (!motDePasse) {
      Alert.alert(
        "Mot de passe",
        "Veuillez saisir un mot de passe."
      );
      return;
    }

    if (motDePasse.length < 6) {
      Alert.alert(
        "Mot de passe",
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    if (motDePasse !== confirmationMotDePasse) {
      Alert.alert(
        "Erreur",
        "Les deux mots de passe ne correspondent pas."
      );
      return;
    }

    const nouvelEleve = {
      nom: nomPropre,
      prenoms: prenomsPropres,
      niveau,
      email: emailPropre,
      motDePasse,
    };

    setEleve(nouvelEleve);
    setNiveauSelectionne(niveau);

    setEmailConnexion(emailPropre);
    setMotDePasseConnexion("");

    setNiveauOuvert(false);

    Alert.alert(
      "Compte créé",
      "Votre compte a été créé avec succès.",
      [
        {
          text: "Continuer",
          onPress: () => {
            setMatiereSelectionnee(null);
            setRubriqueSelectionnee(null);
            setChapitreSelectionne(null);
            setEcran("ACCUEIL");
          },
        },
      ]
    );
  };

  // =========================================================
  // CONNEXION
  // =========================================================

  const connecter = () => {
    const emailSaisi = emailConnexion.trim().toLowerCase();

    if (!emailSaisi || !motDePasseConnexion) {
      Alert.alert(
        "Connexion",
        "Veuillez renseigner votre email et votre mot de passe."
      );
      return;
    }

    if (!eleve) {
      Alert.alert(
        "Aucun compte",
        "Veuillez créer un compte avant de vous connecter."
      );
      return;
    }

    if (emailSaisi !== eleve.email) {
      Alert.alert(
        "Erreur",
        "Cette adresse email ne correspond pas au compte créé."
      );
      return;
    }

    if (motDePasseConnexion !== eleve.motDePasse) {
      Alert.alert(
        "Erreur",
        "Mot de passe incorrect."
      );
      return;
    }

    setNiveauSelectionne(eleve.niveau);

    setMatiereSelectionnee(null);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);

    setEcran("ACCUEIL");
  };

  // =========================================================
  // RETOUR
  // =========================================================

  const retourAccueil = () => {
    setMatiereSelectionnee(null);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);
    setEcran("ACCUEIL");
  };

  const retourMatieres = () => {
    setMatiereSelectionnee(null);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);
    setEcran("MATIERES");
  };

  const retourRubriques = () => {
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);
    setEcran("FRANCAIS");
  };

  // =========================================================
  // OUVRIR UNE MATIÈRE
  // =========================================================

  const ouvrirMatiere = (matiere) => {
    setMatiereSelectionnee(matiere);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);

    if (matiere.id === "francais") {
      setEcran("FRANCAIS");
    } else if (matiere.id === "mathematiques") {
      setEcran("MATHEMATIQUES");
    } else {
      setEcran("MATIERE_DETAILS");
    }
  };

  // =========================================================
  // OUVRIR UNE RUBRIQUE
  // =========================================================

  const ouvrirRubrique = (rubrique) => {
    setRubriqueSelectionnee(rubrique);
    setEcran("RUBRIQUE");
  };

  // =========================================================
  // CONTENU D'UNE LEÇON
  // =========================================================

  const ouvrirLecon = (chapitre) => {
    setChapitreSelectionne(chapitre);
    setEcran("LECON");
  };

  // =========================================================
  // PROGRAMME GRAMMAIRE
  // =========================================================

  const programmeGrammaire =
    PROGRAMMES_GRAMMAIRE?.[niveauNormalise] ||
    PROGRAMMES_GRAMMAIRE?.[eleve?.niveau] ||
    [];

  // =========================================================
  // QUIZ
  // =========================================================

  const banqueQuiz =
    QUIZ?.[niveauNormalise] ||
    QUIZ?.[eleve?.niveau] ||
    (Array.isArray(QUIZ) ? QUIZ : []);

  const questionQuiz = Array.isArray(banqueQuiz)
    ? banqueQuiz[quizIndex]
    : null;

  const reinitialiserQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setQuizTermine(false);
    setEcran("QUIZ");
  };

  const repondreQuiz = (bonneReponse) => {
    if (bonneReponse) {
      setScore((ancienScore) => ancienScore + 1);
    }

    if (
      !Array.isArray(banqueQuiz) ||
      banqueQuiz.length === 0 ||
      quizIndex >= banqueQuiz.length - 1
    ) {
      setQuizTermine(true);
    } else {
      setQuizIndex((ancienIndex) => ancienIndex + 1);
    }
  };

  // =========================================================
  // PROTECTION DES ÉCRANS
  // =========================================================
  // IMPORTANT :
  // INSCRIPTION et LOGIN doivent rester accessibles
  // même lorsqu'aucun élève n'est encore connecté.
  // =========================================================

  const ecransPublics = [
    "WELCOME",
    "INSCRIPTION",
    "LOGIN",
  ];

  if (!ecransPublics.includes(ecran) && !eleve) {
    return (
      <WelcomeScreen
        go={setEcran}
        onLogin={() => setEcran("LOGIN")}
        onRegister={() => setEcran("INSCRIPTION")}
      />
    );
  }

  // =========================================================
  // ÉCRAN WELCOME
  // =========================================================

  if (ecran === "WELCOME") {
    return (
      <WelcomeScreen
        go={setEcran}
        onLogin={() => setEcran("LOGIN")}
        onRegister={() => setEcran("INSCRIPTION")}
      />
    );
  }

  // =========================================================
  // INSCRIPTION
  // =========================================================

  if (ecran === "INSCRIPTION") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          contentContainerStyle={styles.authContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.logo}>
            Z.ÉDUCATION
          </Text>

          <Text style={styles.authTitle}>
            Créer un compte
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#999"
            value={nom}
            onChangeText={setNom}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Prénoms"
            placeholderTextColor="#999"
            value={prenoms}
            onChangeText={setPrenoms}
            autoCapitalize="words"
          />

          <Text style={styles.label}>
            Choisissez votre niveau
          </Text>

          <TouchableOpacity
            style={styles.selectInput}
            onPress={() =>
              setNiveauOuvert((ancien) => !ancien)
            }
          >
            <Text
              style={
                niveau
                  ? styles.selectText
                  : styles.placeholderText
              }
            >
              {niveau || "Sélectionner le niveau"}
            </Text>

            <Text style={styles.arrowText}>
              {niveauOuvert ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {niveauOuvert && (
            <View style={styles.dropdown}>
              {(NIVEAUX || []).map((item, index) => {
                const valeur =
                  typeof item === "string"
                    ? item
                    : item?.id || item?.nom;

                const libelle =
                  typeof item === "string"
                    ? item
                    : item?.nom || item?.id;

                if (!valeur) {
                  return null;
                }

                return (
                  <TouchableOpacity
                    key={`${valeur}-${index}`}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setNiveau(valeur);
                      setNiveauOuvert(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>
                      {libelle}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmer l'adresse email"
            placeholderTextColor="#999"
            value={confirmationEmail}
            onChangeText={setConfirmationEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#999"
            value={motDePasse}
            onChangeText={setMotDePasse}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#999"
            value={confirmationMotDePasse}
            onChangeText={setConfirmationMotDePasse}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={inscrireEleve}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              CRÉER MON COMPTE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setEcran("LOGIN")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>
              J'ai déjà un compte
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setEcran("WELCOME")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>
              Retour
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // CONNEXION
  // =========================================================

  if (ecran === "LOGIN") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.authContainer}>
          <Text style={styles.logo}>
            Z.ÉDUCATION
          </Text>

          <Text style={styles.authTitle}>
            Connexion
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={emailConnexion}
            onChangeText={setEmailConnexion}
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#999"
            secureTextEntry
            value={motDePasseConnexion}
            onChangeText={setMotDePasseConnexion}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={connecter}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              SE CONNECTER
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setEcran("INSCRIPTION")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>
              Créer un compte
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setEcran("WELCOME")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>
              Retour
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // =========================================================
  // ACCUEIL
  // =========================================================

  if (ecran === "ACCUEIL") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title="Z.ÉDUCATION"
          onBack={null}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>
              Bonjour{" "}
              {eleve?.prenoms
                ? `${eleve.prenoms}`
                : eleve?.nom || "Élève"}{" "}
              👋
            </Text>

            <Text style={styles.welcomeSubtitle}>
              Niveau :{" "}
              {eleve?.niveau || niveauNormalise}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => setEcran("MATIERES")}
          >
            <Text style={styles.menuIcon}>
              📚
            </Text>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>
                Matières
              </Text>

              <Text style={styles.menuDescription}>
                Accéder aux matières de votre niveau
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={reinitialiserQuiz}
          >
            <Text style={styles.menuIcon}>
              🧠
            </Text>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>
                Quiz
              </Text>

              <Text style={styles.menuDescription}>
                Testez vos connaissances
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() =>
              Alert.alert(
                "Exercices",
                "Les exercices sont disponibles dans les différentes matières."
              )
            }
          >
            <Text style={styles.menuIcon}>
              ✏️
            </Text>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>
                Exercices
              </Text>

              <Text style={styles.menuDescription}>
                Entraînez-vous
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // MATIÈRES
  // =========================================================

  if (ecran === "MATIERES") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title="Matières"
          onBack={retourAccueil}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>
            {eleve?.niveau || niveauNormalise}
          </Text>

          <Text style={styles.pageSubtitle}>
            Choisissez une matière
          </Text>

          {Array.isArray(matieres) &&
            matieres.map((matiere, index) => (
              <TouchableOpacity
                key={matiere?.id || index}
                style={styles.subjectCard}
                onPress={() => ouvrirMatiere(matiere)}
              >
                <Text style={styles.subjectIcon}>
                  {matiere?.icon || "📚"}
                </Text>

                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectTitle}>
                    {matiere?.nom || "Matière"}
                  </Text>

                  <Text style={styles.subjectDescription}>
                    {matiere?.description || ""}
                  </Text>
                </View>

                <Text style={styles.arrow}>
                  ›
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // FRANÇAIS
  // =========================================================

  if (ecran === "FRANCAIS") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title="Français"
          onBack={retourMatieres}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>
            Français
          </Text>

          <Text style={styles.pageSubtitle}>
            Choisissez une rubrique
          </Text>

          {Array.isArray(rubriquesFrançais) &&
            rubriquesFrançais.map(
              (rubrique, index) => (
                <TouchableOpacity
                  key={rubrique?.id || index}
                  style={styles.subjectCard}
                  onPress={() =>
                    ouvrirRubrique(rubrique)
                  }
                >
                  <Text style={styles.subjectIcon}>
                    {rubrique?.icon || "📖"}
                  </Text>

                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectTitle}>
                      {rubrique?.nom || "Rubrique"}
                    </Text>
                  </View>

                  <Text style={styles.arrow}>
                    ›
                  </Text>
                </TouchableOpacity>
              )
            )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // MATHÉMATIQUES
  // =========================================================

  if (ecran === "MATHEMATIQUES") {
    const rubriquesMaths = [
      {
        id: "nombres",
        nom: "Nombres",
        icon: "🔢",
      },
      {
        id: "calcul",
        nom: "Calcul",
        icon: "➕",
      },
      {
        id: "problemes",
        nom: "Problèmes",
        icon: "🧩",
      },
      {
        id: "geometrie",
        nom: "Géométrie",
        icon: "📐",
      },
      {
        id: "mesures",
        nom: "Mesures",
        icon: "📏",
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title="Mathématiques"
          onBack={retourMatieres}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>
            Mathématiques
          </Text>

          <Text style={styles.pageSubtitle}>
            Choisissez une rubrique
          </Text>

          {rubriquesMaths.map(
            (rubrique) => (
              <TouchableOpacity
                key={rubrique.id}
                style={styles.subjectCard}
                onPress={() => {
                  setRubriqueSelectionnee(rubrique);
                  setEcran("RUBRIQUE");
                }}
              >
                <Text style={styles.subjectIcon}>
                  {rubrique.icon}
                </Text>

                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectTitle}>
                    {rubrique.nom}
                  </Text>
                </View>

                <Text style={styles.arrow}>
                  ›
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // AUTRES MATIÈRES CE1 → CM2
  // =========================================================

  if (ecran === "MATIERE_DETAILS") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title={
            matiereSelectionnee?.nom ||
            "Matière"
          }
          onBack={retourMatieres}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>
            {matiereSelectionnee?.nom ||
              "Matière"}
          </Text>

          <Text style={styles.pageSubtitle}>
            Contenu du programme
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Le contenu de cette matière sera
              organisé selon le programme
              correspondant au niveau de l'élève.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // RUBRIQUE
  // =========================================================

  if (ecran === "RUBRIQUE") {
    const rubrique = rubriqueSelectionnee;

    let contenus = [];

    if (
      rubrique?.id === "grammaire" &&
      Array.isArray(programmeGrammaire)
    ) {
      contenus = programmeGrammaire;
    }

    if (
      rubrique?.id === "lecture" ||
      rubrique?.id === "ecriture" ||
      rubrique?.id === "vocabulaire" ||
      rubrique?.id === "expression" ||
      rubrique?.id === "expression_orale"
    ) {
      try {
        const resultat = obtenirContenu?.(
          niveauNormalise,
          "francais",
          rubrique.id
        );

        if (Array.isArray(resultat)) {
          contenus = resultat;
        }
      } catch (error) {
        contenus = [];
      }
    }

    if (!contenus.length) {
      contenus = [
        {
          id: "1",
          titre: `Programme de ${
            rubrique?.nom || ""
          }`,
          description:
            `Découvrez les leçons et exercices de la rubrique ${
              rubrique?.nom || ""
            }.`,
        },
      ];
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title={
            rubrique?.nom ||
            "Rubrique"
          }
          onBack={
            matiereSelectionnee?.id ===
            "mathematiques"
              ? () =>
                  setEcran("MATHEMATIQUES")
              : retourRubriques
          }
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>
            {rubrique?.nom}
          </Text>

          {contenus.map(
            (contenu, index) => {
              const titre =
                contenu?.titre ||
                contenu?.nom ||
                `Leçon ${index + 1}`;

              return (
                <TouchableOpacity
                  key={
                    contenu?.id ||
                    index
                  }
                  style={styles.lessonCard}
                  onPress={() =>
                    ouvrirLecon(contenu)
                  }
                >
                  <View
                    style={
                      styles.lessonNumber
                    }
                  >
                    <Text
                      style={
                        styles.lessonNumberText
                      }
                    >
                      {index + 1}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.lessonInfo
                    }
                  >
                    <Text
                      style={
                        styles.lessonTitle
                      }
                    >
                      {titre}
                    </Text>

                    {contenu?.description ? (
                      <Text
                        style={
                          styles.lessonDescription
                        }
                      >
                        {
                          contenu.description
                        }
                      </Text>
                    ) : null}
                  </View>

                  <Text
                    style={styles.arrow}
                  >
                    ›
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // LEÇON
  // =========================================================

  if (ecran === "LECON") {
    const chapitre =
      chapitreSelectionne || {};

    const titre =
      chapitre.titre ||
      chapitre.nom ||
      "Leçon";

    const contenu =
      chapitre.contenu ||
      chapitre.description ||
      "Contenu de la leçon.";

    const exemples = Array.isArray(
      chapitre.exemples
    )
      ? chapitre.exemples
      : [];

    const corriger = Array.isArray(
      chapitre.corriges
    )
      ? chapitre.corriges
      : [];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title="Leçon"
          onBack={() =>
            setEcran("RUBRIQUE")
          }
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Text
            style={
              styles.lessonMainTitle
            }
          >
            {titre}
          </Text>

          <View style={styles.infoCard}>
            <Text
              style={
                styles.lessonContent
              }
            >
              {typeof contenu ===
              "string"
                ? contenu
                : JSON.stringify(
                    contenu
                  )}
            </Text>
          </View>

          {exemples.length > 0 && (
            <View
              style={
                styles.sectionCard
              }
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                Exemples
              </Text>

              {exemples.map(
                (exemple, index) => (
                  <Text
                    key={index}
                    style={
                      styles.bulletText
                    }
                  >
                    •{" "}
                    {String(
                      exemple
                    )}
                  </Text>
                )
              )}
            </View>
          )}

          {corriger.length > 0 && (
            <View
              style={
                styles.sectionCard
              }
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                Corrigés
              </Text>

              {corriger.map(
                (item, index) => (
                  <Text
                    key={index}
                    style={
                      styles.bulletText
                    }
                  >
                    •{" "}
                    {String(item)}
                  </Text>
                )
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // CHAPITRES CM2
  // =========================================================

  if (ecran === "CHAPITRES_CM2") {
    const chapitres = Array.isArray(
      CHAPITRES_CM2
    )
      ? CHAPITRES_CM2
      : [];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          title="Grammaire CM2"
          onBack={retourRubriques}
        />

        <ScrollView contentContainerStyle={styles.content}>
          {chapitres.map(
            (chapitre, index) => (
              <TouchableOpacity
                key={
                  chapitre?.id ||
                  index
                }
                style={
                  styles.lessonCard
                }
                onPress={() =>
                  ouvrirLecon(
                    chapitre
                  )
                }
              >
                <View
                  style={
                    styles.lessonNumber
                  }
                >
                  <Text
                    style={
                      styles.lessonNumberText
                    }
                  >
                    {index + 1}
                  </Text>
                </View>

                <View
                  style={
                    styles.lessonInfo
                  }
                >
                  <Text
                    style={
                      styles.lessonTitle
                    }
                  >
                    {chapitre?.titre ||
                      chapitre?.nom ||
                      `Chapitre ${
                        index + 1
                      }`}
                  </Text>
                </View>

                <Text
                  style={styles.arrow}
                >
                  ›
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // QUIZ
  // =========================================================

  if (ecran === "QUIZ") {
    if (
      !Array.isArray(
        banqueQuiz
      ) ||
      banqueQuiz.length === 0
    ) {
      return (
        <SafeAreaView
          style={styles.container}
        >
          <Header
            title="Quiz"
            onBack={retourAccueil}
          />

          <View
            style={
              styles.emptyContainer
            }
          >
            <Text
              style={
                styles.emptyIcon
              }
            >
              🧠
            </Text>

            <Text
              style={
                styles.emptyTitle
              }
            >
              Aucun quiz disponible
            </Text>

            <TouchableOpacity
              style={
                styles.primaryButton
              }
              onPress={
                retourAccueil
              }
            >
              <Text
                style={
                  styles.primaryButtonText
                }
              >
                Retour
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    if (quizTermine) {
      return (
        <SafeAreaView
          style={styles.container}
        >
          <Header
            title="Résultat"
            onBack={retourAccueil}
          />

          <View
            style={
              styles.emptyContainer
            }
          >
            <Text
              style={
                styles.emptyIcon
              }
            >
              🏆
            </Text>

            <Text
              style={
                styles.emptyTitle
              }
            >
              Quiz terminé !
            </Text>

            <Text
              style={styles.scoreText}
            >
              Score : {score} /{" "}
              {banqueQuiz.length}
            </Text>

            <TouchableOpacity
              style={
                styles.primaryButton
              }
              onPress={
                reinitialiserQuiz
              }
            >
              <Text
                style={
                  styles.primaryButtonText
                }
              >
                Recommencer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.secondaryButton
              }
              onPress={
                retourAccueil
              }
            >
              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                Accueil
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    const question =
      questionQuiz?.question ||
      questionQuiz?.texte ||
      "Question";

    const options = Array.isArray(
      questionQuiz?.options
    )
      ? questionQuiz.options
      : Array.isArray(
          questionQuiz?.choix
        )
      ? questionQuiz.choix
      : [];

    return (
      <SafeAreaView
        style={styles.container}
      >
        <Header
          title={`Quiz ${
            quizIndex + 1
          }/${banqueQuiz.length}`}
          onBack={retourAccueil}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <View
            style={
              styles.quizCard
            }
          >
            <Text
              style={
                styles.questionText
              }
            >
              {question}
            </Text>

            {options.map(
              (option, index) => {
                const bonne =
                  option ===
                    questionQuiz?.reponse ||
                  option ===
                    questionQuiz?.bonneReponse ||
                  index ===
                    questionQuiz?.bonneReponse;

                return (
                  <TouchableOpacity
                    key={index}
                    style={
                      styles.optionButton
                    }
                    onPress={() =>
                      repondreQuiz(
                        bonne
                      )
                    }
                  >
                    <Text
                      style={
                        styles.optionText
                      }
                    >
                      {String(option)}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =========================================================
  // ÉCRAN PAR DÉFAUT
  // =========================================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Header
        title="Z.ÉDUCATION"
        onBack={retourAccueil}
      />

      <View
        style={
          styles.emptyContainer
        }
      >
        <Text
          style={
            styles.emptyTitle
          }
        >
          Écran indisponible
        </Text>

        <TouchableOpacity
          style={
            styles.primaryButton
          }
          onPress={
            retourAccueil
          }
        >
          <Text
            style={
              styles.primaryButtonText
            }
          >
            Retour à l'accueil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// =========================================================
// STYLES
// =========================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  authContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 15,
    color: "#173B57",
  },

  authTitle: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 30,
    color: "#173B57",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DCE4EC",
    color: "#173B57",
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#173B57",
  },

  selectInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#DCE4EC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectText: {
    color: "#173B57",
    fontSize: 16,
    fontWeight: "600",
  },

  placeholderText: {
    color: "#999999",
    fontSize: 16,
  },

  arrowText: {
    color: "#173B57",
    fontWeight: "800",
  },

  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE4EC",
    marginBottom: 15,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F5",
  },

  dropdownText: {
    color: "#173B57",
    fontSize: 16,
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: "#173B57",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  secondaryButton: {
    backgroundColor: "#E5EBF1",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryButtonText: {
    color: "#173B57",
    fontSize: 16,
    fontWeight: "800",
  },

  linkButton: {
    paddingVertical: 8,
  },

  linkText: {
    textAlign: "center",
    color: "#173B57",
    fontWeight: "700",
    marginTop: 10,
  },

  welcomeCard: {
    backgroundColor: "#173B57",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
  },

  welcomeSubtitle: {
    color: "#DCEAF4",
    fontSize: 15,
    marginTop: 7,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  menuIcon: {
    fontSize: 32,
    marginRight: 15,
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#173B57",
  },

  menuDescription: {
    color: "#687887",
    marginTop: 4,
  },

  arrow: {
    fontSize: 30,
    color: "#173B57",
    marginLeft: 8,
  },

  pageTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 5,
  },

  pageSubtitle: {
    color: "#687887",
    fontSize: 15,
    marginBottom: 20,
  },

  subjectCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  subjectIcon: {
    fontSize: 34,
    width: 55,
  },

  subjectInfo: {
    flex: 1,
  },

  subjectTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#173B57",
  },

  subjectDescription: {
    color: "#687887",
    marginTop: 4,
  },

  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  lessonNumber: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#173B57",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  lessonNumberText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  lessonInfo: {
    flex: 1,
  },

  lessonTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#173B57",
  },

  lessonDescription: {
    color: "#687887",
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  infoText: {
    color: "#455765",
    fontSize: 16,
    lineHeight: 24,
  },

  lessonMainTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 18,
  },

  lessonContent: {
    fontSize: 16,
    lineHeight: 26,
    color: "#334955",
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 12,
  },

  bulletText: {
    fontSize: 16,
    lineHeight: 25,
    color: "#455765",
    marginBottom: 7,
  },

  quizCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  questionText: {
    fontSize: 21,
    fontWeight: "800",
    color: "#173B57",
    lineHeight: 29,
    marginBottom: 20,
  },

  optionButton: {
    backgroundColor: "#F4F7FB",
    borderWidth: 1,
    borderColor: "#DCE4EC",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  optionText: {
    fontSize: 16,
    color: "#173B57",
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#173B57",
    textAlign: "center",
    marginBottom: 15,
  },

  scoreText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#173B57",
    marginBottom: 20,
  },
});
