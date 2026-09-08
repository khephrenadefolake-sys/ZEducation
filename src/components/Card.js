import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function Card({
  icon,
  title,
  description,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      {onPress ? (
        <Text style={styles.chevron}>›</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  icon: {
    fontSize: 30,
    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  title: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
  },

  description: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
  },

  chevron: {
    fontSize: 30,
    color: "#94A3B8",
    marginLeft: 8,
  },
});