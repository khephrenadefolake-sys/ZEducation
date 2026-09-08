import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { NIVEAUX } from "../data/niveaux";

export default function InscriptionScreen({ onInscription, onConnexion }) {
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [niveau, setNiveau] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [niveauOuvert, setNiveauOuvert] = useState(false);

  const creerCompte = () => {
    const compte = {
      nom: nom.trim(),
      prenoms: prenoms.trim(),
      niveau,
      email: email.trim().toLowerCase(),
      confirmationEmail: confirmationEmail.trim().toLowerCase(),
      motDePasse,
      confirmationMotDePasse,
    };

    if (onInscription) {
      onInscription(compte);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Créer un compte</Text>

        <Text style={styles.subtitle}>
          ZEGBE CLUB EDUCATION
        </Text>

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Votre nom"
        />

        <Text style={styles.label}>Prénoms</Text>
        <TextInput
          style={styles.input}
          value={prenoms}
          onChangeText={setPrenoms}
          placeholder="Vos prénoms"
        />

        <Text style={styles.label}>Niveau</Text>

        <TouchableOpacity
          style={styles.select}
          onPress={() => setNiveauOuvert(!niveauOuvert)}
        >
          <Text
            style={
              niveau
                ? styles.selectText
                : styles.placeholder
            }
          >
            {niveau || "Choisir le niveau"}
          </Text>

          <Text style={styles.arrow}>
            {niveauOuvert ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {niveauOuvert && (
          <View style={styles.dropdown}>
            {NIVEAUX.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setNiveau(item);
                  setNiveauOuvert(false);
                }}
              >
                <Text style={styles.dropdownText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="exemple@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Confirmation de l'email
        </Text>
        <TextInput
          style={styles.input}
          value={confirmationEmail}
          onChangeText={setConfirmationEmail}
          placeholder="Confirmer l'email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          value={motDePasse}
          onChangeText={setMotDePasse}
          placeholder="Au moins 6 caractères"
          secureTextEntry
        />

        <Text style={styles.label}>
          Confirmation du mot de passe
        </Text>
        <TextInput
          style={styles.input}
          value={confirmationMotDePasse}
          onChangeText={setConfirmationMotDePasse}
          placeholder="Confirmer le mot de passe"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={creerCompte}
        >
          <Text style={styles.primaryButtonText}>
            CRÉER UN COMPTE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={onConnexion}
        >
          <Text style={styles.linkText}>
            Déjà un compte ? Se connecter
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
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#123C69",
    marginBottom: 6,
  },

  subtitle: {
    color: "#64748B",
    fontSize: 15,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DEE8",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 13,
  },

  select: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DEE8",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectText: {
    color: "#1F2937",
    fontSize: 16,
  },

  placeholder: {
    color: "#9AA4B2",
    fontSize: 16,
  },

  arrow: {
    color: "#123C69",
    fontWeight: "bold",
  },

  dropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DEE8",
    borderRadius: 12,
    marginBottom: 13,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F5",
  },

  dropdownText: {
    fontSize: 16,
    color: "#1F2937",
  },

  primaryButton: {
    backgroundColor: "#123C69",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  linkButton: {
    alignItems: "center",
    marginTop: 20,
  },

  linkText: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "600",
  },
});