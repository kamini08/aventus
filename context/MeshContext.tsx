import React, { createContext, useContext, useState } from 'react';
import { MeshMessage } from '../lib/types/type';

interface MeshContextType {
messages: MeshMessage[];
addMessage: (msg: MeshMessage) => void;
senderId: string;
}

const MeshContext = createContext<MeshContextType | undefined>(undefined);

export const MeshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [messages, setMessages] = useState<MeshMessage[]>([]);
const senderId = 'NODE_' + Math.random().toString(36).substring(2, 9);

const addMessage = (msg: MeshMessage) => {
setMessages((prev) => {
if (prev.find((m) => m.id === msg.id)) return prev;
return [msg, ...prev];
});
};

return (
<MeshContext.Provider value={{ messages, addMessage, senderId }}>
{children}
</MeshContext.Provider>
);
};

export const useMesh = (): MeshContextType => {
const context = useContext(MeshContext) || undefined;
if (!context) throw new Error('useMesh must be used within MeshProvider');
return context;
};