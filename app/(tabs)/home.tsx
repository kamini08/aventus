import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home: React.FC = () => {

  const router = useRouter();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={26} color="#e74c3c" />
        <Text style={styles.headerText}>Silent Signals</Text>
      </View>

      <Text style={styles.title}>Emergency{"\n"}Response Platform</Text>
      <Text style={styles.subtitle}>
        Lifesaving guidance that works without internet. Designed for emergency
        situations with offline AI assistance, mesh networking, and real-time
        coordination.
      </Text>/(tabs)

      <TouchableOpacity
        style={[styles.card, styles.helpCard]}
        onPress={() => router.replace("../needHelp")}>
        <View style={styles.iconCircleBlue}>
          <Ionicons name="shield-outline" size={32} color="#fff" />
        </View>
        <Text style={styles.cardTitle}>I Need Help</Text>
        <Text style={styles.cardDesc}>
          Access emergency guides, send distress signals, and find safety
          resources
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.responderCard]}
        onPress={() => router.replace("./map")}>
        <View style={styles.iconCircleOrange}>
          <MaterialCommunityIcons
            name="account-cog-outline"
            size={32}
            color="#fff"
          />
        </View>
        <Text style={styles.cardTitle}>I&apos;m a Responder</Text>
        <Text style={styles.cardDesc}>
          Coordinate rescue efforts, view alerts, and manage resources
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#232b39",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 8,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 24,
  },
  subtitle: {
    color: "#b0b8c1",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  card: {
    width: "100%",
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 22,
    elevation: 3,
  },
  helpCard: {
    backgroundColor: "#4263eb",
  },
  responderCard: {
    backgroundColor: "#b87b2b",
  },
  iconCircleBlue: {
    backgroundColor: "#364fc7",
    borderRadius: 32,
    padding: 12,
    marginBottom: 10,
  },
  iconCircleOrange: {
    backgroundColor: "#7c4d12",
    borderRadius: 32,
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  cardDesc: {
    color: "#e0e7ef",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default Home;