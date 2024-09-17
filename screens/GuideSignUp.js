// GuideSignUp.js`

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GuidesLogo from '../assets/guides-logo.svg';
import { useNavigation } from '@react-navigation/native';

const apiUrl = 'http://guides.somee.com/api/GuidesRW';

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

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(guideData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 400) {
                    throw new Error('Registration details not correct');
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(result => {
                navigation.navigate('HomePageGuide');
            })
            .catch(error => {
                Alert.alert('Registration Failed', error.message);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <GuidesLogo width={128} height={128} style={styles.logo} />
                <Text style={styles.title}>Guide Register</Text>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={first_name}
                        onChangeText={setFirstName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={last_name}
                        onChangeText={setLastName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="info-circle" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        value={bio}
                        onChangeText={setBio}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="globe" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Country"
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
                        value={phone_number}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
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
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="language" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Languages Spoken"
                        value={languages}
                        onChangeText={setLanguages}
                    />
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={btnRegister}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,  // Ensures the scroll view can grow with content
        justifyContent: 'center',  // Center the content when there is space
        padding: 20,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 15,
        marginVertical: 15,
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    inputIcon: {
        marginRight: 15,
        color: '#007BFF',
    },
    input: {
        flex: 1,
        height: 55,
        color: '#333',
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 15,
    },
    switchLabel: {
        fontSize: 18,
        color: 'black',
        marginRight: 15,
    },
    registerButton: {
        width: '100%',
        height: 55,
        backgroundColor: 'linear-gradient(90deg, #00c6ff, #007BFF)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
        marginVertical: 20,
    },
    registerButtonText: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
