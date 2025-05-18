import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { MeshProvider } from "../context/MeshContext";
import MeshChatScreen from "./meshchatScreen";

const App = () => {
  return (
    <MeshProvider>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <MeshProvider>
          <MeshChatScreen />
        </MeshProvider>
      </SafeAreaView>
    </MeshProvider>
  );
};

export default App;
