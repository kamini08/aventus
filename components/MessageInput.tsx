import { View, Text, StyleSheet } from 'react-native';

export default function MapTab() {
return (
<View style={styles.container}>
<Text style={styles.text}>Map view for node locations (Coming soon)</Text>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
text: { fontSize: 16 },
});