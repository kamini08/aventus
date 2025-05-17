import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const resources = [
  {
    icon: <FontAwesome5 name="tint" size={22} color="#3bc9db" />,
    label: "Water",
  },
  {
    icon: <MaterialIcons name="local-hospital" size={22} color="#fa5252" />,
    label: "Hospital",
  },
  {
    icon: <Entypo name="location-pin" size={22} color="#ffd43b" />,
    label: "You are here",
  },
  {
    icon: <Ionicons name="cube" size={22} color="#38d9a9" />,
    label: "Supplies",
  },
  {
    icon: <FontAwesome5 name="home" size={22} color="#228be6" />,
    label: "Shelter",
  },
];

const checklistData = [
  "Find shelter away from windows and exterior walls",
  "Gather emergency supplies (water, food, medication)",
  "Check on family members and neighbors if safe",
  "Turn off gas, water, and electricity if instructed",
  "Move to higher ground if flooding is possible",
];

export default function ResourcesAndChecklist() {
  const [checked, setChecked] = useState(
    Array(checklistData.length).fill(false)
  );

  const toggleCheck = (idx: number) => {
    const updated = [...checked];
    updated[idx] = !updated[idx];
    setChecked(updated);
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <View style={styles.container}>
      {/* Nearby Resources */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="map"
            size={18}
            color="#228be6"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.sectionTitle}>Nearby Resources</Text>
        </View>
        <View style={styles.mapCard}>
          <Text style={styles.mapText}>🗺️ No map data available</Text>
          <View style={styles.resourceRow}>
            {resources.map((res, i) => (
              <View key={i} style={styles.resourceIcon}>
                {res.icon}
                <Text style={styles.resourceLabel}>{res.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.mapButtons}>
            <Pressable style={styles.mapBtn}>
              <FontAwesome name="plus" size={18} color="#adb5bd" />
            </Pressable>
            <Pressable style={styles.mapBtn}>
              <FontAwesome name="minus" size={18} color="#adb5bd" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Safety Checklist */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Entypo
            name="location-pin"
            size={18}
            color="#51cf66"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.sectionTitle}>Safety Checklist</Text>
        </View>
        <View style={styles.checklistCard}>
          {checklistData.map((item, idx) => (
            <Pressable
              key={idx}
              style={styles.checklistItem}
              onPress={() => toggleCheck(idx)}
            >
              <View style={styles.circle}>
                {checked[idx] && <View style={styles.checkedDot} />}
              </View>
              <Text style={styles.checklistText}>{item}</Text>
            </Pressable>
          ))}
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              Complete {completedCount} of {checklistData.length} safety tasks
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(completedCount / checklistData.length) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 8,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 2,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  mapCard: {
    backgroundColor: "#32394a",
    borderRadius: 14,
    padding: 18,
    marginBottom: 8,
    alignItems: "center",
  },
  mapText: {
    color: "#adb5bd",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  resourceRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
    gap: 12,
  },
  resourceIcon: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  resourceLabel: {
    color: "#dee2e6",
    fontSize: 11,
    marginTop: 2,
  },
  mapButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  mapBtn: {
    backgroundColor: "#232b39",
    borderRadius: 16,
    padding: 6,
    marginHorizontal: 6,
  },
  checklistCard: {
    backgroundColor: "#32394a",
    borderRadius: 14,
    padding: 16,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#adb5bd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#232b39",
  },
  checkedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#51cf66",
  },
  checklistText: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
    flexWrap: "wrap",
  },
  progressRow: {
    marginTop: 8,
    marginBottom: 4,
  },
  progressText: {
    color: "#adb5bd",
    fontSize: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#232b39",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#51cf66",
    borderRadius: 8,
  },
});
