import { Device } from "react-native-ble-plx";

export interface MeshMessage {
    id: string;
    senderId: string;
    timestamp: number;
    message: string;
    location: {
      lat: number;
      lng: number;
    };
    ttl: number;
  }
