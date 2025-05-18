import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Add this type definition at the top with other interfaces
interface DisasterResponse {
  category: string;
  intents: string[];
  keywords: string[];
  responses: string[];
  priority?: number;
}

// Disaster response data and logic
const disasterResponses: DisasterResponse[] = [
  {
    category: "earthquake",
    intents: ["during", "after", "prepare", "shelter", "magnitude"],
    keywords: [
      "earthquake",
      "tremor",
      "seismic",
      "richter scale",
      "aftershock",
    ],
    responses: [
      "During an earthquake: Drop, Cover, and Hold On. Stay away from windows and heavy objects.",
      "After an earthquake: Check for gas leaks and structural damage before re-entering buildings.",
      "Prepare an earthquake kit with sturdy shoes, flashlight, and whistle for signaling rescue workers.",
      "If trapped, tap on pipes or walls to help rescuers locate you rather than shouting.",
    ],
    priority: 1,
  },
  {
    category: "hurricane",
    intents: ["prepare", "during", "evacuate", "after", "safety"],
    keywords: [
      "hurricane",
      "cyclone",
      "typhoon",
      "storm surge",
      "tropical storm",
    ],
    responses: [
      "Stay indoors during a hurricane. Move to a small, interior room on the lowest level of your building.",
      "Evacuate if authorities advise it or if you live in a mobile home or high-rise building.",
      "Prepare an emergency kit and secure your property before hurricane season.",
      "After a hurricane, be aware of flooding and downed power lines. Only return home when authorities say it's safe.",
    ],
  },
  {
    category: "tornado",
    intents: ["warning", "watch", "shelter", "safety", "during"],
    keywords: [
      "tornado",
      "twister",
      "funnel cloud",
      "tornado alley",
      "wind storm",
    ],
    responses: [
      "During a tornado, seek shelter in a basement or an interior room on the lowest floor, away from windows.",
      "If you're in a vehicle during a tornado warning, do not try to outrun it. Seek sturdy shelter immediately.",
      "The difference between a tornado watch and warning: a watch means conditions are favorable, a warning means a tornado has been spotted.",
      "After a tornado, watch out for downed power lines and gas leaks. Use a flashlight rather than candles.",
    ],
  },
  {
    category: "stroke",
    intents: ["symptoms", "signs", "what to do", "help", "emergency"],
    keywords: [
      "stroke",
      "face drooping",
      "arm weakness",
      "speech difficulty",
      "brain attack",
    ],
    responses: [
      "Remember FAST for stroke symptoms: Face drooping, Arm weakness, Speech difficulties, Time to call emergency services.",
      "If you suspect someone is having a stroke, call emergency services immediately. Note the time symptoms first appeared.",
      "Keep the person comfortable and support them in a half-sitting position with head and shoulders supported.",
    ],
  },
  {
    category: "heart_attack",
    intents: ["symptoms", "signs", "what to do", "chest pain", "emergency"],
    keywords: [
      "heart attack",
      "cardiac arrest",
      "chest pain",
      "heart",
      "cardiac",
    ],
    responses: [
      "Heart attack symptoms include chest pressure/pain, shortness of breath, and pain radiating to the arm, neck, or jaw. Call emergency services immediately.",
      "Help the person into a comfortable position, loosen tight clothing, and stay calm while waiting for emergency services.",
      "If the person is unresponsive and not breathing normally, begin CPR if trained to do so.",
    ],
  },
  {
    category: "emergency_kit",
    intents: ["what to include", "supplies", "prepare", "pack", "essentials"],
    keywords: [
      "emergency kit",
      "disaster kit",
      "go bag",
      "survival kit",
      "supplies",
    ],
    responses: [
      "A basic emergency kit should include: water (one gallon per person per day for 3 days), non-perishable food, flashlight, battery-powered radio, first aid kit, batteries, whistle, dust mask, plastic sheeting, duct tape, moist towelettes, garbage bags, wrench/pliers, manual can opener, local maps, and cell phone with chargers.",
      "Don't forget to include personal documents, medications, infant formula if needed, pet food, and cash in your emergency kit.",
      "Check your emergency supplies twice a year. Replace expired items and update your kit as your family's needs change.",
    ],
  },
  {
    category: "evacuation_plan",
    intents: ["how to", "create", "family", "prepare", "plan"],
    keywords: [
      "evacuation",
      "plan",
      "escape route",
      "meeting point",
      "emergency plan",
    ],
    responses: [
      "Create an evacuation plan by identifying two exits from each room and a meeting place outside your home. Practice your evacuation plan twice a year.",
      "Designate an out-of-area contact person who family members can call if separated during a disaster.",
      "Know multiple evacuation routes from your neighborhood and have a plan for where you'll stay if evacuated.",
    ],
  },
  {
    category: "elderly_care",
    intents: ["help", "seniors", "older adults", "assistance", "evacuate"],
    keywords: [
      "elderly",
      "seniors",
      "older adults",
      "grandparents",
      "disabled",
    ],
    responses: [
      "For elderly disaster preparedness, create a personal support network and make sure they have at least a week's worth of medications.",
      "If evacuating with elderly individuals, bring walking aids, eyeglasses, hearing aids with extra batteries, and any medical devices they need.",
      "Help elderly neighbors register for emergency assistance programs before disaster strikes.",
    ],
  },
  {
    category: "children_safety",
    intents: ["kids", "protect", "help", "prepare", "safety"],
    keywords: ["children", "kids", "baby", "child", "infant"],
    responses: [
      "Teach children when and how to call emergency services. Practice disaster drills with them regularly.",
      "For children during disasters, pack comfort items, activities, and familiar snacks to reduce anxiety.",
      "Have a plan for reuniting with children if a disaster occurs during school hours.",
    ],
  },
  {
    category: "cyber_disaster",
    intents: ["outage", "security", "backup", "ransomware"],
    keywords: ["cyberattack", "outage", "hack", "ransomware", "data breach"],
    responses: [
      "During cyberattacks: Disconnect devices from network. Use paper documentation for critical systems.",
      "Maintain offline backups of essential data. Report incidents to national cybersecurity authorities.",
    ],
    priority: 3,
  },
];

