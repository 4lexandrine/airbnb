import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";
import { ProfileScreen, AroundScreen, SignUpScreen, SignInScreen, RoomScreen, HomeScreen } from "./containers";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };
  // AsyncStorage.removeItem("userToken");
  // AsyncStorage.removeItem("userId");

  const setId = async id => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {

    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar />
      {isLoading ? null : userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: true }}
          >
            {() => <SignInScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              header: () => null,
              animationEnabled: true,
              headerStyle: { backgroundColor: "#F14F55" },
              headerTitleStyle: {
                color: "white",
                fontWeight: "300"
              }
            }}
          >
            {() => <SignUpScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Tab"
              options={{ header: () => null, animationEnabled: true }}
            >
              {() => (
                <Tab.Navigator
                  tabBarOptions={{
                    showLabel: false,
                    activeTintColor: "black",
                    inactiveTintColor: "white",
                    style: {
                      backgroundColor: "#F14F55"
                    }
                  }}
                >
                  <Tab.Screen
                    name="Home"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      )
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            title: "Mon Airbnb",
                            tabBarLabel: "Home",
                            headerStyle: {
                              backgroundColor: "#F14F55"
                            },
                            headerTitleStyle: {
                              color: "white"
                            },
                            headerTitleAlign: "center"
                          }}
                        >
                          {() => <HomeScreen />}
                        </Stack.Screen>

                        <Stack.Screen
                          name="Room"
                          options={{
                            title: "Room",
                            headerStyle: {
                              backgroundColor: "#F14F55"
                            },
                            headerTitleStyle: {
                              color: "white"
                            },
                            headerTitleAlign: "center",
                            headerBackTitle: " ",
                            headerLeftContainerStyle: {
                              paddingLeft: 10
                            }
                          }}
                        >
                          {() => <RoomScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="Around"
                    options={{
                      tabBarLabel: "Around me",
                      tabBarIcon: ({ color, size }) => (
                        <EvilIcons name={"location"} size={35} color={color} />
                      )
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Aroud me"
                          options={{
                            title: "Around me",
                            tabBarLabel: "Around me",
                            headerStyle: {
                              backgroundColor: "#F14F55"
                            },
                            headerTitleStyle: {
                              color: "white"
                            },
                            headerTitleAlign: "center"
                          }}
                        >
                          {() => <AroundScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="Profile"
                    options={{
                      tabBarLabel: "Profile",
                      tabBarIcon: ({ color, size }) => (
                        <AntDesign name={"user"} size={size} color={color} />
                      )
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Profile"
                          options={{
                            title: "Profile",
                            tabBarLabel: "Connect",
                            headerStyle: {
                              backgroundColor: "#F14F55"
                            },
                            headerTitleStyle: {
                              color: "white"
                            },
                            headerTitleAlign: "center"
                          }}
                        >
                          {() =>
                            <ProfileScreen
                              setToken={setToken}
                              token={userToken}
                              userId={userId}
                              setId={setId}
                            />
                          }
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
