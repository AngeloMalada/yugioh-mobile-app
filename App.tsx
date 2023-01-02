import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import Results from "./screens/Results";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white",
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          //icon and label black
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Results"
        component={Results}
        options={{
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white",
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
