import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, Searchbar } from "react-native-paper";

const UserDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [alertSent, setAlertSent] = useState(false);

  function sendAlert(e: any): void {
    throw new Error("Function not implemented.");
  }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerText}>
          Silent Signals
        </Text>
        <Text style={styles.status}>
          Status: {alertSent ? "Alert Sent" : "OK"}
        </Text>
      </View>

      {/* Emergency Panel */}
      <Card style={styles.card}>
        <Card.Title title="Emergency Panel" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={sendAlert}
            style={styles.alertButton}
            disabled={alertSent}>
            Send Alert
          </Button>
          <Text>Gesture Detection: {alertSent ? "Active" : "Inactive"}</Text>
          <Searchbar
            placeholder="Voice/Text Command"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchbar}
          />
        </Card.Content>
      </Card>

      {/* Survival Tips */}
      <Card style={styles.card}>
        <Card.Title title="Survival Tips" />
        <Card.Content>
          <Text>Earthquake, Flood, Fire guides (TBD)</Text>
        </Card.Content>
      </Card>

      {/* Resource Directory */}
      <Card style={styles.card}>
        <Card.Title title="Resource Directory" />
        <Card.Content>
          <Text>Hospitals, Shelters, Supplies (TBD)</Text>
        </Card.Content>
      </Card>

      {/* Mesh Network Status */}
      <Card style={styles.card}>
        <Card.Title title="Mesh Network Status" />
        <Card.Content>
          <Text>Connected Devices: 0 | Status: Offline</Text>
          <Button
            mode="contained"
            onPress={() => router.push("../(tabs)/respond")}
            style={styles.button}>
            Get Started
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 10,
    backgroundColor: "#F5F5F5",
    fontFamily: "SpaceMono",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "#6200EE",
    fontFamily: "SpaceMono",
  },

  button: {
    backgroundColor: "#6200EE",
  },
  status: {
    fontSize: 16,
    fontFamily: "SpaceMono",
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
  },
  alertButton: {
    marginBottom: 10,
    backgroundColor: "#D32F2F",
  },
  searchbar: {
    marginTop: 10,
  },
});

export default UserDashboard;
