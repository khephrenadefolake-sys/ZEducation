import React, { useState } from "react";
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

/* =========================================================
   MATIÈRES ET RUBRIQUES
   ========================================================= */

import {
  MATIERES_CP,
  MATIERES_CP1,
  MATIERES_CP2,
  MATIERES_CE_CM,

   RUBRIQUES_CP,
  RUBRIQUES_CP2,
  RUBRIQUES_FRANCAIS_CP1,
  RUBRIQUES_MATHEMATIQUES_CP1,
  RUBRIQUES_CE_CM,
} from "./src/data/matieres";

/* =========================================================
   PROGRAMME CM2
   ========================================================= */

import {
  CHAPITRES_CM2,
  PROGRAMMES_GRAMMAIRE,
} from "./src/data/programmeCM2";

/* =========================================================
   DONNÉES GÉNÉRALES
   ========================================================= */

import { QUIZ } from "./src/data/quiz";
import { obtenirContenu } from "./src/data/lecons";
/* =========================================================
   DONNÉES CP1 PNAPAS
   ========================================================= */

/*
 * Import global volontairement utilisé ici.
 *
 * Cela permet à App.js d'accéder aux données CP1 même si
 * certaines exportations auxiliaires ne sont pas présentes
 * dans src/data/CP1/index.js.
 *
 * Les données CP1 disponibles sont recherchées de manière
 * sécurisée dans l'objet CP1_DATA.
 */
import * as CP1_DATA from "./src/data/CP1";

/* =========================================================
   SÉCURISATION DES RUBRIQUES CP1
   ========================================================= */

/*
 * Français CP1 :
 * Pré-lecture
 * Lecture-écriture
 * Compréhension
 * Expression orale
 * Exercices
 * Évaluation
 */
const rubriquesFrancaisCP1 =
  Array.isArray(RUBRIQUES_FRANCAIS_CP1)
    ? RUBRIQUES_FRANCAIS_CP1
    : Array.isArray(CP1_DATA.RUBRIQUES_FRANCAIS_CP1)
      ? CP1_DATA.RUBRIQUES_FRANCAIS_CP1
      : [];

/*
 * Mathématiques CP1 :
 * Nombres
 * Calcul
 * Géométrie
 * Problèmes
 */
const rubriquesMathsCP1 =
  Array.isArray(RUBRIQUES_MATHEMATIQUES_CP1)
    ? RUBRIQUES_MATHEMATIQUES_CP1
    : Array.isArray(CP1_DATA.RUBRIQUES_MATHEMATIQUES_CP1)
      ? CP1_DATA.RUBRIQUES_MATHEMATIQUES_CP1
      : [];

/* =========================================================
   DONNÉES COMPLÈTES CP1
   ========================================================= */

/*
 * On récupère l'objet CP1 exporté par src/data/CP1/index.js
 * lorsqu'il existe.
 */
const donneesCP1 =
  CP1_DATA.CP1 &&
  typeof CP1_DATA.CP1 === "object"
    ? CP1_DATA.CP1
    : {};

/* =========================================================
   FONCTION DE RECHERCHE D'UNE LEÇON CP1
   ========================================================= */

/*
 * Recherche récursive d'une leçon dans les différentes
 * structures de données CP1.
 *
 * La recherche accepte aussi bien :
 *   - id
 *   - code
 *
 * Cela rend App.js compatible avec les différents fichiers
 * pédagogiques CP1.
 */
const chercherLeconDansDonnees = (
  donnees,
  identifiant
) => {
  if (!donnees || !identifiant) {
    return null;
  }

  /* ---------------------------------------------
     CAS 1 : tableau
     --------------------------------------------- */
  if (Array.isArray(donnees)) {
    for (const item of donnees) {
      if (!item) {
        continue;
      }

      if (
        item?.id === identifiant ||
        item?.code === identifiant
      ) {
        return item;
      }

      const resultat =
        chercherLeconDansDonnees(
          item,
          identifiant
        );

      if (resultat) {
        return resultat;
      }
    }

    return null;
  }

  /* ---------------------------------------------
     CAS 2 : objet
     --------------------------------------------- */
  if (typeof donnees === "object") {
    for (const cle of Object.keys(donnees)) {
      const valeur = donnees[cle];

      if (
        valeur &&
        typeof valeur === "object"
      ) {
        if (
          valeur?.id === identifiant ||
          valeur?.code === identifiant
        ) {
          return valeur;
        }

        const resultat =
          chercherLeconDansDonnees(
            valeur,
            identifiant
          );

        if (resultat) {
          return resultat;
        }
      }
    }
  }

  return null;
};

/* =========================================================
   RÉCUPÉRATION SÉCURISÉE D'UNE LEÇON CP1
   ========================================================= */

const getLeconCP1 = (lecon) => {
  if (!lecon) {
    return null;
  }

  const identifiant =
    lecon?.code || lecon?.id;

  /*
   * Si l'objet reçu contient déjà le contenu complet,
   * on le conserve.
   */
  if (!identifiant) {
    return lecon;
  }

  /* ---------------------------------------------
     1. Fonction officielle éventuelle
     --------------------------------------------- */
  if (
    typeof CP1_DATA.getCP1Lesson ===
    "function"
  ) {
    try {
      const resultat =
        CP1_DATA.getCP1Lesson(
          identifiant
        );

      if (resultat) {
        return resultat;
      }
    } catch (error) {
      /*
       * En cas d'erreur, on continue avec la
       * recherche locale.
       */
    }
  }

  /* ---------------------------------------------
     2. Recherche dans les données CP1
     --------------------------------------------- */
  const resultatCP1 =
    chercherLeconDansDonnees(
      donneesCP1,
      identifiant
    );

  if (resultatCP1) {
    return resultatCP1;
  }

  /* ---------------------------------------------
     3. Recherche dans les rubriques CP1
     --------------------------------------------- */
  const resultatRubriques =
    chercherLeconDansDonnees(
      [
        ...rubriquesFrancaisCP1,
        ...rubriquesMathsCP1,
      ],
      identifiant
    );

  if (resultatRubriques) {
    return resultatRubriques;
  }

  /*
   * Si aucune recherche ne trouve une autre version,
   * on retourne la leçon reçue.
   */
  return lecon;
};
/* =========================================================
   APPLICATION
   ========================================================= */

