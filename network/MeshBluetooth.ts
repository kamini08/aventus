import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import { useMesh } from '../context/MeshContext';
import { MeshMessage } from '../lib/types/type';
import uuid from 'react-native-uuid';

global.Buffer = Buffer; // required for BLE data handling

export const SERVICE_UUID = '12345678-1234-5678-1234-56789abcdef0';
export const MESSAGE_CHAR_UUID = 'abcdef01-1234-5678-1234-56789abcdef0';

export function useMeshBluetooth() {
const managerRef = useRef(new BleManager());
const { addMessage, messages } = useMesh() || {
  addMessage: () => {},
  messages: [],
  deviceId: 'NODE_' + Math.random().toString(36).substring(2, 9),
};
const deviceId = 'NODE_' + Math.random().toString(36).substring(2, 9);
const deviceName = 'DISTRESS:' + deviceId;
const advertisedMessages = useRef<Set<string>>(new Set());

useEffect(() => {
const manager = managerRef.current;
const initBLE = async () => {
if (Platform.OS === 'android') {
await PermissionsAndroid.requestMultiple([
PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
]);
}

  startScan();
  startAdvertisingLoop();
};

initBLE();

return () => {
  manager?.destroy();
};

}, []);

const encodeMessage = (msg: MeshMessage) => {
return Buffer.from(JSON.stringify(msg)).toString('base64');
};

const decodeMessage = (data: string): MeshMessage | null => {
try {
return JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
} catch {
return null;
}
};

const startScan = () => {
managerRef.current.startDeviceScan(null, { allowDuplicates: true }, (error, device) => {
if (error || !device?.localName) return;

  const localName = device.localName;
  const prefix = 'DISTRESS:';
  if (localName.startsWith(prefix)) {
    const base64 = localName.substring(prefix.length);
    const decoded = decodeMessage(base64);
    if (decoded && !advertisedMessages.current.has(decoded.id)) {
      if (decoded.ttl > 0) {
        addMessage(decoded);
        advertisedMessages.current.add(decoded.id);
      }
    }
  }
});

};

const startAdvertisingLoop = () => {
setInterval(() => {
const latest = messages.slice(-3); 
for (const msg of latest) {
if (msg.ttl > 0) {
advertiseMessage(msg);
}
}
}, 4000); 
};

const advertiseMessage = (msg: MeshMessage) => {
const ttl = msg.ttl - 1;
if (ttl < 0) return;

const clonedMsg: MeshMessage = {
  ...msg,
  ttl,
};

const encoded = encodeMessage(clonedMsg);
if (Platform.OS === 'android') {
  // Note: This is a placeholder. You'll need to implement platform-specific advertising
  console.warn('BLE advertising needs to be implemented using platform-specific APIs');
}
};

const sendDistressMessage = (text: string, lat: number, lng: number) => {
const newMsg: MeshMessage = {
id: uuid.v4().toString(),
senderId: deviceId,
message: text,
timestamp: Date.now(),
ttl: 5,
location: { lat, lng },
};
addMessage(newMsg);
advertisedMessages.current.add(newMsg.id);
};

return {
sendDistressMessage,
};
}