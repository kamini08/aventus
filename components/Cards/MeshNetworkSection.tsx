import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const meshDevices = [
  {
    id: "1",
    name: "John (300m away)",
    status: "Connected",
    battery: 42,
    official: false,
    connected: true,
    isBeacon: false,
  },
  {
    id: "2",
    name: "Emergency Responder",
    status: "Connected",
    battery: 85,
    official: true,
    connected: true,
    isBeacon: false,
  },
  {
    id: "3",
    name: "Maria (1.2km away)",
    status: "Connected",
    battery: 23,
    official: false,
    connected: true,
    isBeacon: false,
  },
  {
    id: "4",
    name: "Local Shelter Beacon",
    status: "Connected",
    battery: 91,
    official: true,
    connected: true,
    isBeacon: true,
  },
  {
    id: "5",
    name: "Unknown Device",
    status: "Disconnected",
    battery: 11,
    official: false,
    connected: false,
    isBeacon: false,
  },
];

export function MeshNetworkSection() {
  return (
    <View style={styles.meshSection}>
      {/* Header */}
      <View style={styles.meshHeader}>
        <Ionicons
          name="people-outline"
          size={18}
          color="#a084fa"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.meshTitle}>Mesh Network</Text>
      </View>

      <View style={styles.meshCard}>
        {/* Top row: device count and broadcast button */}
        <View style={styles.meshTopRow}>
          <Text style={styles.meshCountText}>
            4 devices connected via mesh network
          </Text>
          <Pressable style={styles.broadcastBtn}>
            <Text style={styles.broadcastBtnText}>Broadcast Message</Text>
          </Pressable>
        </View>

        {/* Device list */}
        {meshDevices.map((device) => (
          <View
            key={device.id}
            style={[
              styles.deviceCard,
              device.official && styles.deviceCardOfficial,
              !device.connected && styles.deviceCardDisconnected,
            ]}
          >
            <View style={styles.deviceLeft}>
              <View
                style={[
                  styles.statusDot,
                  device.connected
                    ? { backgroundColor: "#4ade80" }
                    : { backgroundColor: "#f87171" },
                ]}
              />
              <MaterialIcons
                name={device.isBeacon ? "location-city" : "smartphone"}
                size={18}
                color="#b5bac8"
                style={{ marginLeft: 2, marginRight: 8 }}
              />
              <View style={styles.deviceNameRow}>
                <Text
                  style={[
                    styles.deviceName,
                    !device.connected && { color: "#f87171" },
                  ]}
                >
                  {device.name}
                </Text>
                {device.official && (
                  <View style={styles.officialBadge}>
                    <Text style={styles.officialBadgeText}>Official</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.deviceRight}>
              <Text
                style={[
                  styles.deviceStatus,
                  device.connected
                    ? { color: "#4ade80" }
                    : { color: "#f87171" },
                ]}
              >
                {device.status}
              </Text>
              <View
                style={[
                  styles.batteryBox,
                  !device.connected && { backgroundColor: "#f87171" },
                ]}
              >
                <FontAwesome
                  name="battery"
                  size={12}
                  color="#fff"
                  style={{ marginRight: 2 }}
                />
                <Text style={styles.batteryText}>{device.battery}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  meshSection: {
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  meshHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 2,
  },
  meshTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  meshCard: {
    backgroundColor: "#181f2a",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },
  meshTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  meshCountText: {
    color: "#b5bac8",
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },
  broadcastBtn: {
    backgroundColor: "#283c7a",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    minWidth: 120,
  },
  broadcastBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 0.2,
    textAlign: "center",
  },
  deviceCard: {
    backgroundColor: "#23273b",
    borderRadius: 10,
    padding: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  deviceCardOfficial: {
    backgroundColor: "#23294a",
    borderWidth: 1,
    borderColor: "#4263eb",
  },
  deviceCardDisconnected: {
    backgroundColor: "#2d1e1e",
  },
  deviceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  deviceNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    minWidth: 0,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 2,
  },
  deviceName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 8,
    flexShrink: 1,
    minWidth: 0,
  },
  officialBadge: {
    backgroundColor: "#4263eb",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 2,
    alignSelf: "center",
  },
  officialBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  deviceRight: {
    alignItems: "flex-end",
    minWidth: 56,
  },
  deviceStatus: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  batteryBox: {
    backgroundColor: "#23273b",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    minWidth: 42,
    justifyContent: "center",
  },
  batteryText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});