// Function to get response based on input
const getBotResponse = (userInput: string) => {
  const lowerInput = userInput.toLowerCase().replace(/[^\w\s]/gi, "");

  // Basic greetings
  if (/^(hi|hello|hey|greetings)\b/i.test(lowerInput)) {
    return "Hello! I'm your emergency response assistant. How can I help?";
  }
  if (/(thank|appreciate|grateful)/i.test(lowerInput)) {
    return "You're welcome. Stay safe! Do you need further assistance?";
  }
  if (/(emergency|urgent|help now)/i.test(lowerInput)) {
    return "❗ If this is a life-threatening emergency, please call your local emergency number immediately. I can provide first aid guidance while you wait for help.";
  }

  // Scoring logic
  let bestMatch = null as DisasterResponse | null;
  let highestScore = 0;

  disasterResponses.forEach((entry: DisasterResponse) => {
    let score = 0;

    // Category matching - more flexible
    if (lowerInput.includes(entry.category)) {
      score += 50;
    }

    // Keyword matching - more flexible and weighted
    entry.keywords.forEach((keyword) => {
      if (lowerInput.includes(keyword)) {
        score += 15;
        // Bonus for exact word match
        if (new RegExp(`\\b${keyword}\\b`, "i").test(lowerInput)) {
          score += 10;
        }
      }
    });

    // Intent matching - more flexible
    entry.intents.forEach((intent) => {
      if (lowerInput.includes(intent)) {
        score += 20;
        // Bonus for exact intent match
        if (new RegExp(`\\b${intent}\\b`, "i").test(lowerInput)) {
          score += 15;
        }
      }
    });

    // Context matching - check if multiple keywords from same category are present
    const matchedKeywords = entry.keywords.filter((keyword) =>
      lowerInput.includes(keyword)
    );
    if (matchedKeywords.length > 1) {
      score += matchedKeywords.length * 5;
    }

    // Apply priority multiplier
    score *= entry.priority || 1;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  });

  // Lower threshold and add fallback responses
  if (bestMatch && highestScore > 30) {
    const responses = bestMatch.responses;
    // If multiple responses exist, choose based on context
    if (responses.length > 1) {
      // Check for specific intents in the input to choose most relevant response
      const relevantIntents = bestMatch.intents.filter((intent) =>
        lowerInput.includes(intent)
      );
      if (relevantIntents.length > 0) {
        // Use the first matching intent to select a response
        const intentIndex = bestMatch.intents.indexOf(relevantIntents[0]);
        if (intentIndex < responses.length) {
          return responses[intentIndex];
        }
      }
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Improved fallback response with suggestions
  const suggestedTopics = disasterResponses
    .slice(0, 3)
    .map((entry) => entry.category.replace("_", " "))
    .join(", ");

  return `I'm not sure I understand. I can help with: ${suggestedTopics}. Could you rephrase your question?`;
};

// React Native component
const DisasterChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I assist you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Add 2 second delay before showing bot response
    setTimeout(() => {
      const botReply = getBotResponse(inputText);
      const botMsg = { id: Date.now() + 1, text: botReply, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messageContainer}
        contentContainerStyle={styles.messageContent}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles similar to CSS principles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 10,
  },
  messageContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageContent: {
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DisasterChatBot;