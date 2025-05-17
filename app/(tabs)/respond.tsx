import { MeshNetworkSection } from "@/components/Cards/MeshNetworkSection";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FILTERS = [
  {
    key: "fire",
    label: "Fire",
    color: "#fa5252",
    icon: <MaterialIcons name="local-fire-department" size={16} color="#fff" />,
  },
  {
    key: "flood",
    label: "Flood",
    color: "#228be6",
    icon: <MaterialCommunityIcons name="water" size={16} color="#fff" />,
  },
  {
    key: "earthquake",
    label: "Earthquake",
    color: "#fab005",
    icon: <MaterialCommunityIcons name="vibrate" size={16} color="#fff" />,
  },
  {
    key: "medical",
    label: "Medical",
    color: "#be4bdb",
    icon: <MaterialCommunityIcons name="medical-bag" size={16} color="#fff" />,
  },
  {
    key: "safezone",
    label: "Safe Zone",
    color: "#40c057",
    icon: <MaterialIcons name="verified-user" size={16} color="#fff" />,
  },
];

const PRIORITY_OPTIONS = ["All", "Low", "Medium", "High"];

export default function SituationalAwarenessMap() {
  const [activeFilters, setActiveFilters] = useState([
    "fire",
    "flood",
    "earthquake",
    "medical",
    "safezone",
  ]);
  const [priority, setPriority] = useState("High");
  const [showPriorityModal, setShowPriorityModal] = useState(false);

  // Dummy alert summary data
  const alertSummary = [
    {
      icon: (
        <MaterialIcons name="local-fire-department" size={14} color="#fa5252" />
      ),
      label: "7 Fire-related",
    },
    {
      icon: <MaterialCommunityIcons name="water" size={14} color="#228be6" />,
      label: "4 Flooding",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="office-building"
          size={14}
          color="#fab005"
        />
      ),
      label: "9 Structural damage",
    },
    {
      icon: (
        <MaterialCommunityIcons name="medical-bag" size={14} color="#be4bdb" />
      ),
      label: "3 Medical emergencies",
    },
    {
      icon: <FontAwesome5 name="exclamation" size={13} color="#fff" />,
      label: "5 high priority alerts",
      color: "#fab005",
    },
  ];

  // Dummy markers for the map
  const markers = [
    { type: "team", label: "T2", number: 2, x: 18, y: 18, color: "#845ef7" },
    { type: "team", label: "T1", number: 1, x: 12, y: 60, color: "#4263eb" },
    { type: "flood", label: "4", x: 65, y: 40, color: "#228be6" },
    {
      type: "medical",
      label: "!",
      x: 40,
      y: 65,
      color: "#be4bdb",
      isAlert: true,
    },
    { type: "safezone", label: "3", x: 70, y: 70, color: "#40c057" },
    { type: "earthquake", label: "9", x: 55, y: 85, color: "#fab005" },
  ];

  // Legend
  const legend = [
    { label: "Fire", color: "#fa5252" },
    { label: "Flood", color: "#228be6" },
    { label: "Teams", color: "#845ef7" },
  ];

  const handleFilter = (key: any) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const resetFilters = () => {
    setActiveFilters(["fire", "flood", "earthquake", "medical", "safezone"]);
    setPriority("High");
  };

  const handlePrioritySelect = (selectedPriority: any) => {
    setPriority(selectedPriority);
    setShowPriorityModal(false);
  };

  return (
    <View style={styles.root}>
      {/* Top Navigation Bar */}
      <View style={styles.tabBar}>
        <TabIcon
          icon={<MaterialIcons name="map" size={18} color="#ffd43b" />}
          label="Map View"
          active
        />
        <TabIcon
          icon={
            <MaterialCommunityIcons name="alert" size={18} color="#b0b8c1" />
          }
          label="Alerts"
        />
        <TabIcon
          icon={
            <MaterialCommunityIcons name="database" size={18} color="#b0b8c1" />
          }
          label="Resources"
        />
        <TabIcon
          icon={<Ionicons name="people" size={18} color="#b0b8c1" />}
          label="Teams"
        />
        <View style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={20} color="#ffd43b" />
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}>
        {FILTERS.map((f) => (
          <Pressable
            key={f.key}
            style={[
              styles.filterChip,
              {
                backgroundColor: activeFilters.includes(f.key)
                  ? f.color
                  : "#232b39",
              },
            ]}
            onPress={() => handleFilter(f.key)}>
            {f.icon}
            <Text style={styles.filterChipText}>{f.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Priority Dropdown and Reset */}
      <View style={styles.priorityRow}>
        <Text style={styles.priorityLabel}>Priority:</Text>
        <TouchableOpacity
          style={styles.pickerBox}
          onPress={() => setShowPriorityModal(true)}>
          <Text style={styles.pickerText}>{priority}</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="#ffd43b" />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetFilters}>
          <Text style={styles.resetText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Priority Selection Modal */}
      <Modal
        visible={showPriorityModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPriorityModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPriorityModal(false)}>
          <View style={styles.modalContent}>
            {PRIORITY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.modalOption,
                  priority === opt && styles.modalOptionSelected,
                ]}
                onPress={() => handlePrioritySelect(opt)}>
                <Text
                  style={[
                    styles.modalOptionText,
                    priority === opt && styles.modalOptionTextSelected,
                  ]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>
            Situational{"\n"}Awareness Map
          </Text>
          <Text style={styles.lastSync}>Last sync: 30 minutes ago</Text>
          <View style={styles.activeAlertsBox}>
            <Text style={styles.activeAlertsText}>23 Active{"\n"}Alerts</Text>
          </View>
        </View>

        {/* Map Card */}
        <View style={styles.mapCard}>
          {/* Decorative grid background */}
          <View style={styles.mapGrid} pointerEvents="none">
            {[...Array(8)].map((_, i) => (
              <View
                key={`h${i}`}
                style={[styles.mapGridLine, { top: `${(i + 1) * 10}%` }]}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <View
                key={`v${i}`}
                style={[styles.mapGridLineVert, { left: `${(i + 1) * 10}%` }]}
              />
            ))}
          </View>

          {/* Alert Summary */}
          <View style={styles.alertSummaryBox}>
            <Text style={styles.teamTagT2}>T2</Text>
            <View style={styles.alertSummaryInner}>
              <Text style={styles.alertSummaryTitle}>Alert Summary</Text>
              {alertSummary.map((item, i) => (
                <View key={i} style={styles.alertSummaryRow}>
                  {item.icon}
                  <Text
                    style={[
                      styles.alertSummaryText,
                      item.color && { color: item.color },
                    ]}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.teamTagT1}>T1</Text>
            <View style={styles.highPriorityBox}>
              <FontAwesome5 name="exclamation" size={12} color="#fff" />
              <Text style={styles.highPriorityText}>
                5 high priority alerts
              </Text>
            </View>
          </View>

          {/* Map Markers */}
          {markers.map((marker, i) => (
            <View
              key={i}
              style={[
                styles.marker,
                {
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  backgroundColor: marker.color,
                  borderColor: marker.type === "team" ? "#fff" : marker.color,
                },
                marker.isAlert && styles.alertMarker,
              ]}>
              {marker.type === "team" ? (
                <Ionicons
                  name="people"
                  size={18}
                  color="#fff"
                  style={{ marginBottom: 2 }}
                />
              ) : marker.type === "fire" ? (
                <MaterialIcons
                  name="local-fire-department"
                  size={18}
                  color="#fff"
                />
              ) : marker.type === "flood" ? (
                <MaterialCommunityIcons name="water" size={18} color="#fff" />
              ) : marker.type === "earthquake" ? (
                <MaterialCommunityIcons name="vibrate" size={18} color="#fff" />
              ) : marker.type === "medical" ? (
                <MaterialCommunityIcons
                  name="medical-bag"
                  size={18}
                  color="#fff"
                />
              ) : marker.type === "safezone" ? (
                <MaterialIcons name="verified-user" size={18} color="#fff" />
              ) : null}
              <Text style={styles.markerLabel}>{marker.label}</Text>
            </View>
          ))}

          {/* Map Controls */}
          <View style={styles.mapControlPlus}>
            <FontAwesome name="plus" size={20} color="#ffd43b" />
          </View>
          <View style={styles.mapControlMinus}>
            <FontAwesome name="minus" size={20} color="#ffd43b" />
          </View>

          {/* Legend */}
          <View style={styles.legendRow}>
            {legend.map((l, i) => (
              <View key={i} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: l.color }]}
                />
                <Text style={styles.legendLabel}>{l.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <MeshNetworkSection />
      </ScrollView>
    </View>
  );
}

function TabIcon({ icon, label, active = false }: any) {
  return (
    <View style={styles.tabIcon}>
      {icon}
      <Text
        style={[
          styles.tabLabel,
          active && { color: "#ffd43b", fontWeight: "bold" },
        ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#181f2a",
    paddingTop: 12,
    paddingHorizontal: 0,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232b39",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    marginBottom: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tabIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  tabLabel: {
    color: "#b0b8c1",
    fontSize: 14,
    marginLeft: 4,
  },
  filterBtn: {
    backgroundColor: "#343a40",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterRow: {
    flexGrow: 0,
    flexShrink: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 8,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterChipText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 12,
    gap: 10,
  },
  priorityLabel: {
    color: "#b0b8c1",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  pickerBox: {
    backgroundColor: "#232b39",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 8,
    minWidth: 100,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#343a40",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pickerText: {
    color: "#ffd43b",
    fontSize: 14,
    fontWeight: "600",
  },
  resetText: {
    color: "#5c7cfa",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 13,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#232b39",
    borderRadius: 12,
    padding: 20,
    minWidth: 200,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#343a40",
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 4,
  },
  modalOptionSelected: {
    backgroundColor: "#ffd43b",
  },
  modalOptionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  modalOptionTextSelected: {
    color: "#232b39",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    flex: 1,
    lineHeight: 20,
  },
  lastSync: {
    color: "#adb5bd",
    fontSize: 12,
    marginLeft: 8,
    marginTop: 4,
    width: 100,
  },
  activeAlertsBox: {
    backgroundColor: "#fab005",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeAlertsText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 16,
  },
  mapCard: {
    backgroundColor: "#232b39",
    borderRadius: 20,
    padding: 0,
    margin: 12,
    marginTop: 0,
    minHeight: 400,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#343a40",
    justifyContent: "flex-end",
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  mapGridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#32394a",
    opacity: 0.18,
  },
  mapGridLineVert: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#32394a",
    opacity: 0.18,
  },
  alertSummaryBox: {
    position: "absolute",
    top: 20,
    left: 14,
    backgroundColor: "#232b39",
    borderRadius: 14,
    padding: 12,
    zIndex: 10,
    width: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#343a40",
  },
  alertSummaryInner: {
    marginLeft: 0,
    marginBottom: 8,
    backgroundColor: "#1a202c",
    padding: 10,
    borderRadius: 10,
  },
  alertSummaryTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 8,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#343a40",
    paddingBottom: 6,
  },
  alertSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
    paddingVertical: 2,
  },
  alertSummaryText: {
    color: "#dee2e6",
    fontSize: 13,
    marginLeft: 6,
    flex: 1,
  },
  teamTagT2: {
    position: "absolute",
    top: -18,
    left: -14,
    backgroundColor: "#845ef7",
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    zIndex: 11,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#7048e8",
  },
  teamTagT1: {
    position: "absolute",
    bottom: -18,
    left: -14,
    backgroundColor: "#4263eb",
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    zIndex: 11,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#364fc7",
  },
  highPriorityBox: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#fab005",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    zIndex: 12,
  },
  highPriorityText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 3,
  },
  marker: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    zIndex: 2,
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowRadius: 4,
    elevation: 3,
  },
  markerLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  alertMarker: {
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#be4bdb",
  },
  mapControlPlus: {
    position: "absolute",
    right: 18,
    bottom: 70,
    backgroundColor: "#232b39",
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    borderWidth: 1,
    borderColor: "#343a40",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mapControlMinus: {
    position: "absolute",
    right: 18,
    bottom: 24,
    backgroundColor: "#232b39",
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    borderWidth: 1,
    borderColor: "#343a40",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 4,
    gap: 16,
    marginLeft: 16,
    zIndex: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 7,
    borderWidth: 2,
    borderColor: "#181f2a",
  },
  legendLabel: {
    color: "#dee2e6",
    fontSize: 14,
    fontWeight: "bold",
  },
});
