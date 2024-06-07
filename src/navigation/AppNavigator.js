import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from '../context/AuthContext';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen.js';
import LoginScreen from '../screens/auth/LoginScreen.js';
import SignupScreen from '../screens/auth/SignupScreen.js';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen.js';
import HomeScreen from '../screens/main/HomeScreen.js';
import ProfileScreen from '../screens/main/ProfileScreen.js';
import DashboardScreen from '../screens/main/DashboardScreen.js';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
        initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#181D32',
                },
                tabBarIcon: ({ color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Perfil') {
                        iconName = 'person';
                    } else if (route.name === 'Dashboard') {
                        iconName = 'dashboard';
                    }

                    return <MaterialIcon name={iconName} size={32} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <AuthProvider>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </AuthProvider>
    );
};

export default AppNavigator;
