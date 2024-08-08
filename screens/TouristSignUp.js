//TouristSignUp.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GuidesLogo from '../assets/guides-logo.svg';
import { useNavigation } from '@react-navigation/native';

// Updated API URL
const apiUrl = 'https://application-guides.onrender.com/api/tourists';

export default function TouristSignUp() {
    const navigation = useNavigation();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    const btnRegister = () => {
        const touristData = {
            first_name,
            last_name,
            email,
            password,
            phone_number
        };

        console.log('Sending registration request with:', touristData);

        fetch(apiUrl + '/register', {
            method: 'POST',
            body: JSON.stringify(touristData),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        })
            .then(res => {
                console.log('Response status:', res.status);
                if (res.status === 200 || res.status === 201) {
                    return res.json();
                } else if (res.status === 400) {
                    throw new Error('Registration details not correct');
                } else if (res.status === 409) {
                    throw new Error('Email already exists');
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(result => {
                console.log('API response:', result);
                navigation.navigate('HomePage');
            })
            .catch(error => {
                console.log('Fetch error:', error);
                Alert.alert('Registration Failed', error.message);
            });
    };


    return (
        <View style={styles.container}>
            <GuidesLogo width={128} height={128} style={styles.logo} />
            <Text style={styles.title}>Tourist Register</Text>
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
                <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email ID"
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
                <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
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