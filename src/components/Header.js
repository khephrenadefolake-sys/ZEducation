import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function Header({ title, subtitle, backText = "Accueil", onBack }) {
  return <View>
    <TouchableOpacity style={styles.backButton} onPress={onBack}><Text style={styles.backText}>← {backText}</Text></TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>;
}
const styles = { backButton:{paddingVertical:8, marginBottom:15}, backText:{color:"#123C69",fontSize:16,fontWeight:"600"}, title:{fontSize:27,fontWeight:"bold",color:"#123C69",marginBottom:6}, subtitle:{color:"#687585",fontSize:15,marginBottom:22} };
