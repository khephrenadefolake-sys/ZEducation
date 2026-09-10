import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function Header({ title, subtitle, backText = "Accueil", onBack, centerTitle = false }) {
  return <View>
    <TouchableOpacity style={styles.backButton} onPress={onBack}><Text style={styles.backText}>← {backText}</Text></TouchableOpacity>
    <Text style={[styles.title, centerTitle && styles.centeredTitle]}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>;
}
const styles = { backButton:{paddingVertical:8, marginBottom:15}, backText:{color:"#123C69",fontSize:16,fontWeight:"600"}, title:{fontSize:31,fontWeight:"900",color:"#123C69",marginBottom:10,textAlign:"center"}, centeredTitle:{textAlign:"center"}, subtitle:{color:"#687585",fontSize:15,marginBottom:22} };
