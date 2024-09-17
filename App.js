// // App.js
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomePage from './screens/HomePage';
// import GuideRegister from './screens/GuideRegister';
// import TouristRegister from './screens/TouristRegister';
// import GuideSignUp from './screens/GuideSignUp';
// import TouristSignUp from './screens/TouristSignUp';
// import HomePageGuide from './screens/HomePageGuide'; // Import HomePageGuide

// import DatePicker from 'react-native-date-picker';


// const Stack = createStackNavigator();

// function MainScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to the App</Text>
//       <Button
//         title="Go to Home Page"
//         onPress={() => navigation.navigate('HomePage')}
//       />
//       <Button
//         title="Guide Register"
//         onPress={() => navigation.navigate('GuideRegister')}
//       />
//       <Button
//         title="Tourist Register"
//         onPress={() => navigation.navigate('TouristRegister')}
//       />
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Main">
//         <Stack.Screen name="Main" component={MainScreen} />
//         <Stack.Screen name="HomePage" component={HomePage} />
//         <Stack.Screen name="GuideRegister" component={GuideRegister} />
//         <Stack.Screen name="TouristRegister" component={TouristRegister} />
//         <Stack.Screen name="GuideSignUp" component={GuideSignUp} />
//         <Stack.Screen name="TouristSignUp" component={TouristSignUp} />
//         <Stack.Screen name="HomePageGuide" component={HomePageGuide} /> {/* Add HomePageGuide to the stack */}

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });



// App.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import GuideRegister from './screens/GuideRegister';
import TouristRegister from './screens/TouristRegister';
import GuideSignUp from './screens/GuideSignUp';
import TouristSignUp from './screens/TouristSignUp';
import HomePageGuide from './screens/HomePageGuide';
import FavoriteScreen from './screens/FavoriteScreen';
import { FavoritesProvider } from './FavoritesContext';
import ProfileScreen from './screens/ProfileScreen';
import ProfileScreenTourist from './screens/ProfileScreenTourist';

const Stack = createStackNavigator();

function MainScreen({ navigation }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who are you?</Text>
      <Button
        title="Choose"
        onPress={() => setShowOptions(!showOptions)}
      />

      {showOptions && (
        <View style={styles.buttonContainer}>
          <Button
            title="Guide"
            onPress={() => navigation.navigate('GuideRegister')}
          />
          <Button
            title="Tourist"
            onPress={() => navigation.navigate('TouristRegister')}
          />
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="GuideRegister" component={GuideRegister} />
          <Stack.Screen name="TouristRegister" component={TouristRegister} />
          <Stack.Screen name="GuideSignUp" component={GuideSignUp} />
          <Stack.Screen name="TouristSignUp" component={TouristSignUp} />
          <Stack.Screen name="HomePageGuide" component={HomePageGuide} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ProfileScreenTourist" component={ProfileScreenTourist} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
