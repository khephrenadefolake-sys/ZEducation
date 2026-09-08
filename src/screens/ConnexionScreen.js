import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ConnexionScreen({
  onConnexion,
  onInscription,
}) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const seConnecter = () => {
    if (onConnexion) {
      onConnexion({
        email: email.trim().toLowerCase(),
        motDePasse,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Se connecter</Text>

        <Text style={styles.subtitle}>
          ZEGBE CLUB EDUCATION
        </Text>

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Votre adresse email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mot de passe</Text>

        <TextInput
          style={styles.input}
          value={motDePasse}
          onChangeText={setMotDePasse}
          placeholder="Votre mot de passe"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={seConnecter}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            SE CONNECTER
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={onInscription}
        >
          <Text style={styles.linkText}>
            Pas encore de compte ? Créer un compte
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
    marginBottom: 30,
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
    marginBottom: 18,
  },

  primaryButton: {
    backgroundColor: "#123C69",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  linkButton: {
    alignItems: "center",
    marginTop: 22,
  },

  linkText: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});