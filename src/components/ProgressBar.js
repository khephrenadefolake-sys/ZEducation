import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({
  progress = 0,
}) {
  const valeur = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          { width: `${valeur}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 5,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#123C69",
    borderRadius: 5,
  },
});