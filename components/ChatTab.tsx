import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useMesh } from '../context/MeshContext';
import MessageInput from '../components/MessageInput';
import { useMeshBluetooth } from '../network/MeshBluetooth';



export default function ChatTab() {
const { messages } = useMesh() || { messages: [] };
const { sendDistressMessage } = useMeshBluetooth();


sendDistressMessage("HELP, trapped near main road", 2, 3);

return (
<View style={styles.container}>
<FlatList
data={messages.slice().reverse()}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<View style={styles.message}>
<Text style={styles.sender}>{item.senderId}</Text>
<Text>{item.message}</Text>
</View>
)}
/>
<MessageInput />
</View>
);
}

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