// screens/HomePage.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchScreen from './SearchScreen';
import FavoriteScreen from './FavoriteScreen';
// import CartScreen from './CartScreen';
import SettingsScreen from './SettingsScreen';
//import ProfileScreenTourist from './ProfileScreenTourist';
import ProfileScreenTourist from './ProfileScreenTourist';

const Tab = createBottomTabNavigator();

export default function HomePage() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Search') {
                        iconName = 'search';
                    } else if (route.name === 'Favorites') {
                        iconName = 'heart';
                    } else if (route.name === 'Cart') {
                        iconName = 'shopping-cart';
                    } else if (route.name === 'Settings') {
                        iconName = 'cog';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#FF1493',
                inactiveTintColor: 'black',
                style: {
                    height: 60,
                    paddingVertical: 10,
                },
                labelStyle: {
                    fontSize: 12,
                },
            }}
        >
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Favorites" component={FavoriteScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreenTourist} />
        </Tab.Navigator>
    );
}
