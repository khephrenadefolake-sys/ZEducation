// =========================================================
// ZEGBE CLUB EDUCATION
// APPLICATION PRINCIPALE
// =========================================================

import React, { useState } from "react";

import AppNavigation from "./AppNavigation";

import { EXERCICES } from "../data/exercices";
import { QUIZ } from "../data/quiz";

// =========================================================
// APPLICATION
// =========================================================

export default function App() {
  // -------------------------------------------------------
  // ÉCRAN ACTUEL
  // -------------------------------------------------------

  const [ecran, setEcran] = useState("welcome");

  // -------------------------------------------------------
  // INFORMATIONS DE L'ÉLÈVE
  // -------------------------------------------------------

  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [niveau, setNiveau] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const [eleveConnecte, setEleveConnecte] = useState(null);

  // -------------------------------------------------------
  // DONNÉES SÉLECTIONNÉES
  // -------------------------------------------------------

  const [chapitreSelectionne, setChapitreSelectionne] =
    useState(null);

  const [leconSelectionnee, setLeconSelectionnee] =
    useState(null);

  // -------------------------------------------------------
  // RÉSULTATS
  // -------------------------------------------------------

  const [scoreExercice, setScoreExercice] = useState(0);
  const [scoreQuiz, setScoreQuiz] = useState(0);

  // =======================================================
  // NAVIGATION
  // =======================================================

  const allerAccueil = () => {
    setEcran("welcome");
  };

  const allerInscription = () => {
    setEcran("inscription");
  };

  const allerConnexion = () => {
    setEcran("connexion");
  };

  const allerMenu = () => {
    setEcran("menu");
  };

  const allerMatieres = () => {
    setEcran("matieres");
  };

  const allerFrancais = () => {
    setEcran("francais");
  };

  const allerGrammaire = () => {
    setEcran("grammaire");
  };

  const allerLecons = () => {
    setEcran("lecons");
  };

  const allerLecon = () => {
    setEcran("lecon");
  };

  const allerExercices = () => {
    setEcran("exercices");
  };

  const allerQuiz = () => {
    setEcran("quiz");
  };

  const allerProgression = () => {
    setEcran("progression");
  };

  // =======================================================
  // SÉLECTION D'UNE MATIÈRE
  // =======================================================

  const ouvrirMatiere = (matiere) => {
    if (!matiere) {
      return;
    }

    if (matiere.id === "francais") {
      allerFrancais();
      return;
    }

    // Les autres matières seront développées
    // progressivement dans les modules correspondants.
    allerMatieres();
  };

  // =======================================================
  // SÉLECTION D'UNE RUBRIQUE DE FRANÇAIS
  // =======================================================

  const ouvrirRubriqueFrancais = (rubrique) => {
    if (!rubrique) {
      return;
    }

    if (rubrique.id === "grammaire") {
      allerGrammaire();
      return;
    }

    // Les autres rubriques seront développées
    // progressivement.
    allerFrancais();
  };

  // =======================================================
  // SÉLECTION D'UN CHAPITRE
  // =======================================================

  const ouvrirChapitre = (chapitre) => {
    setChapitreSelectionne(chapitre);
    allerLecons();
  };

  // =======================================================
  // SÉLECTION D'UNE LEÇON
  // =======================================================

  const ouvrirLecon = (lecon) => {
    setLeconSelectionnee(lecon);
    allerLecon();
  };

  // =======================================================
  // CRÉATION DU COMPTE
  // =======================================================

  const creerCompte = (donnees) => {
    const informations =
      donnees && typeof donnees === "object"
        ? donnees
        : {};

    const nouvelEleve = {
      nom:
        informations.nom !== undefined
          ? informations.nom
          : nom,

      prenoms:
        informations.prenoms !== undefined
          ? informations.prenoms
          : prenoms,

      niveau:
        informations.niveau !== undefined
          ? informations.niveau
          : niveau,

      email:
        informations.email !== undefined
          ? informations.email
          : email,

      motDePasse:
        informations.motDePasse !== undefined
          ? informations.motDePasse
          : motDePasse,
    };

    if (
      !nouvelEleve.nom ||
      !nouvelEleve.prenoms ||
      !nouvelEleve.niveau ||
      !nouvelEleve.email ||
      !nouvelEleve.motDePasse
    ) {
      return;
    }

    setNom(nouvelEleve.nom);
    setPrenoms(nouvelEleve.prenoms);
    setNiveau(nouvelEleve.niveau);
    setEmail(nouvelEleve.email);
    setMotDePasse(nouvelEleve.motDePasse);

    setEleveConnecte(nouvelEleve);

    setEcran("menu");
  };

  // =======================================================
  // CONNEXION
  // =======================================================

  const seConnecter = (donnees) => {
    const informations =
      donnees && typeof donnees === "object"
        ? donnees
        : {};

    const emailConnexion =
      informations.email !== undefined
        ? informations.email
        : "";

    const motDePasseConnexion =
      informations.motDePasse !== undefined
        ? informations.motDePasse
        : "";

    if (!eleveConnecte) {
      return;
    }

    if (
      emailConnexion === eleveConnecte.email &&
      motDePasseConnexion === eleveConnecte.motDePasse
    ) {
      setEcran("menu");
    }
  };

  // =======================================================
  // DÉCONNEXION
  // =======================================================

  const seDeconnecter = () => {
    setEleveConnecte(null);
    setEcran("welcome");
  };

  // =======================================================
  // TOTAL DES EXERCICES ET QUIZ
  // =======================================================

  const totalExercices = Array.isArray(EXERCICES)
    ? EXERCICES.length
    : 0;

  const totalQuiz = Array.isArray(QUIZ)
    ? QUIZ.length
    : 0;

  // =======================================================
  // AFFICHAGE DE LA NAVIGATION
  // =======================================================

  return (
    <AppNavigation
      ecran={ecran}
      eleveConnecte={eleveConnecte}
      niveau={niveau}

      chapitreSelectionne={chapitreSelectionne}
      leconSelectionnee={leconSelectionnee}

      scoreExercice={scoreExercice}
      totalExercices={totalExercices}
      scoreQuiz={scoreQuiz}
      totalQuiz={totalQuiz}

      onInscription={allerInscription}
      onConnexion={allerConnexion}
      onAccueil={allerAccueil}

      onCreerCompte={creerCompte}
      onSeConnecter={seConnecter}

      onMatieres={allerMatieres}
      onExercices={allerExercices}
      onQuiz={allerQuiz}
      onProgression={allerProgression}
      onDeconnexion={seDeconnecter}

      onFrancais={allerFrancais}
      onRubrique={ouvrirRubriqueFrancais}
      onChapitre={ouvrirChapitre}
      onSelectionLecon={ouvrirLecon}

      onMatiere={ouvrirMatiere}
      onMenu={allerMenu}
      onGrammaire={allerGrammaire}
      onLecons={allerLecons}
      onLecon={allerLecon}
    />
  );
}