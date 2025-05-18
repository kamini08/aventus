import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useMesh } from '../context/MeshContext';
import MessageInput from '../components/MessageInput';

const MeshChatScreen = () => {
const { messages } = useMesh() || { messages: [] };

return (
<View style={styles.container}>
<FlatList
data={messages}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<View style={styles.message}>
<Text style={styles.sender}>{item.senderId}</Text>
<Text>{item.message}</Text>
</View>
)}
inverted
/>
<MessageInput />
</View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, padding: 12 },
message: {
backgroundColor: '#eee',
padding: 8,
borderRadius: 6,
marginVertical: 4,
},
sender: {
fontWeight: 'bold',
marginBottom: 2,
},
});

export default MeshChatScreen;