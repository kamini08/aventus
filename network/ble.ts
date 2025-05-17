import { BleManager, Device, Characteristic } from "react-native-ble-plx";
import { Buffer } from "buffer";
import { PermissionsAndroid, Platform } from "react-native";

export const manager = new BleManager();

export async function requestPermissions() {
  if (Platform.OS === "android") {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
  }
}

export function startScan(onDeviceFound: (device: Device) => void) {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.log("Scan Error", error);
      return;
    }

    if (device?.name?.includes("DisasterComm")) {
      console.log("Found Device", device.name);
      onDeviceFound(device);
    }
  });
}

export function stopScan() {
  manager.stopDeviceScan();
}

export async function connectToDevice(device: Device) {
  await device.connect();
  await device.discoverAllServicesAndCharacteristics();
  return device;
}

export async function sendMessage(
  device: Device,
  serviceUUID: string,
  characteristicUUID: string,
  message: string
) {
  const base64Msg = Buffer.from(message).toString("base64");
  await device.writeCharacteristicWithResponseForService(
    serviceUUID,
    characteristicUUID,
    base64Msg
  );
}

export function subscribeToMessages(
  device: Device,
  serviceUUID: string,
  characteristicUUID: string,
  callback: (msg: string) => void
) {
  device.monitorCharacteristicForService(
    serviceUUID,
    characteristicUUID,
    (error, characteristic) => {
      if (error) {
        console.log("Monitor Error", error);
        return;
      }

      if (characteristic?.value) {
        const message = Buffer.from(characteristic.value, "base64").toString();
        callback(message);
      }
    }
  );
}
export function disconnectDevice(device: Device) {
  device.cancelConnection();
  manager.destroy();
}