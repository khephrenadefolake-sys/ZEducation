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
   MATIÃˆRES ET RUBRIQUES
   ========================================================= */

import {
  MATIERES_CP,
  MATIERES_CP1,
  MATIERES_CP2,
  MATIERES_CE_CM,

  RUBRIQUES_CP,
  RUBRIQUES_FRANCAIS_CP1,
  RUBRIQUES_FRANCAIS_CP2,
  RUBRIQUES_MATHEMATIQUES_CP1,
  RUBRIQUES_MATHEMATIQUES_CP2,
  LECONS_GRAMMAIRE_CM2,
  LECONS_ORTHOGRAPHE_CM2,
  LECONS_VOCABULAIRE_CM2,
  LECONS_EXPRESSION_ECRITE_CM2,
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
   DONNÃ‰ES GÃ‰NÃ‰RALES
   ========================================================= */

import { QUIZ } from "./src/data/quiz";
import { EXERCICES } from "./src/data/exercices";
import { obtenirContenu } from "./src/data/lecons";

const NOTIONS_IMPORTANTES = /(forme affirmative|forme négative|phrase déclarative|phrase interrogative|phrase exclamative|phrase impérative|phrase injonctive|phrase simple|phrase complexe|type de phrase|mots de négation|ne\.\.\. pas|ne\.\.\. plus|ne\.\.\. jamais|ne\.\.\. rien|ne\.\.\. personne|ne\.\.\. ni\.\.\. ni|à l'impératif|verbe conjugué|proposition|groupe nominal|groupe verbal|complément du nom|complément d'objet direct|complément d'objet indirect|complément d'objet second|compléments circonstanciels|COD|COI|COS|pronom personnel|pronom relatif|voix active|voix passive|complément d'agent|discours direct|discours indirect|analyse grammaticale|dictionnaire|ordre alphabétique|sens propre|sens figuré|synonyme|antonyme|homonyme|famille de mots|radical|préfixe|suffixe|mot générique|mot particulier|niveau de langue|locution|expression)/gi;

function TexteAvecNotions({ children, style }) {
  const texte = Array.isArray(children)
    ? children.join("")
    : String(children ?? "");
  const morceaux = texte.split(NOTIONS_IMPORTANTES);

  return (
    <Text style={style}>
      {morceaux.map((morceau, index) =>
        index % 2 === 1 ? (
          <Text key={`${morceau}-${index}`} style={styles.notionImportant}>
            {morceau}
          </Text>
        ) : (
          morceau
        )
      )}
    </Text>
  );
}
/* =========================================================
   DONNÃ‰ES CP1 PNAPAS
   ========================================================= */

/*
 * Import global volontairement utilisÃ© ici.
 *
 * Cela permet Ã  App.js d'accÃ©der aux donnÃ©es CP1 mÃªme si
 * certaines exportations auxiliaires ne sont pas prÃ©sentes
 * dans src/data/CP1/index.js.
 *
 * Les donnÃ©es CP1 disponibles sont recherchÃ©es de maniÃ¨re
 * sÃ©curisÃ©e dans l'objet CP1_DATA.
 */
import * as CP1_DATA from "./src/data/CP1";

/* =========================================================
   SÃ‰CURISATION DES RUBRIQUES CP1
   ========================================================= */

/*
 * FranÃ§ais CP1 :
 * PrÃ©-lecture
 * Lecture-Ã©criture
 * ComprÃ©hension
 * Expression orale
 * Exercices
 * Ã‰valuation
 */
const rubriquesFrancaisCP1 =
  Array.isArray(RUBRIQUES_FRANCAIS_CP1)
    ? RUBRIQUES_FRANCAIS_CP1
    : Array.isArray(CP1_DATA.RUBRIQUES_FRANCAIS_CP1)
      ? CP1_DATA.RUBRIQUES_FRANCAIS_CP1
      : [];

/*
 * MathÃ©matiques CP1 :
 * Nombres
 * Calcul
 * GÃ©omÃ©trie
 * ProblÃ¨mes
 */
const rubriquesMathsCP1 = Array.isArray(RUBRIQUES_MATHEMATIQUES_CP1)
  ? RUBRIQUES_MATHEMATIQUES_CP1
  : Array.isArray(CP1_DATA.RUBRIQUES_MATHEMATIQUES_CP1)
  ? CP1_DATA.RUBRIQUES_MATHEMATIQUES_CP1
  : [];

/* =========================================================
   DONNÃ‰ES COMPLÃˆTES CP1
   ========================================================= */

/*
 * On rÃ©cupÃ¨re l'objet CP1 exportÃ© par src/data/CP1/index.js
 * lorsqu'il existe.
 */
const donneesCP1 =
  CP1_DATA.CP1 &&
  typeof CP1_DATA.CP1 === "object"
    ? CP1_DATA.CP1
    : {};

/* =========================================================
   FONCTION DE RECHERCHE D'UNE LEÃ‡ON CP1
   ========================================================= */

/*
 * Recherche rÃ©cursive d'une leÃ§on dans les diffÃ©rentes
 * structures de donnÃ©es CP1.
 *
 * La recherche accepte aussi bien :
 *   - id
 *   - code
 *
 * Cela rend App.js compatible avec les diffÃ©rents fichiers
 * pÃ©dagogiques CP1.
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
   RÃ‰CUPÃ‰RATION SÃ‰CURISÃ‰E D'UNE LEÃ‡ON CP1
   ========================================================= */

const getLeconCP1 = (lecon) => {
  if (!lecon) {
    return null;
  }

  const identifiant =
    lecon?.code || lecon?.id;

  /*
   * Si l'objet reÃ§u contient dÃ©jÃ  le contenu complet,
   * on le conserve.
   */
  if (!identifiant) {
    return lecon;
  }

  /* ---------------------------------------------
     1. Fonction officielle Ã©ventuelle
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
     2. Recherche dans les donnÃ©es CP1
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
   * on retourne la leÃ§on reÃ§ue.
   */
  return lecon;
};
/* =========================================================
   APPLICATION
   ========================================================= */

export default function App() {
  /* =======================================================
     Ã‰TATS
     ======================================================= */

  const [ecran, setEcran] = useState("WELCOME");

  const [eleve, setEleve] = useState(null);

  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const [motDePasse, setMotDePasse] = useState("");
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [notificationsAcceptees, setNotificationsAcceptees] =
    useState(false);

  const [emailConnexion, setEmailConnexion] = useState("");
  const [motDePasseConnexion, setMotDePasseConnexion] =
    useState("");

  const [emailParent, setEmailParent] = useState("");
  const [niveauParent, setNiveauParent] = useState("");
  const [niveauParentOuvert, setNiveauParentOuvert] = useState(false);

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
  const [dernierScoreQuiz, setDernierScoreQuiz] = useState(0);
  const [dernierTotalQuiz, setDernierTotalQuiz] = useState(0);

  /* =======================================================
     DONNÃ‰ES CP1 SÃ‰CURISÃ‰ES
     ======================================================= */

  const rubriquesFrancaisCP1 =
    Array.isArray(RUBRIQUES_FRANCAIS_CP1)
      ? RUBRIQUES_FRANCAIS_CP1
      : Array.isArray(CP1_DATA.RUBRIQUES_FRANCAIS_CP1)
      ? CP1_DATA.RUBRIQUES_FRANCAIS_CP1
      : [];

  const rubriquesMathsCP1 =
    Array.isArray(RUBRIQUES_MATHEMATIQUES_CP1)
      ? RUBRIQUES_MATHEMATIQUES_CP1
      : Array.isArray(CP1_DATA.RUBRIQUES_MATHS_CP1)
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
    eleve?.niveau || niveauSelectionne || ""
  )
    .toUpperCase()
    .replace(/\s+/g, "");

  const estCP1 = niveauNormalise === "CP1";

  const estCP =
    niveauNormalise === "CP1" ||
    niveauNormalise === "CP2" ||
    niveauNormalise.startsWith("CP");

  /* =======================================================
     MATIÃˆRES
     ======================================================= */

   const matieresDeBase = estCP1
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

  const matieres = estCP
    ? [
        ...matieresDeBase,
        {
          id: "exercices",
          nom: "Exercices",
          icon: "✏️",
          description: "Entraînez-vous avec des activités adaptées.",
        },
        {
          id: "quiz",
          nom: "Quiz",
          icon: "🧠",
          description: "Testez vos connaissances.",
        },
        {
          id: "notes",
          nom: "Notes",
          icon: "📊",
          description: "Consultez vos résultats et votre progression.",
        },
      ]
    : matieresDeBase;

  /* =======================================================
     RUBRIQUES FRANÃ‡AIS
     ======================================================= */

  const rubriquesFrancais = estCP1
    ? rubriquesFrancaisCP1
    : estCP
    ? Array.isArray(RUBRIQUES_FRANCAIS_CP2)
      ? RUBRIQUES_FRANCAIS_CP2
      : []
    : Array.isArray(RUBRIQUES_CE_CM)
    ? niveauNormalise === "CM2"
      ? RUBRIQUES_CE_CM
          .filter(
            (rubrique) =>
              !["lecture", "ecriture"].includes(rubrique?.id)
          )
          .map((rubrique) => {
            if (rubrique.id === "grammaire") {
              return {
                ...rubrique,
                lecons: LECONS_GRAMMAIRE_CM2.map((titre, index) => ({
                  id: `grammaire_cm2_${index + 1}`,
                  titre,
                })),
              };
            }

            if (rubrique.id === "orthographe") {
              return {
                ...rubrique,
                lecons: LECONS_ORTHOGRAPHE_CM2.map((titre, index) => ({
                  id: `orthographe_cm2_${index + 1}`,
                  titre,
                })),
              };
            }

            if (rubrique.id === "vocabulaire") {
              return {
                ...rubrique,
                lecons: LECONS_VOCABULAIRE_CM2.map((titre, index) => ({
                  id: `vocabulaire_cm2_${index + 1}`,
                  titre,
                })),
              };
            }

            if (rubrique.id === "expression") {
              return {
                ...rubrique,
                lecons: LECONS_EXPRESSION_ECRITE_CM2.map((titre, index) => ({
                  id: `expression_ecrite_cm2_${index + 1}`,
                  titre,
                })),
              };
            }

            return rubrique;
          })
      : RUBRIQUES_CE_CM
    : [];

  /* =======================================================
     RUBRIQUES MATHÃ‰MATIQUES
     ======================================================= */

  const rubriquesMaths = estCP1
    ? rubriquesMathsCP1
    : estCP
    ? Array.isArray(RUBRIQUES_MATHEMATIQUES_CP2)
      ? RUBRIQUES_MATHEMATIQUES_CP2
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
      id === "franÃ§ais"
    );
  };

  const estMatiereMaths = (matiere) => {
    const id = String(
      matiere?.id || ""
    ).toLowerCase();

    return (
      id === "maths" ||
      id === "mathematiques" ||
      id === "mathÃ©matiques"
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
     RECHERCHE RÃ‰CURSIVE D'UNE LEÃ‡ON CP1
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
     RECHERCHE D'UNE LEÃ‡ON CP1
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
     LEÃ‡ONS D'UNE RUBRIQUE
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

    if (!nomPropre || !prenomsPropres) {
      Alert.alert(
        "Champs incomplets",
        "Veuillez renseigner le nom et les prénoms."
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

    const nouvelEleve = {
      nom: nomPropre,
      prenoms: prenomsPropres,
      niveau: null,
      email: emailPropre,
      motDePasse,
    };

    setEleve(nouvelEleve);
    setNiveauSelectionne(null);

    setEmailConnexion(emailPropre);
    setMotDePasseConnexion("");

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

  const connecterParent = () => {
    const emailSaisi = emailParent.trim().toLowerCase();
    const niveauSaisi = niveauParent.trim().toUpperCase().replace(/\s+/g, "");
    const niveauEnfant = String(eleve?.niveau || "")
      .toUpperCase()
      .replace(/\s+/g, "");

    if (!emailSaisi || !niveauSaisi) {
      Alert.alert(
        "Accès parent",
        "Veuillez renseigner l'email et le niveau de votre enfant."
      );
      return;
    }

    if (!eleve) {
      Alert.alert(
        "Compte introuvable",
        "L'enfant doit d'abord créer son compte."
      );
      return;
    }

    const niveauCorrespond =
      !niveauEnfant || niveauSaisi === niveauEnfant;

    if (emailSaisi !== eleve.email || !niveauCorrespond) {
      Alert.alert(
        "Accès refusé",
        "L'email ou le niveau ne correspond pas au compte de l'enfant."
      );
      return;
    }

    if (!niveauEnfant) {
      const eleveAvecNiveau = {
        ...eleve,
        niveau: niveauSaisi,
      };
      setEleve(eleveAvecNiveau);
      setNiveauSelectionne(niveauSaisi);
    }

    setMatiereSelectionnee(null);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);
    setEcran("PARENT_PROGRESS");
  };

  const quitterAccesParent = () => {
    setEmailParent("");
    setNiveauParent("");
    setNiveauParentOuvert(false);
    setEcran("LOGIN");
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

  const choisirNiveauAccueil = (niveauChoisi) => {
    setEleve((eleveActuel) =>
      eleveActuel
        ? { ...eleveActuel, niveau: niveauChoisi }
        : eleveActuel
    );
    setNiveauSelectionne(niveauChoisi);
    setMatiereSelectionnee(null);
    setRubriqueSelectionnee(null);
    setChapitreSelectionne(null);
    setEcran("MATIERES");
  };

  const deconnecter = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vous déconnecter de votre compte ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: () => {
            setMatiereSelectionnee(null);
            setRubriqueSelectionnee(null);
            setChapitreSelectionne(null);
            setNiveauSelectionne(null);
            setMotDePasseConnexion("");
            setEcran("LOGIN");
          },
        },
      ]
    );
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
     OUVRIR UNE MATIÃˆRE
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

    if (matiere?.id === "exercices") {
      setEcran("EXERCICES_GENERAL");
      return;
    }

    if (matiere?.id === "quiz") {
      reinitialiserQuiz();
      return;
    }

    if (matiere?.id === "notes") {
      setEcran("NOTES");
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
     OUVRIR UNE LEÃ‡ON
     ======================================================= */

  const ouvrirLecon = (lecon) => {
    const leconComplete =
      estCP1
        ? getLeconCP1(lecon)
        : {
            ...lecon,
            ...obtenirContenu(lecon),
          };

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
      const scoreFinal = score + (bonneReponse ? 1 : 0);

      setDernierScoreQuiz(scoreFinal);
      setDernierTotalQuiz(banqueQuiz.length);
      setQuizTermine(true);
    } else {
      setQuizIndex(
        (ancienIndex) =>
          ancienIndex + 1
      );
    }
  };

  /* =======================================================
     PROTECTION DES Ã‰CRANS
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
            ZEGBE EDUCATION CLUB
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

          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mot de passe"
              placeholderTextColor="#999"
              value={motDePasse}
              onChangeText={setMotDePasse}
              secureTextEntry={!motDePasseVisible}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setMotDePasseVisible((visible) => !visible)}
              accessibilityRole="button"
              accessibilityLabel={
                motDePasseVisible
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              <Text style={styles.passwordToggleText}>
                {motDePasseVisible ? "Masquer" : "Afficher"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.notificationConsent}
            onPress={() =>
              setNotificationsAcceptees((acceptees) => !acceptees)
            }
            accessibilityRole="checkbox"
            accessibilityState={{ checked: notificationsAcceptees }}
          >
            <View
              style={[
                styles.checkbox,
                notificationsAcceptees && styles.checkboxChecked,
              ]}
            >
              {notificationsAcceptees ? (
                <Text style={styles.checkboxMark}>✓</Text>
              ) : null}
            </View>
            <Text style={styles.notificationConsentText}>
              J'accepte de recevoir des notifications portant sur de nouveaux
              cours ou des défis
            </Text>
          </TouchableOpacity>

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
            ZEGBE EDUCATION CLUB
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

          <View style={styles.parentAccessBox}>
            <Text style={styles.parentAccessTitle}>
              Accès parent
            </Text>
            <Text style={styles.parentAccessText}>
              Consultez la progression de votre enfant avec son email et son niveau.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email de l'enfant"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={emailParent}
              onChangeText={setEmailParent}
            />
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() =>
                setNiveauParentOuvert((ouvert) => !ouvert)
              }
              accessibilityRole="button"
              accessibilityLabel="Sélectionner le niveau de l'enfant"
            >
              <Text
                style={
                  niveauParent
                    ? styles.selectText
                    : styles.placeholderText
                }
              >
                {niveauParent || "Sélectionner le niveau de l'enfant"}
              </Text>
              <Text style={styles.arrowText}>
                {niveauParentOuvert ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>

            {niveauParentOuvert && (
              <View style={styles.dropdown}>
                {NIVEAUX.map((niveauDisponible) => (
                  <TouchableOpacity
                    key={niveauDisponible}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setNiveauParent(niveauDisponible);
                      setNiveauParentOuvert(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>
                      {niveauDisponible}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={styles.parentButton}
              onPress={connecterParent}
              activeOpacity={0.8}
            >
              <Text style={styles.parentButtonText}>
                VOIR LA PROGRESSION
              </Text>
            </TouchableOpacity>
          </View>

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

  if (ecran === "PARENT_PROGRESS") {
    const totalQuiz = dernierTotalQuiz;
    const pourcentageQuiz = totalQuiz > 0
      ? Math.round((dernierScoreQuiz / totalQuiz) * 100)
      : 0;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <Header
            title="Progression de l'enfant"
            onBack={quitterAccesParent}
          />

          <View style={styles.parentHeroCard}>
            <Text style={styles.parentHeroIcon}>👨‍👩‍👧</Text>
            <Text style={styles.parentHeroTitle}>
              Suivi de {eleve?.prenoms || eleve?.nom || "votre enfant"}
            </Text>
            <Text style={styles.parentHeroSubtitle}>
              Niveau : {eleve?.niveau || niveauParent}
            </Text>
          </View>

          <View style={styles.progressSummaryCard}>
            <Text style={styles.progressSummaryTitle}>QUIZ</Text>
            <Text style={styles.progressScore}>
              {dernierScoreQuiz} / {totalQuiz}
            </Text>
            <Text style={styles.progressSummaryText}>
              {totalQuiz > 0
                ? `Dernier résultat : ${pourcentageQuiz}% de réussite.`
                : "Aucun quiz terminé pour le moment."}
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${pourcentageQuiz}%` },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressSummaryCard}>
            <Text style={styles.progressSummaryTitle}>PARCOURS</Text>
            <Text style={styles.progressSummaryText}>
              Le niveau de l'enfant est {eleve?.niveau || niveauParent}.
            </Text>
            <Text style={styles.progressSummaryText}>
              Les cours, exercices et quiz sont disponibles depuis son espace élève.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.parentLogoutButton}
            onPress={quitterAccesParent}
            activeOpacity={0.8}
          >
            <Text style={styles.parentLogoutText}>QUITTER L'ACCÈS PARENT</Text>
          </TouchableOpacity>
        </ScrollView>
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
          title="ZEGBE EDUCATION CLUB"
          onBack={null}
          centerTitle
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

          <Text style={styles.levelsTitle}>Choisissez votre niveau</Text>
          <Text style={styles.levelsSubtitle}>
            Sélectionnez une classe pour commencer votre parcours.
          </Text>

          <View style={styles.levelGrid}>
            {NIVEAUX.map((niveauDisponible, index) => (
              <TouchableOpacity
                key={niveauDisponible}
                style={[
                  styles.levelBubble,
                  styles[`levelBubble${index + 1}`],
                ]}
                onPress={() => choisirNiveauAccueil(niveauDisponible)}
                activeOpacity={0.82}
                accessibilityRole="button"
                accessibilityLabel={`Choisir le niveau ${niveauDisponible}`}
              >
                <Text style={styles.levelBubbleText}>
                  {niveauDisponible}
                </Text>
                <Text style={styles.levelBubbleCaption}>Explorer</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={deconnecter}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutIcon}>↪</Text>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (ecran === "EXERCICES_GENERAL") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <Header title="Exercices" onBack={retourAccueil} />
          <Text style={styles.pageTitle}>Exercices {niveauNormalise}</Text>
          <Text style={styles.pageSubtitle}>
            Entraînez-vous avec les activités disponibles.
          </Text>
          {EXERCICES.map((exercice, index) => (
            <View key={String(index)} style={styles.exerciseCard}>
              <Text style={styles.exerciseNumber}>Exercice {index + 1}</Text>
              <Text style={styles.exerciseQuestion}>
                {exercice.question}
              </Text>
              {Array.isArray(exercice.options) &&
                exercice.options.map((option, optionIndex) => (
                  <Text
                    key={String(optionIndex)}
                    style={styles.optionText}
                  >
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </Text>
                ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (ecran === "NOTES") {
    const totalNotes = dernierTotalQuiz;
    const pourcentageNotes = totalNotes > 0
      ? Math.round((dernierScoreQuiz / totalNotes) * 100)
      : 0;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <Header title="Notes" onBack={retourAccueil} />
          <View style={styles.notesHeroCard}>
            <Text style={styles.notesIcon}>📊</Text>
            <Text style={styles.notesTitle}>Mes résultats</Text>
            <Text style={styles.notesSubtitle}>Niveau {niveauNormalise}</Text>
          </View>
          <View style={styles.progressSummaryCard}>
            <Text style={styles.progressSummaryTitle}>DERNIER QUIZ</Text>
            <Text style={styles.progressScore}>
              {dernierScoreQuiz} / {totalNotes}
            </Text>
            <Text style={styles.progressSummaryText}>
              {totalNotes > 0
                ? `${pourcentageNotes}% de réussite`
                : "Aucune note enregistrée pour le moment."}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     MATIÃˆRES
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
          title="MATIERES"
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
                style={[
                  styles.matiereCard,
                  styles[`matiereCard${(index % 5) + 1}`],
                ]}
                onPress={() =>
                  ouvrirMatiere(
                    matiere
                  )
                }
              >
                <Text
                  style={
                    styles.matiereIcon
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
                      styles.matiereTitle
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
     FRANÃ‡AIS
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
                  style={[
                    styles.rubriqueCard,
                    styles[`rubriqueCard${(index % 6) + 1}`],
                  ]}
                  onPress={() =>
                    ouvrirRubrique(
                      rubrique
                    )
                  }
                >
                  <Text
                    style={
                      styles.rubriqueIcon
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
                        styles.rubriqueTitle
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
  }

  /* =======================================================
     MATHÃ‰MATIQUES
     ======================================================= */

  if (
    ecran === "MATHEMATIQUES"
  ) {
    const rubriquesAffichees = estCP
      ? rubriquesMaths
      : [];

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
                style={[
                  styles.rubriqueCard,
                  styles[`rubriqueCard${(index % 6) + 1}`],
                ]}
                onPress={() =>
                  ouvrirRubrique(
                    rubrique
                  )
                }
              >
                <Text
                  style={
                    styles.rubriqueIcon
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
                      styles.rubriqueTitle
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
     AUTRES MATIÃˆRES
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

    const contenusRubrique = getLeconsRubrique(rubrique);
    const contenus = contenusRubrique.length > 0
      ? contenusRubrique
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

          <Text style={styles.chaptersLessonsTitle}>
            CHAPITRES ET LEÇONS
          </Text>

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

                    {contenu?.contenu ? (
                      <Text style={styles.lessonBody}>
                        {contenu.contenu}
                      </Text>
                    ) : null}

                    {Array.isArray(contenu?.manipulations) &&
                      contenu.manipulations.map((activite, activiteIndex) => (
                        <Text
                          key={`activite-${activiteIndex}`}
                          style={styles.lessonActivity}
                        >
                          Activité : {String(activite)}
                        </Text>
                      ))}

                    {Array.isArray(contenu?.exercices) &&
                      contenu.exercices.map((exercice, exerciceIndex) => (
                        <Text
                          key={`exercice-${exerciceIndex}`}
                          style={styles.lessonExercise}
                        >
                          Exercice {exerciceIndex + 1} : {String(exercice)}
                        </Text>
                      ))}

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
     LEÃ‡ON
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

    const figures =
      Array.isArray(
        lecon?.figures
      )
        ? lecon.figures
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
              style={styles.courseCard}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                COURS
              </Text>

              <TexteAvecNotions
                style={styles.lessonContent}
              >
                {typeof explication ===
                "string"
                  ? explication
                  : JSON.stringify(
                      explication
                    )}
              </TexteAvecNotions>
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

              <TexteAvecNotions style={styles.ruleText}>
                {typeof regle ===
                "string"
                  ? regle
                  : JSON.stringify(
                      regle
                    )}
              </TexteAvecNotions>
            </View>
          ) : null}

          {exemples.length > 0 && (
            <View
              style={styles.exampleCard}
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
                  <TexteAvecNotions
                    key={String(index)}
                    style={styles.exampleText}
                  >
                    •{" "}
                    {typeof exemple ===
                    "string"
                      ? exemple
                      : JSON.stringify(
                          exemple
                        )}
                  </TexteAvecNotions>
                )
              )}
            </View>
          )}

          {figures.length > 0 && (
            <View style={styles.figureCard}>
              <Text style={styles.sectionTitle}>FIGURES</Text>
              {figures.map((figure, index) => (
                <Text
                  key={String(index)}
                  style={styles.figureText}
                >
                  {String(figure)}
                </Text>
              ))}
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
              style={styles.activityCard}
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
                    style={styles.activityDetailText}
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

              <TexteAvecNotions style={styles.retenirText}>
                {typeof retenir ===
                "string"
                  ? retenir
                  : JSON.stringify(
                      retenir
                    )}
              </TexteAvecNotions>
            </View>
          ) : null}

          {corriges.length > 0 && (
            <View
              style={styles.correctionCard}
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
                  <TexteAvecNotions
                    key={String(index)}
                    style={styles.correctionText}
                  >
                    •{" "}
                    {typeof item ===
                    "string"
                      ? item
                      : JSON.stringify(
                          item
                        )}
                  </TexteAvecNotions>
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
     Ã‰CRAN PAR DÃ‰FAUT
     ======================================================= */

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Header
        title="ZEGBE EDUCATION CLUB"
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
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 30,
    color: "#173B57",
    textTransform: "uppercase",
  },

  parentAccessBox: {
    backgroundColor: "#EEF5F8",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D7E6EC",
  },

  parentAccessTitle: {
    color: "#173B57",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  parentAccessText: {
    color: "#687887",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },

  parentButton: {
    backgroundColor: "#F2B84B",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 13,
  },

  parentButtonText: {
    color: "#173B57",
    fontSize: 14,
    fontWeight: "900",
  },

  parentHeroCard: {
    backgroundColor: "#173B57",
    borderRadius: 18,
    padding: 22,
    marginTop: 18,
    marginBottom: 16,
  },

  parentHeroIcon: {
    fontSize: 34,
    marginBottom: 8,
  },

  parentHeroTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  parentHeroSubtitle: {
    color: "#DCEAF4",
    fontSize: 16,
    marginTop: 8,
  },

  progressSummaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E8EF",
  },

  progressSummaryTitle: {
    color: "#687887",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  progressScore: {
    color: "#173B57",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 8,
  },

  progressSummaryText: {
    color: "#4B5F6D",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },

  progressTrack: {
    height: 12,
    backgroundColor: "#E5EBF1",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 16,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#F2B84B",
    borderRadius: 6,
  },

  parentLogoutButton: {
    borderWidth: 1,
    borderColor: "#D77A6B",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 8,
  },

  parentLogoutText: {
    color: "#B84C3D",
    fontSize: 14,
    fontWeight: "900",
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

  passwordInputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DCE4EC",
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#173B57",
  },

  passwordToggle: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  passwordToggleText: {
    color: "#173B57",
    fontSize: 14,
    fontWeight: "800",
  },

  notificationConsent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingVertical: 6,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#9AAAB5",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  checkboxChecked: {
    backgroundColor: "#173B57",
    borderColor: "#173B57",
  },

  checkboxMark: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },

  notificationConsentText: {
    flex: 1,
    color: "#4B5F6D",
    fontSize: 14,
    lineHeight: 20,
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
    fontSize: 27,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  welcomeSubtitle: {
    color: "#DCEAF4",
    fontSize: 15,
    marginTop: 7,
  },

  levelsTitle: {
    color: "#173B57",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 4,
    textTransform: "uppercase",
  },

  levelsSubtitle: {
    color: "#687887",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  levelGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  levelBubble: {
    width: "47.5%",
    height: 122,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#173B57",
    shadowOpacity: 0.14,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },

  levelBubble1: { backgroundColor: "#F4B6C2" },
  levelBubble2: { backgroundColor: "#F7D794" },
  levelBubble3: { backgroundColor: "#A8D8EA" },
  levelBubble4: { backgroundColor: "#B8E0D2" },
  levelBubble5: { backgroundColor: "#C7CEEA" },
  levelBubble6: { backgroundColor: "#F3C4FB" },

  levelBubbleText: {
    color: "#173B57",
    fontSize: 27,
    fontWeight: "900",
  },

  levelBubbleCaption: {
    color: "#315269",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
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
    fontSize: 20,
    fontWeight: "900",
    color: "#173B57",
    textTransform: "uppercase",
  },

  menuDescription: {
    color: "#687887",
    marginTop: 4,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D77A6B",
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 10,
  },

  logoutIcon: {
    color: "#B84C3D",
    fontSize: 22,
    fontWeight: "800",
    marginRight: 8,
  },

  logoutText: {
    color: "#B84C3D",
    fontSize: 16,
    fontWeight: "800",
  },

  arrow: {
    fontSize: 30,
    color: "#173B57",
    marginLeft: 8,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#173B57",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
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
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
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

  matiereCard: {
    borderRadius: 22,
    padding: 22,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(23,59,87,0.08)",
    elevation: 3,
  },

  matiereCard1: { backgroundColor: "#F4B6C2" },
  matiereCard2: { backgroundColor: "#A8D8EA" },
  matiereCard3: { backgroundColor: "#F7D794" },
  matiereCard4: { backgroundColor: "#B8E0D2" },
  matiereCard5: { backgroundColor: "#C7CEEA" },

  matiereIcon: {
    fontSize: 42,
    width: 64,
  },

  matiereTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: "#173B57",
    textTransform: "uppercase",
  },

  rubriqueCard: {
    borderRadius: 18,
    padding: 17,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(23,59,87,0.08)",
    elevation: 2,
  },

  rubriqueCard1: { backgroundColor: "#FCE1E6" },
  rubriqueCard2: { backgroundColor: "#D7EFF7" },
  rubriqueCard3: { backgroundColor: "#FFF0C9" },
  rubriqueCard4: { backgroundColor: "#DDF2E9" },
  rubriqueCard5: { backgroundColor: "#E2E5F5" },
  rubriqueCard6: { backgroundColor: "#F4DDF7" },

  rubriqueIcon: {
    fontSize: 34,
    width: 55,
  },

  rubriqueTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#173B57",
    textTransform: "uppercase",
  },

  subjectIcon: {
    fontSize: 34,
    width: 55,
  },

  subjectInfo: {
    flex: 1,
  },

  subjectTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#173B57",
    textTransform: "uppercase",
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
    fontSize: 21,
    fontWeight: "900",
    color: "#173B57",
    textTransform: "uppercase",
  },

  lessonDescription: {
    color: "#687887",
    marginTop: 4,
    lineHeight: 20,
  },

  lessonBody: {
    color: "#334955",
    fontSize: 14,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 4,
  },

  figureCard: {
    backgroundColor: "#EAF4F7",
    borderRadius: 16,
    padding: 24,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#CFE3EA",
  },

  figureText: {
    color: "#173B57",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  lessonActivity: {
    color: "#315269",
    fontSize: 14,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "700",
  },

  lessonExercise: {
    color: "#173B57",
    fontSize: 14,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 4,
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
    fontSize: 30,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 15,
    textAlign: "center",
    textTransform: "uppercase",
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

  courseCard: {
    backgroundColor: "#EAF4FF",
    padding: 24,
    borderRadius: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#C8E0F5",
  },

  exampleCard: {
    backgroundColor: "#FFF6D9",
    padding: 24,
    borderRadius: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#F1D98A",
  },

  exampleText: {
    color: "#6B4F12",
    backgroundColor: "#FFFDF3",
    borderRadius: 9,
    padding: 11,
    marginBottom: 12,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "800",
  },

  activityCard: {
    backgroundColor: "#E6F6ED",
    padding: 24,
    borderRadius: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#B8E5C9",
  },

  activityDetailText: {
    color: "#245D3A",
    fontSize: 15,
    lineHeight: 26,
    marginBottom: 12,
  },

  correctionCard: {
    backgroundColor: "#F1EAFE",
    padding: 24,
    borderRadius: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#D7C5F3",
  },

  correctionText: {
    color: "#51377A",
    fontSize: 15,
    lineHeight: 26,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#173B57",
    marginBottom: 12,
    textTransform: "uppercase",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitleInline: {
    fontSize: 21,
    fontWeight: "900",
    color: "#173B57",
    textTransform: "uppercase",
  },

  chaptersLessonsTitle: {
    color: "#B42318",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
    textTransform: "uppercase",
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
    lineHeight: 31,
    color: "#334955",
    letterSpacing: 0.2,
  },

  notionImportant: {
    color: "#C2410C",
    fontWeight: "900",
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
    fontSize: 20,
    fontWeight: "900",
    textTransform: "uppercase",
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
    fontSize: 29,
    fontWeight: "900",
    color: "#173B57",
    textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase",
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
    fontSize: 20,
    fontWeight: "900",
    color: "#173B57",
    textTransform: "uppercase",
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

  notesHeroCard: {
    backgroundColor: "#B8E0D2",
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
  },

  notesIcon: {
    fontSize: 34,
    marginBottom: 8,
  },

  notesTitle: {
    color: "#173B57",
    fontSize: 29,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  notesSubtitle: {
    color: "#315269",
    fontSize: 15,
    marginTop: 6,
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

