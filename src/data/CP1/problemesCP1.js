// =========================================================
// ZEGBE CLUB EDUCATION
// CP1 - RÉSOLUTION DE PROBLÈMES
// PNAPAS - CÔTE D'IVOIRE
// =========================================================

export const PROBLEMES_CP1 = {
  niveau: "CP1",
  domaine: "Mathématiques",
  unite: "UF2",

  objectifs: [
    "Comprendre une situation mathématique simple.",
    "Identifier les informations utiles.",
    "Chercher une solution par la manipulation ou le raisonnement.",
    "Représenter une situation.",
    "Effectuer un calcul simple.",
    "Communiquer et vérifier une réponse."
  ],

  types: [
    {
      id: "probleme_01",
      titre: "Problèmes d'ajout",
      objectif:
        "Comprendre une situation dans laquelle une quantité augmente.",
      exemple:
        "Awa a 3 mangues. Sa maman lui donne 2 mangues. Combien de mangues Awa a-t-elle maintenant ?",
      demarche: [
        "Identifier la quantité de départ.",
        "Identifier ce qui est ajouté.",
        "Représenter la situation.",
        "Effectuer l'addition.",
        "Donner la réponse."
      ]
    },

    {
      id: "probleme_02",
      titre: "Problèmes de retrait",
      objectif:
        "Comprendre une situation dans laquelle une quantité diminue.",
      exemple:
        "Koffi a 7 billes. Il donne 2 billes à son ami. Combien lui reste-t-il de billes ?",
      demarche: [
        "Identifier la quantité de départ.",
        "Identifier ce qui est retiré.",
        "Représenter la situation.",
        "Effectuer la soustraction.",
        "Donner la réponse."
      ]
    },

    {
      id: "probleme_03",
      titre: "Problèmes de comparaison",
      objectif:
        "Comparer deux quantités dans une situation concrète.",
      activites: [
        "Identifier la plus grande quantité.",
        "Identifier la plus petite quantité.",
        "Déterminer qui a le plus.",
        "Déterminer qui a le moins.",
        "Déterminer s'il y a autant."
      ]
    },

    {
      id: "probleme_04",
      titre: "Problèmes de partage",
      objectif:
        "Découvrir des situations simples de partage et de répartition.",
      activites: [
        "Partager des objets.",
        "Distribuer équitablement une collection.",
        "Comparer les parts obtenues.",
        "Vérifier que chaque personne reçoit la même quantité."
      ]
    },

    {
      id: "probleme_05",
      titre: "Problèmes de recherche",
      objectif:
        "Développer le raisonnement à partir d'une situation simple.",
      activites: [
        "Observer la situation.",
        "Chercher ce qui est demandé.",
        "Manipuler si nécessaire.",
        "Faire un dessin ou un schéma.",
        "Proposer une réponse.",
        "Vérifier la réponse."
      ]
    }
  ],

  demarche_generale: [
    {
      etape: 1,
      nom: "Comprendre",
      description: "Lire ou écouter la situation et identifier ce qui est demandé."
    },
    {
      etape: 2,
      nom: "Chercher",
      description: "Utiliser la manipulation, le dessin ou une autre représentation."
    },
    {
      etape: 3,
      nom: "Calculer",
      description: "Effectuer le calcul nécessaire lorsque la situation le demande."
    },
    {
      etape: 4,
      nom: "Répondre",
      description: "Formuler une réponse adaptée à la question."
    },
    {
      etape: 5,
      nom: "Vérifier",
      description: "Contrôler si la réponse correspond à la situation."
    }
  ],

  evaluation: {
    criteres: [
      "L'élève comprend la situation.",
      "L'élève identifie ce qui est demandé.",
      "L'élève choisit une stratégie adaptée.",
      "L'élève effectue correctement le calcul nécessaire.",
      "L'élève formule une réponse.",
      "L'élève vérifie sa réponse."
    ]
  }
};