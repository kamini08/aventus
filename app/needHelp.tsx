import { MeshNetworkSection } from "@/components/Cards/MeshNetworkSection";
import ResourcesAndChecklist from "@/components/Cards/ResourcesAndChecklist";
import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmergencyAssistanceScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Emergency Assistance Title */}
          <Text style={styles.heading}>Emergency Assistance</Text>
          <Text style={styles.subheading}>
            Select the type of emergency you&apos;re facing to get relevant
            guidance
          </Text>

          {/* Emergency Types */}
          <View style={styles.grid}>
            <TouchableOpacity style={styles.emergencyBtn}>
              <MaterialIcons
                name="local-fire-department"
                size={28}
                color="#fff"
              />
              <Text style={styles.emergencyText}>Fire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyBtn}>
              <MaterialCommunityIcons name="water" size={28} color="#fff" />
              <Text style={styles.emergencyText}>Flood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyBtn}>
              <MaterialCommunityIcons name="vibrate" size={28} color="#fff" />
              <Text style={styles.emergencyText}>Earthquake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyBtn}>
              <MaterialCommunityIcons
                name="medical-bag"
                size={28}
                color="#fff"
              />
              <Text style={styles.emergencyText}>Medical</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyBtn}>
              <Entypo name="dots-three-horizontal" size={28} color="#fff" />
              <Text style={styles.emergencyText}>Other</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="alert"
                size={16}
                color="#ffd43b"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
            <View style={styles.grid}>
              <TouchableOpacity
                style={[styles.quickBtn, { backgroundColor: "#e8590c" }]}>
                <MaterialCommunityIcons
                  name="alarm-light"
                  size={26}
                  color="#fff"
                />
                <Text style={styles.quickText}>SOS Signal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickBtn, { backgroundColor: "#f08c00" }]}>
                <MaterialCommunityIcons
                  name="gesture-tap"
                  size={26}
                  color="#fff"
                />
                <Text style={styles.quickText}>Gesture Mode</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickBtn, { backgroundColor: "#37b24d" }]}>
                <Entypo name="location-pin" size={26} color="#fff" />
                <Text style={styles.quickText}>Safe Zones</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickBtn, { backgroundColor: "#4263eb" }]}>
                <Ionicons name="shield-checkmark" size={26} color="#fff" />
                <Text style={styles.quickText}>Protocols</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickBtn, { backgroundColor: "#ae3ec9" }]}>
                <Feather name="phone" size={26} color="#fff" />
                <Text style={styles.quickText}>Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickBtn, { backgroundColor: "#868e96" }]}>
                <Feather name="share-2" size={26} color="#fff" />
                <Text style={styles.quickText}>Share Location</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* First Aid Guides */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FontAwesome5
                name="first-aid"
                size={16}
                color="#e03131"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.sectionTitle}>First Aid Guides</Text>
            </View>
            <View style={styles.grid}>
              <TouchableOpacity style={styles.firstAidBtn}>
                <Text style={styles.firstAidTitle}>Cpr</Text>
                <Text style={styles.firstAidDesc}>Tap for instructions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstAidBtn}>
                <Text style={styles.firstAidTitle}>Bleeding</Text>
                <Text style={styles.firstAidDesc}>Tap for instructions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstAidBtn}>
                <Text style={styles.firstAidTitle}>Burns</Text>
                <Text style={styles.firstAidDesc}>Tap for instructions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.firstAidBtn}>
                <Text style={styles.firstAidTitle}>Fracture</Text>
                <Text style={styles.firstAidDesc}>Tap for instructions</Text>
              </TouchableOpacity>
            </View>
            <ResourcesAndChecklist />
            <MeshNetworkSection />
          </View>
        </ScrollView>

        {/* Sticky Distress Button */}
        <TouchableOpacity style={styles.distressBtn}>
          <MaterialCommunityIcons
            name="alert-octagram"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.distressText}>SEND DISTRESS SIGNAL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#181F2A",
  },
  root: {
    flex: 1,
    backgroundColor: "#181F2A",
    justifyContent: "flex-start",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90, // space for sticky button
  },
  heading: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 4,
  },
  subheading: {
    color: "#b0b8c1",
    fontSize: 14,
    marginBottom: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 18,
  },
  emergencyBtn: {
    backgroundColor: "#232b39",
    borderRadius: 12,
    width: "30%",
    minWidth: 100,
    minHeight: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    paddingVertical: 10,
  },
  emergencyText: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 6,
    fontSize: 15,
  },
  section: {
    marginBottom: 16,
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
  quickBtn: {
    borderRadius: 12,
    width: "30%",
    minWidth: 100,
    minHeight: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    paddingVertical: 10,
  },
  quickText: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
  },
  firstAidBtn: {
    backgroundColor: "#232b39",
    borderRadius: 12,
    width: "47%",
    minWidth: 120,
    minHeight: 60,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 12,
    padding: 12,
  },
  firstAidTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
  },
  firstAidDesc: {
    color: "#b0b8c1",
    fontSize: 13,
  },
  distressBtn: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#e03131",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    zIndex: 10,
  },
  distressText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