export default function App() {
  /* =======================================================
     ÉTATS
     ======================================================= */

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

  /* =======================================================
     QUIZ
     ======================================================= */

  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizTermine, setQuizTermine] = useState(false);

  /* =======================================================
     DONNÉES CP1 SÉCURISÉES
     ======================================================= */

  const rubriquesFrancaisCP1 =
    Array.isArray(CP1_DATA.RUBRIQUES_FRANCAIS_CP1)
      ? CP1_DATA.RUBRIQUES_FRANCAIS_CP1
      : [];

  const rubriquesMathsCP1 =
    Array.isArray(CP1_DATA.RUBRIQUES_MATHS_CP1)
      ? CP1_DATA.RUBRIQUES_MATHS_CP1
      : [];

  const donneesCP1 =
    CP1_DATA.CP1 && typeof CP1_DATA.CP1 === "object"
      ? CP1_DATA.CP1
      : {};

  /* =======================================================
     NORMALISATION DU NIVEAU
     ======================================================= */

  const niveauNormalise = String(
    eleve?.niveau || niveauSelectionne || niveau || ""
  )
    .toUpperCase()
    .replace(/\s+/g, "");

  const estCP1 = niveauNormalise === "CP1";

  const estCP =
    niveauNormalise === "CP1" ||
    niveauNormalise === "CP2" ||
    niveauNormalise.startsWith("CP");

  /* =======================================================
     MATIÈRES
     ======================================================= */

   const matieres = estCP1
    ? Array.isArray(MATIERES_CP1)
      ? MATIERES_CP1
      : []
    : estCP
    ? Array.isArray(MATIERES_CP2)
      ? MATIERES_CP2
      : []
    : Array.isArray(MATIERES_CE_CM)
    ? MATIERES_CE_CM
    : [];

  /* =======================================================
     RUBRIQUES FRANÇAIS
     ======================================================= */

  const rubriquesFrancais = estCP1
    ? rubriquesFrancaisCP1
    : estCP
    ? Array.isArray(RUBRIQUES_CP)
      ? RUBRIQUES_CP
      : []
    : Array.isArray(RUBRIQUES_CE_CM)
    ? RUBRIQUES_CE_CM
    : [];

  /* =======================================================
     RUBRIQUES MATHÉMATIQUES
     ======================================================= */

  const rubriquesMaths = estCP1
    ? rubriquesMathsCP1
    : estCP
    ? Array.isArray(RUBRIQUES_CP2)
      ? RUBRIQUES_CP2
      : []
    : [];

  /* =======================================================
     UTILITAIRES
     ======================================================= */

  const estMatiereFrancais = (matiere) => {
    const id = String(
      matiere?.id || ""
    ).toLowerCase();

    return (
      id === "francais" ||
      id === "français"
    );
  };

  const estMatiereMaths = (matiere) => {
    const id = String(
      matiere?.id || ""
    ).toLowerCase();

    return (
      id === "maths" ||
      id === "mathematiques" ||
      id === "mathématiques"
    );
  };
  /* =======================================================
     RECHERCHE D'UNE RUBRIQUE CP1
     ======================================================= */

  const getRubriqueCP1 = (rubrique) => {
    if (!rubrique) {
      return null;
    }

    const rubriqueId = rubrique?.id;

    if (!rubriqueId) {
      return rubrique;
    }

    const toutesRubriques = [
      ...rubriquesFrancaisCP1,
      ...rubriquesMathsCP1,
    ];

    const trouvee = toutesRubriques.find(
      (item) => item?.id === rubriqueId
    );

    return trouvee || rubrique;
  };

  /* =======================================================
     RECHERCHE RÉCURSIVE D'UNE LEÇON CP1
     ======================================================= */

  const chercherLeconDansDonnees = (donnees, identifiant) => {
    if (!donnees || !identifiant) {
      return null;
    }

    if (Array.isArray(donnees)) {
      for (const item of donnees) {
        if (!item) {
          continue;
        }

        if (
          item?.id === identifiant ||
          item?.code === identifiant
        ) {
          return item;
        }

        const resultat = chercherLeconDansDonnees(
          item,
          identifiant
        );

        if (resultat) {
          return resultat;
        }
      }

      return null;
    }

    if (typeof donnees === "object") {
      for (const cle of Object.keys(donnees)) {
        const valeur = donnees[cle];

        if (
          valeur &&
          typeof valeur === "object"
        ) {
          const resultat =
            chercherLeconDansDonnees(
              valeur,
              identifiant
            );

          if (resultat) {
            return resultat;
          }
        }
      }
    }

    return null;
  };

  /* =======================================================
     RECHERCHE D'UNE LEÇON CP1
     ======================================================= */

  const getLeconCP1 = (lecon) => {
    if (!lecon) {
      return null;
    }

    const identifiant =
      lecon?.code || lecon?.id;

    if (!identifiant) {
      return lecon;
    }

    /* Utilisation de la fonction existante si elle existe */
    if (
      typeof CP1_DATA.getCP1Lesson ===
      "function"
    ) {
      try {
        const resultat =
          CP1_DATA.getCP1Lesson(
            identifiant
          );

        if (resultat) {
          return resultat;
        }
      } catch (error) {
        /* Recherche locale ci-dessous */
      }
    }

    /* Recherche dans CP1 */
    const resultatCP1 =
      chercherLeconDansDonnees(
        donneesCP1,
        identifiant
      );

    if (resultatCP1) {
      return resultatCP1;
    }

    /* Recherche dans les rubriques */
    const resultatRubriques =
      chercherLeconDansDonnees(
        [
          ...rubriquesFrancaisCP1,
          ...rubriquesMathsCP1,
        ],
        identifiant
      );

    return resultatRubriques || lecon;
  };

  /* =======================================================
     LEÇONS D'UNE RUBRIQUE
     ======================================================= */

  const getLeconsRubrique = (rubrique) => {
    const rubriqueComplete =
      getRubriqueCP1(rubrique);

    if (!rubriqueComplete) {
      return [];
    }

    if (
      Array.isArray(
        rubriqueComplete.lecons
      )
    ) {
      return rubriqueComplete.lecons;
    }

    if (
      Array.isArray(
        rubriqueComplete.chapitres
      )
    ) {
      return rubriqueComplete.chapitres;
    }

    if (
      Array.isArray(
        rubriqueComplete.index
      )
    ) {
      return rubriqueComplete.index;
    }

    if (
      Array.isArray(
        rubriqueComplete.lessons
      )
    ) {
      return rubriqueComplete.lessons;
    }

    return [];
  };

  /* =======================================================
     INSCRIPTION
     ======================================================= */

  const inscrireEleve = () => {
    const nomPropre = nom.trim();
    const prenomsPropres = prenoms.trim();
    const emailPropre =
      email.trim().toLowerCase();

    const confirmationEmailPropre =
      confirmationEmail
        .trim()
        .toLowerCase();

    if (
      !nomPropre ||
      !prenomsPropres ||
      !niveau
    ) {
      Alert.alert(
        "Champs incomplets",
        "Veuillez renseigner le nom, les prénoms et le niveau."
      );
      return;
    }

    if (
      !emailPropre ||
      !confirmationEmailPropre
    ) {
      Alert.alert(
        "Email manquant",
        "Veuillez renseigner et confirmer votre adresse email."
      );
      return;
    }

    if (
      !emailPropre.includes("@") ||
      !emailPropre.includes(".")
    ) {
      Alert.alert(
        "Email incorrect",
        "Veuillez saisir une adresse email valide."
      );
      return;
    }

    if (
      emailPropre !==
      confirmationEmailPropre
    ) {
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

    if (
      motDePasse !==
      confirmationMotDePasse
    ) {
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

  /* =======================================================
     CONNEXION
     ======================================================= */

  const connecter = () => {
    const emailSaisi =
      emailConnexion
        .trim()
        .toLowerCase();

    if (
      !emailSaisi ||
      !motDePasseConnexion
    ) {
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

    if (
      emailSaisi !==
      eleve.email
    ) {
      Alert.alert(
        "Erreur",
        "Cette adresse email ne correspond pas au compte créé."
      );
      return;
    }

    if (
      motDePasseConnexion !==
      eleve.motDePasse
    ) {
      Alert.alert(
        "Erreur",
        "Mot de passe incorrect."
      );
      return;
    }

    setNiveauSelectionne(
      eleve.niveau
    );

    setMatiereSelectionnee(null);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);

    setEcran("ACCUEIL");
  };

  /* =======================================================
     NAVIGATION
     ======================================================= */

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

    if (
      estMatiereMaths(
        matiereSelectionnee
      )
    ) {
      setEcran("MATHEMATIQUES");
    } else {
      setEcran("FRANCAIS");
    }
  };

  /* =======================================================
     OUVRIR UNE MATIÈRE
     ======================================================= */

  const ouvrirMatiere = (matiere) => {
    setMatiereSelectionnee(matiere);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);

    if (
      estMatiereFrancais(matiere)
    ) {
      setEcran("FRANCAIS");
      return;
    }

    if (
      estMatiereMaths(matiere)
    ) {
      setEcran("MATHEMATIQUES");
      return;
    }

    setEcran("MATIERE_DETAILS");
  };

  /* =======================================================
     OUVRIR UNE RUBRIQUE
     ======================================================= */

  const ouvrirRubrique = (
    rubrique
  ) => {
    const rubriqueComplete =
      estCP1
        ? getRubriqueCP1(rubrique)
        : rubrique;

    setRubriqueSelectionnee(
      rubriqueComplete
    );

    setChapitreSelectionne(null);
    setEcran("RUBRIQUE");
  };

  /* =======================================================
     OUVRIR UNE LEÇON
     ======================================================= */

  const ouvrirLecon = (lecon) => {
    const leconComplete =
      estCP1
        ? getLeconCP1(lecon)
        : lecon;

    setChapitreSelectionne(
      leconComplete
    );

    setEcran("LECON");
  };

  /* =======================================================
     PROGRAMME GRAMMAIRE
     ======================================================= */

  const programmeGrammaire =
    PROGRAMMES_GRAMMAIRE?.[
      niveauNormalise
    ] ||
    PROGRAMMES_GRAMMAIRE?.[
      eleve?.niveau
    ] ||
    [];

  /* =======================================================
     QUIZ
     ======================================================= */

  const banqueQuizGenerale =
    QUIZ?.[niveauNormalise] ||
    QUIZ?.[eleve?.niveau] ||
    (Array.isArray(QUIZ)
      ? QUIZ
      : []);

  const leconActuelleCP1 =
    estCP1
      ? getLeconCP1(
          chapitreSelectionne
        )
      : null;

  const banqueQuizCP1 =
    leconActuelleCP1?.quiz ||
    leconActuelleCP1?.questionsQuiz ||
    [];

  const banqueQuiz =
    estCP1
      ? banqueQuizCP1
      : banqueQuizGenerale;

  const questionQuiz =
    Array.isArray(banqueQuiz)
      ? banqueQuiz[quizIndex]
      : null;

  const reinitialiserQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setQuizTermine(false);
    setEcran("QUIZ");
  };

  const repondreQuiz = (
    bonneReponse
  ) => {
    if (bonneReponse) {
      setScore(
        (ancienScore) =>
          ancienScore + 1
      );
    }

    if (
      !Array.isArray(banqueQuiz) ||
      banqueQuiz.length === 0 ||
      quizIndex >=
        banqueQuiz.length - 1
    ) {
      setQuizTermine(true);
    } else {
      setQuizIndex(
        (ancienIndex) =>
          ancienIndex + 1
      );
    }
  };

  /* =======================================================
     PROTECTION DES ÉCRANS
     ======================================================= */

  const ecransPublics = [
    "WELCOME",
    "INSCRIPTION",
    "LOGIN",
  ];

  if (
    !ecransPublics.includes(ecran) &&
    !eleve
  ) {
    return (
      <WelcomeScreen
        go={setEcran}
        onLogin={() =>
          setEcran("LOGIN")
        }
        onRegister={() =>
          setEcran("INSCRIPTION")
        }
      />
    );
  }

  /* =======================================================
     WELCOME
     ======================================================= */

  if (ecran === "WELCOME") {
    return (
      <WelcomeScreen
        go={setEcran}
        onLogin={() =>
          setEcran("LOGIN")
        }
        onRegister={() =>
          setEcran("INSCRIPTION")
        }
      />
    );
  }

  /* =======================================================
     INSCRIPTION
     ======================================================= */

  if (ecran === "INSCRIPTION") {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <ScrollView
          contentContainerStyle={
            styles.authContainer
          }
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.logo}>
            Z.ÉDUCATION
          </Text>

          <Text
            style={styles.authTitle}
          >
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
            style={
              styles.selectInput
            }
            onPress={() =>
              setNiveauOuvert(
                (ancien) => !ancien
              )
            }
          >
            <Text
              style={
                niveau
                  ? styles.selectText
                  : styles.placeholderText
              }
            >
              {niveau ||
                "Sélectionner le niveau"}
            </Text>

            <Text
              style={styles.arrowText}
            >
              {niveauOuvert
                ? "▲"
                : "▼"}
            </Text>
          </TouchableOpacity>

          {niveauOuvert && (
            <View
              style={styles.dropdown}
            >
              {(Array.isArray(NIVEAUX)
                ? NIVEAUX
                : []
              ).map(
                (item, index) => {
                  const valeur =
                    typeof item ===
                    "string"
                      ? item
                      : item?.id ||
                        item?.nom;

                  const libelle =
                    typeof item ===
                    "string"
                      ? item
                      : item?.nom ||
                        item?.id;

                  if (!valeur) {
                    return null;
                  }

                  return (
                    <TouchableOpacity
                      key={
                        String(valeur) +
                        "-" +
                        String(index)
                      }
                      style={
                        styles.dropdownItem
                      }
                      onPress={() => {
                        setNiveau(
                          String(
                            valeur
                          )
                        );
                        setNiveauOuvert(
                          false
                        );
                      }}
                    >
                      <Text
                        style={
                          styles.dropdownText
                        }
                      >
                        {String(
                          libelle
                        )}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
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
            value={
              confirmationEmail
            }
            onChangeText={
              setConfirmationEmail
            }
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#999"
            value={motDePasse}
            onChangeText={
              setMotDePasse
            }
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#999"
            value={
              confirmationMotDePasse
            }
            onChangeText={
              setConfirmationMotDePasse
            }
            secureTextEntry
          />

          <TouchableOpacity
            style={
              styles.primaryButton
            }
            onPress={
              inscrireEleve
            }
            activeOpacity={0.8}
          >
            <Text
              style={
                styles.primaryButtonText
              }
            >
              CRÉER MON COMPTE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setEcran("LOGIN")
            }
            style={
              styles.linkButton
            }
          >
            <Text
              style={styles.linkText}
            >
              J'ai déjà un compte
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setEcran("WELCOME")
            }
            style={
              styles.linkButton
            }
          >
            <Text
              style={styles.linkText}
            >
              Retour
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     CONNEXION
     ======================================================= */

  if (ecran === "LOGIN") {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <View
          style={styles.authContainer}
        >
          <Text style={styles.logo}>
            Z.ÉDUCATION
          </Text>

          <Text
            style={styles.authTitle}
          >
            Connexion
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={
              emailConnexion
            }
            onChangeText={
              setEmailConnexion
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#999"
            secureTextEntry
            value={
              motDePasseConnexion
            }
            onChangeText={
              setMotDePasseConnexion
            }
          />

          <TouchableOpacity
            style={
              styles.primaryButton
            }
            onPress={connecter}
            activeOpacity={0.8}
          >
            <Text
              style={
                styles.primaryButtonText
              }
            >
              SE CONNECTER
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setEcran("INSCRIPTION")
            }
            style={
              styles.linkButton
            }
          >
            <Text
              style={styles.linkText}
            >
              Créer un compte
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setEcran("WELCOME")
            }
            style={
              styles.linkButton
            }
          >
            <Text
              style={styles.linkText}
            >
              Retour
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* =======================================================
     ACCUEIL
     ======================================================= */

  if (ecran === "ACCUEIL") {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Z.ÉDUCATION"
          onBack={null}
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <View
            style={styles.welcomeCard}
          >
            <Text
              style={
                styles.welcomeTitle
              }
            >
              Bonjour{" "}
              {eleve?.prenoms ||
                eleve?.nom ||
                "Élève"}{" "}
              👋
            </Text>

            <Text
              style={
                styles.welcomeSubtitle
              }
            >
              Niveau :{" "}
              {eleve?.niveau ||
                niveauNormalise}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() =>
              setEcran("MATIERES")
            }
          >
            <Text
              style={styles.menuIcon}
            >
              📚
            </Text>

            <View
              style={
                styles.menuTextContainer
              }
            >
              <Text
                style={styles.menuTitle}
              >
                Matières
              </Text>

              <Text
                style={
                  styles.menuDescription
                }
              >
                Accéder aux matières de votre niveau
              </Text>
            </View>

            <Text
              style={styles.arrow}
            >
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={
              reinitialiserQuiz
            }
          >
            <Text
              style={styles.menuIcon}
            >
              🧠
            </Text>

            <View
              style={
                styles.menuTextContainer
              }
            >
              <Text
                style={styles.menuTitle}
              >
                Quiz
              </Text>

              <Text
                style={
                  styles.menuDescription
                }
              >
                Testez vos connaissances
              </Text>
            </View>

            <Text
              style={styles.arrow}
            >
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
            <Text
              style={styles.menuIcon}
            >
              ✏️
            </Text>

            <View
              style={
                styles.menuTextContainer
              }
            >
              <Text
                style={styles.menuTitle}
              >
                Exercices
              </Text>

              <Text
                style={
                  styles.menuDescription
                }
              >
                Entraînez-vous
              </Text>
            </View>

            <Text
              style={styles.arrow}
            >
              ›
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     MATIÈRES
     ======================================================= */

  if (ecran === "MATIERES") {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Matières"
          onBack={retourAccueil}
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <Text
            style={styles.pageTitle}
          >
            {eleve?.niveau ||
              niveauNormalise}
          </Text>

          <Text
            style={styles.pageSubtitle}
          >
            Choisissez une matière
          </Text>

          {matieres.map(
            (matiere, index) => (
              <TouchableOpacity
                key={
                  matiere?.id ||
                  String(index)
                }
                style={
                  styles.subjectCard
                }
                onPress={() =>
                  ouvrirMatiere(
                    matiere
                  )
                }
              >
                <Text
                  style={
                    styles.subjectIcon
                  }
                >
                  {matiere?.icon ||
                    "📚"}
                </Text>

                <View
                  style={
                    styles.subjectInfo
                  }
                >
                  <Text
                    style={
                      styles.subjectTitle
                    }
                  >
                    {matiere?.nom ||
                      "Matière"}
                  </Text>

                  <Text
                    style={
                      styles.subjectDescription
                    }
                  >
                    {matiere?.description ||
                      ""}
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

  /* =======================================================
     FRANÇAIS
     ======================================================= */
  if (ecran === "FRANCAIS") {
    const rubriquesAffichees = estCP1
      ? Array.isArray(rubriquesFrancaisCP1)
        ? rubriquesFrancaisCP1
        : []
      : Array.isArray(rubriquesFrancais)
      ? rubriquesFrancais
      : [];

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Français"
          onBack={retourMatieres}
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <Text
            style={styles.pageTitle}
          >
            Français —{" "}
            {niveauNormalise}
          </Text>

          {estCP1 && (
            <View
              style={styles.programCard}
            >
              <Text
                style={
                  styles.programBadge
                }
              >
                PNAPAS
              </Text>

              <Text
                style={
                  styles.programTitle
                }
              >
                Français CP1
              </Text>

              <Text
                style={
                  styles.programText
                }
              >
                Premiers apprentissages de la lecture,
                de l'écriture, de la compréhension et
                de l'expression orale.
              </Text>
            </View>
          )}

          <Text
            style={styles.pageSubtitle}
          >
            Choisissez une rubrique
          </Text>

          {rubriquesAffichees.length > 0 ? (
            rubriquesAffichees.map(
              (rubrique, index) => (
                <TouchableOpacity
                  key={
                    rubrique?.id ||
                    String(index)
                  }
                  style={
                    styles.subjectCard
                  }
                  onPress={() =>
                    ouvrirRubrique(
                      rubrique
                    )
                  }
                >
                  <Text
                    style={
                      styles.subjectIcon
                    }
                  >
                    {rubrique?.icon ||
                      "📖"}
                  </Text>

                  <View
                    style={
                      styles.subjectInfo
                    }
                  >
                    <Text
                      style={
                        styles.subjectTitle
                      }
                    >
                      {rubrique?.nom ||
                        "Rubrique"}
                    </Text>

                    {rubrique?.description ? (
                      <Text
                        style={
                          styles.subjectDescription
                        }
                      >
                        {
                          rubrique.description
                        }
                      </Text>
                    ) : null}

                    {rubrique?.progression ? (
                      <Text
                        style={
                          styles.progressionMini
                        }
                      >
                        Progression :{" "}
                        {
                          rubrique.progression
                        }
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              )
            )
          ) : (
            <View
              style={styles.programCard}
            >
              <Text
                style={
                  styles.programTitle
                }
              >
                Aucune rubrique disponible
              </Text>

              <Text
                style={
                  styles.programText
                }
              >
                Les rubriques de cette matière
                ne sont pas encore disponibles.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }                    >
                      Progression disponible
                    </Text>
                  ) : null}
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

  /* =======================================================
     MATHÉMATIQUES
     ======================================================= */

  if (
    ecran === "MATHEMATIQUES"
  ) {
    const rubriquesAffichees =
      estCP1
        ? rubriquesMaths
        : [
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
          ];

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Mathématiques"
          onBack={retourMatieres}
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <Text
            style={styles.pageTitle}
          >
            Mathématiques —{" "}
            {niveauNormalise}
          </Text>

          {estCP1 && (
            <View
              style={styles.programCard}
            >
              <Text
                style={
                  styles.programBadge
                }
              >
                PNAPAS
              </Text>

              <Text
                style={
                  styles.programTitle
                }
              >
                Mathématiques CP1
              </Text>

              <Text
                style={
                  styles.programText
                }
              >
                Nombres, calcul, géométrie et résolution
                de problèmes.
              </Text>
            </View>
          )}

          <Text
            style={styles.pageSubtitle}
          >
            Choisissez une rubrique
          </Text>

          {rubriquesAffichees.map(
            (rubrique, index) => (
              <TouchableOpacity
                key={
                  rubrique?.id ||
                  String(index)
                }
                style={
                  styles.subjectCard
                }
                onPress={() =>
                  ouvrirRubrique(
                    rubrique
                  )
                }
              >
                <Text
                  style={
                    styles.subjectIcon
                  }
                >
                  {rubrique?.icon ||
                    "📚"}
                </Text>

                <View
                  style={
                    styles.subjectInfo
                  }
                >
                  <Text
                    style={
                      styles.subjectTitle
                    }
                  >
                    {rubrique?.nom ||
                      "Rubrique"}
                  </Text>

                  {rubrique?.description ? (
                    <Text
                      style={
                        styles.subjectDescription
                      }
                    >
                      {
                        rubrique.description
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
            )
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     AUTRES MATIÈRES
     ======================================================= */

  if (
    ecran === "MATIERE_DETAILS"
  ) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title={
            matiereSelectionnee?.nom ||
            "Matière"
          }
          onBack={retourMatieres}
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <Text
            style={styles.pageTitle}
          >
            {matiereSelectionnee?.nom ||
              "Matière"}
          </Text>

          <Text
            style={styles.pageSubtitle}
          >
            Contenu du programme
          </Text>

          <View
            style={styles.infoCard}
          >
            <Text
              style={styles.infoText}
            >
              Le contenu de cette matière sera
              organisé selon le programme
              correspondant au niveau de l'élève.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     RUBRIQUE
     ======================================================= */

  if (ecran === "RUBRIQUE") {
    const rubrique =
      rubriqueSelectionnee;

    const contenus = estCP1
      ? getLeconsRubrique(
          rubrique
        )
      : (() => {
          let resultat = [];

          if (
            rubrique?.id ===
              "grammaire" &&
            Array.isArray(
              programmeGrammaire
            )
          ) {
            resultat =
              programmeGrammaire;
          }

          if (
            [
              "lecture",
              "ecriture",
              "écriture",
              "vocabulaire",
              "expression",
              "expression_orale",
            ].includes(
              rubrique?.id
            )
          ) {
            try {
              const contenu =
                obtenirContenu?.(
                  niveauNormalise,
                  "francais",
                  rubrique.id
                );

              if (
                Array.isArray(contenu)
              ) {
                resultat = contenu;
              }
            } catch (error) {
              resultat = [];
            }
          }

          return resultat;
        })();

    const listeFinale =
      contenus.length > 0
        ? contenus
        : [
            {
              id: "vide",
              titre: "Contenu à venir",
              description:
                "Le contenu détaillé de cette rubrique sera affiché ici.",
            },
          ];

    const progression =
      rubrique?.progression;

    const indexRubrique =
      Array.isArray(
        rubrique?.index
      )
        ? rubrique.index
        : [];

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title={
            rubrique?.nom ||
            "Rubrique"
          }
          onBack={retourRubriques}
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <Text
            style={styles.pageTitle}
          >
            {rubrique?.nom ||
              "Rubrique"}
          </Text>

          {rubrique?.description ? (
            <Text
              style={styles.pageSubtitle}
            >
              {
                rubrique.description
              }
            </Text>
          ) : null}

          {estCP1 && (
            <>
              <View
                style={styles.sectionCard}
              >
                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  INDEX
                </Text>

                {indexRubrique.length >
                0 ? (
                  indexRubrique.map(
                    (item, index) => (
                      <Text
                        key={String(
                          index
                        )}
                        style={
                          styles.indexText
                        }
                      >
                        {index + 1}.{" "}
                        {typeof item ===
                        "string"
                          ? item
                          : item?.titre ||
                            item?.nom ||
                            item?.code ||
                            "Élément"}
                      </Text>
                    )
                  )
                ) : (
                  <Text
                    style={
                      styles.bulletText
                    }
                  >
                    Le programme est organisé
                    progressivement par chapitres
                    et leçons.
                  </Text>
                )}
              </View>

              <View
                style={styles.sectionCard}
              >
                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  PROGRESSION
                </Text>

                {Array.isArray(
                  progression
                ) ? (
                  progression.map(
                    (item, index) => (
                      <Text
                        key={String(
                          index
                        )}
                        style={
                          styles.bulletText
                        }
                      >
                        •{" "}
                        {typeof item ===
                        "string"
                          ? item
                          : item?.titre ||
                            item?.nom ||
                            JSON.stringify(
                              item
                            )}
                      </Text>
                    )
                  )
                ) : (
                  <Text
                    style={
                      styles.bulletText
                    }
                  >
                    {progression ||
                      "Progression pédagogique CP1 PNAPAS."}
                  </Text>
                )}
              </View>
            </>
          )}

          <View
            style={
              styles.sectionHeaderRow
            }
          >
            <Text
              style={
                styles.sectionTitleInline
              }
            >
              CHAPITRES ET LEÇONS
            </Text>

            <Text
              style={styles.countBadge}
            >
              {contenus.length}
            </Text>
          </View>

          {listeFinale.map(
            (contenu, index) => {
              const titre =
                contenu?.titre ||
                contenu?.nom ||
                `Leçon ${index + 1}`;

              const description =
                contenu?.description ||
                contenu?.objectif ||
                "";

              return (
                <TouchableOpacity
                  key={
                    contenu?.code ||
                    contenu?.id ||
                    String(index)
                  }
                  style={
                    styles.lessonCard
                  }
                  onPress={() =>
                    contenus.length >
                    0
                      ? ouvrirLecon(
                          contenu
                        )
                      : null
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

                    {description ? (
                      <Text
                        style={
                          styles.lessonDescription
                        }
                      >
                        {description}
                      </Text>
                    ) : null}

                    {contenu?.code ? (
                      <Text
                        style={
                          styles.codeText
                        }
                      >
                        {contenu.code}
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

          {estCP1 &&
            rubrique?.evaluation && (
              <TouchableOpacity
                style={
                  styles.evaluationButton
                }
                onPress={() =>
                  setEcran(
                    "CP1_EVALUATION"
                  )
                }
              >
                <Text
                  style={
                    styles.evaluationIcon
                  }
                >
                  📝
                </Text>

                <View
                  style={
                    styles.evaluationInfo
                  }
                >
                  <Text
                    style={
                      styles.evaluationTitle
                    }
                  >
                    ÉVALUATION
                  </Text>

                  <Text
                    style={
                      styles.evaluationText
                    }
                  >
                    Évaluer les acquis de cette
                    rubrique
                  </Text>
                </View>

                <Text
                  style={styles.arrow}
                >
                  ›
                </Text>
              </TouchableOpacity>
            )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     ÉVALUATION CP1
     ======================================================= */

  if (
    ecran === "CP1_EVALUATION"
  ) {
    const rubrique =
      rubriqueSelectionnee;

    const evaluation =
      rubrique?.evaluation;

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Évaluation"
          onBack={() =>
            setEcran("RUBRIQUE")
          }
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <Text
            style={styles.pageTitle}
          >
            Évaluation
          </Text>

          <Text
            style={styles.pageSubtitle}
          >
            {rubrique?.nom || "CP1"}
          </Text>

          <View
            style={
              styles.evaluationMainCard
            }
          >
            <Text
              style={
                styles.evaluationBigIcon
              }
            >
              📝
            </Text>

            <Text
              style={
                styles.evaluationMainTitle
              }
            >
              Évaluation des acquis
            </Text>

            <Text
              style={
                styles.evaluationMainText
              }
            >
              {typeof evaluation ===
              "string"
                ? evaluation
                : evaluation?.consigne ||
                  evaluation?.description ||
                  "Évaluation des compétences acquises dans cette rubrique."}
            </Text>

            {typeof evaluation ===
              "object" &&
            Array.isArray(
              evaluation?.criteres
            ) ? (
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
                  Critères
                </Text>

                {evaluation.criteres.map(
                  (
                    critere,
                    index
                  ) => (
                    <Text
                      key={String(
                        index
                      )}
                      style={
                        styles.bulletText
                      }
                    >
                      •{" "}
                      {String(
                        critere
                      )}
                    </Text>
                  )
                )}
              </View>
            ) : null}

            <TouchableOpacity
              style={
                styles.primaryButton
              }
              onPress={() =>
                setEcran(
                  "RUBRIQUE"
                )
              }
            >
              <Text
                style={
                  styles.primaryButtonText
                }
              >
                RETOUR À LA RUBRIQUE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     LEÇON
     ======================================================= */

  if (ecran === "LECON") {
    const lecon = estCP1
      ? getLeconCP1(
          chapitreSelectionne
        )
      : chapitreSelectionne || {};

    const titre =
      lecon?.titre ||
      lecon?.nom ||
      "Leçon";

    const objectif =
      lecon?.objectif || "";

    const explication =
      lecon?.explication ||
      lecon?.contenu ||
      lecon?.description ||
      "";

    const regle =
      lecon?.regle || "";

    const exemples =
      Array.isArray(
        lecon?.exemples
      )
        ? lecon.exemples
        : [];

    const corriges =
      Array.isArray(
        lecon?.corriges
      )
        ? lecon.corriges
        : [];

    const retenir =
      lecon?.retenir || "";

    const decodables =
      Array.isArray(
        lecon?.decodables
      )
        ? lecon.decodables
        : [];

    const manipulations =
      Array.isArray(
        lecon?.manipulations
      )
        ? lecon.manipulations
        : [];

    const exercices =
      Array.isArray(
        lecon?.exercices
      )
        ? lecon.exercices
        : [];

    const quiz =
      Array.isArray(
        lecon?.quiz
      )
        ? lecon.quiz
        : [];

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Leçon"
          onBack={() =>
            setEcran("RUBRIQUE")
          }
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <View
            style={
              styles.lessonHeaderCard
            }
          >
            {lecon?.code ? (
              <Text
                style={
                  styles.codeBadge
                }
              >
                {lecon.code}
              </Text>
            ) : null}

            <Text
              style={
                styles.lessonMainTitle
              }
            >
              {titre}
            </Text>

            {objectif ? (
              <View
                style={
                  styles.objectiveBox
                }
              >
                <Text
                  style={
                    styles.objectiveTitle
                  }
                >
                  OBJECTIF
                </Text>

                <Text
                  style={
                    styles.objectiveText
                  }
                >
                  {typeof objectif ===
                  "string"
                    ? objectif
                    : JSON.stringify(
                        objectif
                      )}
                </Text>
              </View>
            ) : null}
          </View>

          {explication ? (
            <View
              style={styles.sectionCard}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                COURS
              </Text>

              <Text
                style={
                  styles.lessonContent
                }
              >
                {typeof explication ===
                "string"
                  ? explication
                  : JSON.stringify(
                      explication
                    )}
              </Text>
            </View>
          ) : null}

          {regle ? (
            <View
              style={styles.ruleCard}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                À RETENIR
              </Text>

              <Text
                style={styles.ruleText}
              >
                {typeof regle ===
                "string"
                  ? regle
                  : JSON.stringify(
                      regle
                    )}
              </Text>
            </View>
          ) : null}

          {exemples.length > 0 && (
            <View
              style={styles.sectionCard}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                EXEMPLES
              </Text>

              {exemples.map(
                (exemple, index) => (
                  <Text
                    key={String(
                      index
                    )}
                    style={
                      styles.bulletText
                    }
                  >
                    •{" "}
                    {typeof exemple ===
                    "string"
                      ? exemple
                      : JSON.stringify(
                          exemple
                        )}
                  </Text>
                )
              )}
            </View>
          )}

          {decodables.length > 0 && (
            <View
              style={
                styles.decodableCard
              }
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                DÉCODABLES
              </Text>

              {decodables.map(
                (item, index) => (
                  <View
                    key={String(
                      index
                    )}
                    style={
                      styles.decodableItem
                    }
                  >
                    <Text
                      style={
                        styles.decodableText
                      }
                    >
                      {typeof item ===
                      "string"
                        ? item
                        : JSON.stringify(
                            item
                          )}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}

          {manipulations.length >
            0 && (
            <View
              style={styles.sectionCard}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                MANIPULATIONS
              </Text>

              {manipulations.map(
                (item, index) => (
                  <Text
                    key={String(
                      index
                    )}
                    style={
                      styles.bulletText
                    }
                  >
                    •{" "}
                    {typeof item ===
                    "string"
                      ? item
                      : JSON.stringify(
                          item
                        )}
                  </Text>
                )
              )}
            </View>
          )}

          {retenir ? (
            <View
              style={
                styles.retenirCard
              }
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                À RETENIR
              </Text>

              <Text
                style={
                  styles.retenirText
                }
              >
                {typeof retenir ===
                "string"
                  ? retenir
                  : JSON.stringify(
                      retenir
                    )}
              </Text>
            </View>
          ) : null}

          {corriges.length > 0 && (
            <View
              style={styles.sectionCard}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                CORRECTIONS
              </Text>

              {corriges.map(
                (item, index) => (
                  <Text
                    key={String(
                      index
                    )}
                    style={
                      styles.bulletText
                    }
                  >
                    •{" "}
                    {typeof item ===
                    "string"
                      ? item
                      : JSON.stringify(
                          item
                        )}
                  </Text>
                )
              )}
            </View>
          )}

          {estCP1 && (
            <>
              <TouchableOpacity
                style={
                  styles.activityButton
                }
                onPress={() =>
                  exercices.length >
                  0
                    ? setEcran(
                        "CP1_EXERCICES"
                      )
                    : Alert.alert(
                        "Exercices",
                        "Aucun exercice n'est disponible pour cette leçon."
                      )
                }
              >
                <Text
                  style={
                    styles.activityIcon
                  }
                >
                  ✏️
                </Text>

                <View
                  style={
                    styles.activityInfo
                  }
                >
                  <Text
                    style={
                      styles.activityTitle
                    }
                  >
                    EXERCICES
                  </Text>

                  <Text
                    style={
                      styles.activityText
                    }
                  >
                    {exercices.length}{" "}
                    exercice(s)
                    disponible(s)
                  </Text>
                </View>

                <Text
                  style={styles.arrow}
                >
                  ›
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.activityButton
                }
                onPress={() =>
                  quiz.length > 0
                    ? reinitialiserQuiz()
                    : Alert.alert(
                        "Quiz",
                        "Aucun quiz n'est disponible pour cette leçon."
                      )
                }
              >
                <Text
                  style={
                    styles.activityIcon
                  }
                >
                  🧠
                </Text>

                <View
                  style={
                    styles.activityInfo
                  }
                >
                  <Text
                    style={
                      styles.activityTitle
                    }
                  >
                    QUIZ
                  </Text>

                  <Text
                    style={
                      styles.activityText
                    }
                  >
                    {quiz.length}{" "}
                    question(s)
                    disponible(s)
                  </Text>
                </View>

                <Text
                  style={styles.arrow}
                >
                  ›
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     EXERCICES CP1
     ======================================================= */

  if (
    ecran === "CP1_EXERCICES"
  ) {
    const lecon =
      getLeconCP1(
        chapitreSelectionne
      );

    const exercices =
      Array.isArray(
        lecon?.exercices
      )
        ? lecon.exercices
        : [];

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Exercices"
          onBack={() =>
            setEcran("LECON")
          }
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <Text
            style={styles.pageTitle}
          >
            Exercices
          </Text>

          <Text
            style={styles.pageSubtitle}
          >
            {lecon?.titre ||
              "Leçon CP1"}
          </Text>

          {exercices.length ===
          0 ? (
            <View
              style={styles.infoCard}
            >
              <Text
                style={styles.infoText}
              >
                Aucun exercice disponible.
              </Text>
            </View>
          ) : (
            exercices.map(
              (exercice, index) => (
                <View
                  key={
                    exercice?.id ||
                    String(index)
                  }
                  style={
                    styles.exerciseCard
                  }
                >
                  <Text
                    style={
                      styles.exerciseNumber
                    }
                  >
                    Exercice{" "}
                    {index + 1}
                  </Text>

                  {exercice?.difficulte ? (
                    <Text
                      style={
                        styles.difficulty
                      }
                    >
                      Niveau :{" "}
                      {
                        exercice.difficulte
                      }
                    </Text>
                  ) : null}

                  <Text
                    style={
                      styles.exerciseQuestion
                    }
                  >
                    {exercice?.question ||
                      exercice?.consigne ||
                      exercice?.texte ||
                      "Exercice"}
                  </Text>

                  {Array.isArray(
                    exercice?.options
                  ) &&
                    exercice.options.map(
                      (
                        option,
                        optionIndex
                      ) => (
                        <View
                          key={String(
                            optionIndex
                          )}
                          style={
                            styles.exerciseOption
                          }
                        >
                          <Text
                            style={
                              styles.optionText
                            }
                          >
                            {String(
                              option
                            )}
                          </Text>
                        </View>
                      )
                    )}

                  {exercice?.reponse !==
                    undefined && (
                    <View
                      style={
                        styles.answerBox
                      }
                    >
                      <Text
                        style={
                          styles.answerTitle
                        }
                      >
                        Correction
                      </Text>

                      <Text
                        style={
                          styles.answerText
                        }
                      >
                        {String(
                          exercice.reponse
                        )}
                      </Text>
                    </View>
                  )}
                </View>
              )
            )
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     QUIZ
     ======================================================= */

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
            onBack={
              estCP1
                ? () =>
                    setEcran(
                      "LECON"
                    )
                : retourAccueil
            }
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
                estCP1
                  ? () =>
                      setEcran(
                        "LECON"
                      )
                  : retourAccueil
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
            onBack={
              estCP1
                ? () =>
                    setEcran(
                      "LECON"
                    )
                : retourAccueil
            }
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
                RECOMMENCER
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.secondaryButton
              }
              onPress={
                estCP1
                  ? () =>
                      setEcran(
                        "LECON"
                      )
                  : retourAccueil
              }
            >
              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                RETOUR
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    const question =
      questionQuiz?.question ||
      questionQuiz?.texte ||
      questionQuiz?.consigne ||
      "Question";

    const options =
      Array.isArray(
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
          onBack={
            estCP1
              ? () =>
                  setEcran(
                    "LECON"
                  )
              : retourAccueil
          }
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <View
            style={
              styles.quizProgress
            }
          >
            <Text
              style={
                styles.quizProgressText
              }
            >
              Question{" "}
              {quizIndex + 1} sur{" "}
              {banqueQuiz.length}
            </Text>
          </View>

          <View
            style={styles.quizCard}
          >
            <Text
              style={
                styles.questionText
              }
            >
              {String(question)}
            </Text>

            {options.map(
              (option, index) => {
                let bonne = false;

                if (
                  option ===
                  questionQuiz?.reponse
                ) {
                  bonne = true;
                }

                if (
                  option ===
                  questionQuiz?.bonneReponse
                ) {
                  bonne = true;
                }

                if (
                  typeof questionQuiz?.bonneReponse ===
                    "number" &&
                  index ===
                    questionQuiz.bonneReponse
                ) {
                  bonne = true;
                }

                if (
                  typeof questionQuiz?.reponse ===
                    "number" &&
                  index ===
                    questionQuiz.reponse
                ) {
                  bonne = true;
                }

                return (
                  <TouchableOpacity
                    key={String(
                      index
                    )}
                    style={
                      styles.optionButton
                    }
                    onPress={() =>
                      repondreQuiz(
                        bonne
                      )
                    }
                    activeOpacity={0.8}
                  >
                    <Text
                      style={
                        styles.optionLetter
                      }
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                    </Text>

                    <Text
                      style={
                        styles.optionText
                      }
                    >
                      {String(
                        option
                      )}
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

  /* =======================================================
     CHAPITRES CM2
     ======================================================= */

  if (
    ecran === "CHAPITRES_CM2"
  ) {
    const chapitres =
      Array.isArray(
        CHAPITRES_CM2
      )
        ? CHAPITRES_CM2
        : [];

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />

        <Header
          title="Grammaire CM2"
          onBack={retourRubriques}
        />

        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          {chapitres.map(
            (chapitre, index) => (
              <TouchableOpacity
                key={
                  chapitre?.id ||
                  String(index)
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

  /* =======================================================
     ÉCRAN PAR DÉFAUT
     ======================================================= */

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

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 50,
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

  programCard: {
    backgroundColor: "#173B57",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  programBadge: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 7,
    letterSpacing: 1,
  },

  programTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },

  programText: {
    color: "#DCEAF4",
    fontSize: 15,
    lineHeight: 23,
  },

  progressionMini: {
    color: "#55738B",
    fontSize: 12,
    marginTop: 5,
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
    lineHeight: 20,
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
    lineHeight: 20,
  },

  codeText: {
    color: "#8A9AAA",
    fontSize: 11,
    marginTop: 5,
    fontWeight: "700",
  },

  codeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8EEF3",
    color: "#173B57",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 10,
  },

  lessonHeaderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  lessonMainTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 15,
  },

  objectiveBox: {
    backgroundColor: "#F4F7FB",
    borderRadius: 12,
    padding: 15,
  },

  objectiveTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 6,
  },

  objectiveText: {
    fontSize: 15,
    color: "#455765",
    lineHeight: 23,
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

  sectionCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 12,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitleInline: {
    fontSize: 18,
    fontWeight: "900",
    color: "#173B57",
  },

  countBadge: {
    backgroundColor: "#173B57",
    color: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontWeight: "900",
  },

  indexText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#455765",
    marginBottom: 7,
  },

  bulletText: {
    fontSize: 16,
    lineHeight: 25,
    color: "#455765",
    marginBottom: 7,
  },

  lessonContent: {
    fontSize: 16,
    lineHeight: 27,
    color: "#334955",
  },

  ruleCard: {
    backgroundColor: "#EAF1F6",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },

  ruleText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#173B57",
    fontWeight: "600",
  },

  retenirCard: {
    backgroundColor: "#F0F5F8",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },

  retenirText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#173B57",
    fontWeight: "700",
  },

  decodableCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  decodableItem: {
    backgroundColor: "#F4F7FB",
    borderRadius: 10,
    padding: 13,
    marginBottom: 8,
  },

  decodableText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#173B57",
  },

  evaluationButton: {
    backgroundColor: "#173B57",
    borderRadius: 16,
    padding: 18,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  evaluationIcon: {
    fontSize: 32,
    marginRight: 14,
  },

  evaluationInfo: {
    flex: 1,
  },

  evaluationTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },

  evaluationText: {
    color: "#DCEAF4",
    marginTop: 4,
  },

  evaluationMainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  evaluationBigIcon: {
    fontSize: 55,
    marginBottom: 10,
  },

  evaluationMainTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: "#173B57",
    textAlign: "center",
    marginBottom: 15,
  },

  evaluationMainText: {
    color: "#455765",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
  },

  activityButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  activityIcon: {
    fontSize: 31,
    marginRight: 14,
  },

  activityInfo: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#173B57",
  },

  activityText: {
    color: "#687887",
    marginTop: 4,
  },

  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  exerciseNumber: {
    fontSize: 17,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 5,
  },

  difficulty: {
    fontSize: 12,
    color: "#687887",
    marginBottom: 12,
    fontWeight: "700",
  },

  exerciseQuestion: {
    fontSize: 17,
    lineHeight: 25,
    color: "#334955",
    fontWeight: "700",
    marginBottom: 12,
  },

  exerciseOption: {
    backgroundColor: "#F4F7FB",
    padding: 13,
    borderRadius: 10,
    marginBottom: 8,
  },

  answerBox: {
    backgroundColor: "#EAF1F6",
    padding: 13,
    borderRadius: 10,
    marginTop: 8,
  },

  answerTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 5,
  },

  answerText: {
    color: "#334955",
    fontSize: 15,
    lineHeight: 22,
  },

  quizProgress: {
    backgroundColor: "#EAF1F6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  quizProgressText: {
    color: "#173B57",
    fontWeight: "800",
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
    flexDirection: "row",
    alignItems: "center",
  },

  optionLetter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#173B57",
    color: "#FFFFFF",
    textAlign: "center",
    paddingTop: 5,
    fontWeight: "900",
    marginRight: 10,
  },

  optionText: {
    flex: 1,
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
