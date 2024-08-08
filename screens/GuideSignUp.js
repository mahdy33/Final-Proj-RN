// GuideSignUp.js`

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GuidesLogo from '../assets/guides-logo.svg';
import { useNavigation } from '@react-navigation/native';

// Updated API URL
const apiUrl = 'https://application-guides.onrender.com/api/guides';

export default function GuideSignUp() {
    const navigation = useNavigation();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [hasCar, setHasCar] = useState(false);
    const [average_rating, setAverageRating] = useState(0);
    const [password, setPassword] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [languages, setLanguages] = useState('');

    const btnRegister = () => {
        const guideData = {
            first_name,
            last_name,
            bio,
            country,
            hasCar,
            average_rating,
            password,
            phone_number,
            email,
            languages: [{ language: languages, proficiency_level: 'native' }],
        };

        console.log('Sending registration request with:', guideData);

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(guideData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                console.log('Response status:', res.status);
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 400) {
                    throw new Error('Registration details not correct');
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(result => {
                console.log('API response:', result);
                navigation.navigate('HomePageGuide');
            })
            .catch(error => {
                console.log('Fetch error:', error);
                Alert.alert('Registration Failed', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <GuidesLogo width={128} height={128} style={styles.logo} />
            <Text style={styles.title}>Guide Register</Text>
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={first_name}
                    onChangeText={setFirstName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={last_name}
                    onChangeText={setLastName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="info-circle" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Bio"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={bio}
                    onChangeText={setBio}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="globe" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Country"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={country}
                    onChangeText={setCountry}
                />
            </View>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Has Car?</Text>
                <Switch value={hasCar} onValueChange={setHasCar} />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={phone_number}
                    onChangeText={setPhoneNumber}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="language" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Languages Spoken"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={languages}
                    onChangeText={setLanguages}
                />
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={btnRegister}>
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    switchLabel: {
        fontSize: 16,
        color: '#666',
        marginRight: 10,
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

