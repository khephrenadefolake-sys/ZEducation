import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({
  title,
  onPress,
  secondary = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        secondary && styles.secondaryButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          secondary && styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#123C69",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#123C69",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  secondaryText: {
    color: "#123C69",
  },
});