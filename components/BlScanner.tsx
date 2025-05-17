// components/BluetoothScanner.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { Device } from "react-native-ble-plx";
import {
  startScanning,
  stopScanning,
  requestPermissions,
} from "../network/ble";

export default function BluetoothScanner() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleScan = () => {
    startScanning((device) => {
      setDevices((prev) => {
        const exists = prev.find((d) => d.id === device.id);
        if (!exists) return [...prev, device];
        return prev;
      });
    });
  };

  return (
    <View>
      <Button title="Scan Devices" onPress={handleScan} />
      <FlatList
        data={devices}
        style={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name || item.localName || "Unnamed"}</Text>
        )}
      />
      <Button title="Stop Scan" onPress={stopScanning} />
    </View>
  );
}
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
