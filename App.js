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
import React from 'react';
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Button
        title="Go to Home Page"
        onPress={() => navigation.navigate('HomePage')}
      />
      <Button
        title="Guide Register"
        onPress={() => navigation.navigate('GuideRegister')}
      />
      <Button
        title="Tourist Register"
        onPress={() => navigation.navigate('TouristRegister')}
      />
      <Button
        title="Guide Home Page"
        onPress={() => navigation.navigate('HomePageGuide')}
      />

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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
