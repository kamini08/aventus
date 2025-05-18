import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  // Optionally auto-redirect to User Dashboard
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/needHelp");
    }, 3000); 
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Silent Signals
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Stay safe, stay connected
      </Text>
      <Button
        mode="contained"
        onPress={() => router.push("./home")}
        style={styles.button}
      >
        Get Started
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
    fontFamily: "SpaceMono",
  },
  title: {
    color: "#6200EE",
    marginBottom: 10,
    fontFamily: "SpaceMono",
  },
  subtitle: {
    color: "#000",
    marginBottom: 20,
    fontFamily: "SpaceMono",
  },
  button: {
    backgroundColor: "#6200EE",
  },
});

export default WelcomeScreen;
