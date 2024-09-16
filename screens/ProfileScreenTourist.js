import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Dialog from 'react-native-dialog';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ProfileScreenTourist() {
    const route = useRoute();
    const navigation = useNavigation();
    const { tourist } = route.params || {}; // Fallback to an empty object if tourist is undefined

    // Debug: Log the route params to check if the tourist object is passed correctly
    useEffect(() => {
        console.log("Tourist Params: ", route.params);
    }, []);

    if (!tourist || !tourist.id) {
        return (
            <View style={styles.container}>
                <Text>Error: Tourist information is missing</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.goBackText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const [touristInfo, setTouristInfo] = useState({
        id: tourist.id,
        first_name: tourist.first_name,
        last_name: tourist.last_name,
        email: tourist.email,
        phone_number: tourist.phone_number || '',
        country: tourist.country || '',
    });

    const [visible, setVisible] = useState(false);
    const [updatedTourist, setUpdatedTourist] = useState({ ...touristInfo });

    useEffect(() => {
        const fetchTouristDetails = async () => {
            try {
                console.log("Fetching tourist details for ID:", id);
                const response = await fetch(`http://guides.somee.com/api/Tourists/${id}`);

                if (response.ok) {
                    const result = await response.json();
                    console.log("Fetched tourist details:", result);
                    setTouristInfo(result.tourist);
                    setUpdatedTourist(result.tourist);
                } else {
                    Alert.alert("Error", "There was a problem fetching tourist details.");
                }
            } catch (error) {
                Alert.alert("Error", "There was a problem fetching tourist details.");
            }
        };

        fetchTouristDetails();
    }, [touristInfo.id]);

    const handleUpdatePress = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleUpdate = async () => {
        setVisible(false);

        console.log("Updating tourist with data:", updatedTourist);

        try {
            const response = await fetch(`http://guides.somee.com/api/Tourists/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTourist),
            });

            if (response.ok) {
                console.log("Tourist successfully updated");
                Alert.alert("Success", "Your information has been updated.");
            } else {
                Alert.alert("Error", "There was a problem updating your information.");
            }
        } catch (error) {
            Alert.alert("Error", "There was a problem updating your information.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: 'https://placekitten.com/200/200' }} // Replace with your image URL
                style={styles.profileImage}
            />
            <Text style={styles.title}>Hello {touristInfo.first_name}</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>First Name: {touristInfo.first_name}</Text>
                <Text style={styles.detailLabel}>Last Name: {touristInfo.last_name}</Text>
                <Text style={styles.detailLabel}>Email: {touristInfo.email}</Text>
                <Text style={styles.detailLabel}>Phone: {touristInfo.phone_number}</Text>
                <Text style={styles.detailLabel}>Country: {touristInfo.country}</Text>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePress}>
                <Text style={styles.updateButtonText}>Update Information</Text>
            </TouchableOpacity>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Update Information</Dialog.Title>
                <Dialog.Input
                    label="First Name"
                    value={updatedTourist.first_name}
                    onChangeText={(text) => setUpdatedTourist({ ...updatedTourist, first_name: text })}
                />
                <Dialog.Input
                    label="Last Name"
                    value={updatedTourist.last_name}
                    onChangeText={(text) => setUpdatedTourist({ ...updatedTourist, last_name: text })}
                />
                <Dialog.Input
                    label="Email"
                    value={updatedTourist.email}
                    onChangeText={(text) => setUpdatedTourist({ ...updatedTourist, email: text })}
                />
                <Dialog.Input
                    label="Phone Number"
                    value={updatedTourist.phone_number}
                    onChangeText={(text) => setUpdatedTourist({ ...updatedTourist, phone_number: text })}
                />
                <Dialog.Input
                    label="Country"
                    value={updatedTourist.country}
                    onChangeText={(text) => setUpdatedTourist({ ...updatedTourist, country: text })}
                />
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Update" onPress={handleUpdate} />
            </Dialog.Container>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    detailLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    updateButton: {
        width: '100%',
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    goBackText: {
        color: '#007bff',
        marginTop: 10,
    },
});
