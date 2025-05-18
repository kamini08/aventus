
import { StyleSheet, View } from "react-native";
import { MeshProvider } from "../../context/MeshContext";

import ChatTab from "@/components/ChatTab";

export default function Chat() {
  return (
    <View style={styles.container}>
      <MeshProvider>
        <ChatTab />
      </MeshProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  message: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 2,
  },
});
