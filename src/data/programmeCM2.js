export const CHAPITRES_CM2 = [
  ["LA PHRASE", ["Les types de phrases", "Les formes de phrases", "La phrase simple", "La phrase complexe", "Les constituants de la phrase", "Le groupe nominal", "Le groupe verbal"]],
  ["LE GROUPE NOMINAL", ["Le nom", "Les différents types de déterminants", "Les pronoms", "L'adjectif qualificatif", "Les fonctions de l'adjectif qualificatif", "Le complément du nom", "L'expansion du nom"]],
  ["LE GROUPE VERBAL ET LES COMPLÉMENTS", ["Le verbe et le groupe verbal", "Le complément d'objet direct (COD)", "Le complément d'objet indirect (COI)", "Le complément d'objet second (COS)", "Les compléments circonstanciels", "Identifier et analyser les compléments dans la phrase"]],
  ["LES PRONOMS", ["Les différents types de pronoms", "Les pronoms personnels", "Les pronoms relatifs", "Le rôle et la fonction des pronoms", "Remplacer un groupe nominal par un pronom"]],
  ["LES PROPOSITIONS", ["La proposition", "La proposition indépendante", "L'analyse de la proposition indépendante", "Les propositions coordonnées", "Les propositions juxtaposées", "Les propositions subordonnées", "Les conjonctions de subordination"]],
  ["LES PROPOSITIONS SUBORDONNÉES RELATIVES", ["La proposition subordonnée relative", "Les pronoms relatifs", "Identifier une proposition subordonnée relative", "Le rôle de la proposition subordonnée relative", "L'analyse d'une proposition subordonnée relative", "Exercices d'analyse de propositions relatives"]],
  ["LES PROPOSITIONS SUBORDONNÉES COMPLÉTIVES", ["La proposition subordonnée complétive", "Identifier une proposition subordonnée complétive", "Les conjonctions de subordination utilisées dans les complétives", "La fonction de la proposition subordonnée complétive", "L'analyse d'une proposition subordonnée complétive", "Exercices d'analyse de propositions complétives"]],
  ["LES PROPOSITIONS SUBORDONNÉES CIRCONSTANCIELLES", ["Les propositions subordonnées circonstancielles", "Les différentes circonstances exprimées", "Les conjonctions et locutions conjonctives de subordination", "Identifier une proposition subordonnée circonstancielle", "Analyser une proposition subordonnée circonstancielle"]],
  ["LE DISCOURS", ["Le discours direct", "Le discours indirect", "Les caractéristiques du discours direct", "Les caractéristiques du discours indirect", "Transformer le discours direct en discours indirect", "Transformer le discours indirect en discours direct", "Les changements de pronoms, de temps et de repères"]],
  ["LA VOIX DU VERBE", ["La voix active", "La voix passive", "Reconnaître la voix active et la voix passive", "Transformer une phrase active en phrase passive", "Transformer une phrase passive en phrase active", "Identifier le complément d'agent"]],
  ["ANALYSE GRAMMATICALE ET LOGIQUE", ["Analyse grammaticale des mots", "Nature et fonction des mots", "Analyse du groupe nominal", "Analyse du groupe verbal", "Analyse des compléments", "Analyse de la proposition indépendante", "Analyse de la proposition subordonnée relative", "Analyse de la proposition subordonnée complétive", "Analyse des propositions subordonnées circonstancielles", "Analyse complète d'une phrase complexe"]],
].map(([titre, lecons], i) => ({ id: i + 1, titre: `CHAPITRE ${i + 1} — ${titre}`, lecons }));

export const LECONS_CM2 = CHAPITRES_CM2.flatMap(ch => ch.lecons.map(titre => ({ numero: 0, titre, chapitre: ch.titre }))).map((l, i) => ({ ...l, numero: i + 1 }));

export const PROGRAMMES_GRAMMAIRE = {
  CP1: ["La phrase", "Les mots", "Les voyelles", "Les consonnes"],
  CP2: ["La phrase simple", "Le nom", "Le verbe", "Le déterminant"],
  CE1: ["La phrase", "Les types de phrases", "Le nom", "Le verbe", "Le sujet", "Le groupe nominal"],
  CE2: ["La phrase affirmative", "La phrase négative", "Le nom", "Le déterminant", "L'adjectif qualificatif", "Le COD"],
  CM1: ["Nature et fonction", "Le groupe nominal étendu", "Les compléments circonstanciels", "Les propositions indépendantes", "Le sujet et le prédicat"],
};
