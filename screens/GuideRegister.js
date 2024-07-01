import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import GoogleLogo from '../assets/google-logo.svg';
import FacebookLogo from '../assets/Facebook_f_logo_(2019).svg';
import AppleLogo from '../assets/Apple_logo_black.svg';
import GuidesLogo from '../assets/guides-logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const apiUrl = 'http://guidest.somee.com/api/Guides';

export default function GuideRegister() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const btnLogin = () => {
        const s = {
            Name: name,
            Pass: password
        };

        console.log('Sending login request with:', s);

        fetch(apiUrl + '/login', {
            method: 'POST',
            body: JSON.stringify(s),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                console.log('Response status:', res.status);
                if (res.status === 200) {

                    return res.json();
                } else if (res.status === 404) {
                    throw new Error('Password or Name not correct');
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
                Alert.alert('Login Failed', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <GuidesLogo width={128} height={128} style={styles.logo} />
            <Text style={styles.title}>Guide Login</Text>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
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
            <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={btnLogin} // Call btnLogin on press
            >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>OR</Text>
                <View style={styles.separatorLine} />
            </View>
            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#FFFFFF' }]}>
                    <GoogleLogo width={32} height={32} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#FFFFFF' }]}>
                    <FacebookLogo width={32} height={32} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#FFFFFF' }]}>
                    <AppleLogo width={32} height={32} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate('GuideSignUp')} // Navigate to TouristRegister
            >
                <Text style={styles.registerButtonText}>Register as guide</Text>
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
        marginBottom: 20, // Add some margin to separate it from the title
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,

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
    forgotPasswordContainer: {
        width: '100%',
        alignItems: 'flex-end', // Align to the right side
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: '#007BFF',
        fontSize: 14,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 10,

    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,


    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#666',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 30,
    },
    socialButton: {
        width: 100,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
        marginHorizontal: 10, // Add horizontal margin to separate buttons
    },
    registerButton: {
        marginTop: 20,
    },
    registerButtonText: {
        color: '#007BFF',
        fontSize: 16,
    },
});
