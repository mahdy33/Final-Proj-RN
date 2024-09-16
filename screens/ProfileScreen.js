import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Dialog from 'react-native-dialog';
import { useRoute } from '@react-navigation/native';

export default function ProfileScreen() {
    const route = useRoute();
    const { guide } = route.params;

    const [guideInfo, setGuideInfo] = useState({
        id: guide.id,
        first_name: guide.first_name,
        last_name: guide.last_name,
        email: guide.email,
        languages: guide.languages || [],
        bio: guide.bio || '',
        country: guide.country || '',
        phone_number: guide.phone_number || '',
    });

    const [visible, setVisible] = useState(false);
    const [updatedGuide, setUpdatedGuide] = useState({ ...guideInfo });
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchGuideDetails = async () => {
            try {
                console.log("Fetching guide details for ID:", guideInfo.id);
                // const response = await fetch(`https://application-guides.onrender.com/api/guides/${guideInfo.id}`);
                const response = await fetch(`http://guides.somee.com/api/GuidesRW/${guideInfo.id}`);

                if (response.ok) {
                    const result = await response.json();
                    console.log("Fetched guide details:", result);
                    setGuideInfo(result.guide);
                    setUpdatedGuide(result.guide);
                } else {
                    Alert.alert("Error", "There was a problem fetching guide details.");
                }
            } catch (error) {
                Alert.alert("Error", "There was a problem fetching guide details.");
            }
        };

        const fetchRoutes = async () => {
            try {
                // const response = await fetch(`https://application-guides.onrender.com/api/guides/${guideInfo.id}/routes`);
                const response = await fetch(`http://guides.somee.com/api/GuidesRW/${guideInfo.id}/routes`);

                if (response.ok) {
                    const result = await response.json();
                    console.log("Fetched routes:", result);
                    setRoutes(result.routes);
                } else {
                    Alert.alert("Error", "There was a problem fetching routes.");
                }
            } catch (error) {
                Alert.alert("Error", "There was a problem fetching routes.");
            }
        };

        fetchGuideDetails();
        fetchRoutes();
    }, [guideInfo.id]);

    const handleUpdatePress = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleUpdate = async () => {
        setVisible(false);

        console.log("Updating guide with data:", updatedGuide);

        try {
            // const response = await fetch(`https://application-guides.onrender.com/api/guides/${guideInfo.id}`, {
            const response = await fetch(`http://guides.somee.com/api/GuidesRW/${guideInfo.id}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGuide),
            });

            if (response.ok) {
                console.log("Guide successfully updated");
                // Fetch the updated guide details again to reflect the changes in the UI
                fetchGuideDetails(); // Call the function to fetch updated guide details
                Alert.alert("Success", "Your information has been updated.");
            } else {
                Alert.alert("Error", "There was a problem updating your information.");
            }
        } catch (error) {
            Alert.alert("Error", "There was a problem updating your information.");
        }
    };


    if (!guideInfo) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: 'https://placekitten.com/200/200' }}
                style={styles.profileImage}
            />
            <Text style={styles.title}>Good Morning {guideInfo.first_name}</Text>
            <View style={styles.tripSection}>
                <TouchableOpacity style={styles.tripButton}>
                    <Text style={styles.tripButtonText}>My current Trip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tripButton}>
                    <Text style={styles.tripButtonText}>My Next Trip</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>My Trips</Text>
            </TouchableOpacity>
            <View style={styles.tripsList}>
                {routes.length > 0 ? (
                    routes.map((route, index) => (
                        <Text key={index} style={styles.tripText}>{route.name}</Text>
                    ))
                ) : (
                    <Text style={styles.tripText}>No routes available</Text>
                )}
            </View>
            <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>Add Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>My Reviews</Text>
            </TouchableOpacity>
            <View style={styles.reviewsList}>
                <Text style={styles.reviewText}>review 1</Text>
                <Text style={styles.reviewText}>2</Text>
                <Text style={styles.reviewText}>3</Text>
                <Text style={styles.reviewText}>4</Text>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePress}>
                <Text style={styles.updateButtonText}>Update Information</Text>
            </TouchableOpacity>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Update Information</Dialog.Title>
                <Dialog.Input
                    label="First Name"
                    value={updatedGuide.first_name}
                    onChangeText={(text) => setUpdatedGuide({ ...updatedGuide, first_name: text })}
                />
                <Dialog.Input
                    label="Last Name"
                    value={updatedGuide.last_name}
                    onChangeText={(text) => setUpdatedGuide({ ...updatedGuide, last_name: text })}
                />
                <Dialog.Input
                    label="Bio"
                    value={updatedGuide.bio}
                    onChangeText={(text) => setUpdatedGuide({ ...updatedGuide, bio: text })}
                />
                <Dialog.Input
                    label="Country"
                    value={updatedGuide.country}
                    onChangeText={(text) => setUpdatedGuide({ ...updatedGuide, country: text })}
                />
                <Dialog.Input
                    label="Phone Number"
                    value={updatedGuide.phone_number}
                    onChangeText={(text) => setUpdatedGuide({ ...updatedGuide, phone_number: text })}
                />
                <Dialog.Input
                    label="Email"
                    value={updatedGuide.email}
                    onChangeText={(text) => setUpdatedGuide({ ...updatedGuide, email: text })}
                />
                <Dialog.Input
                    label="Languages (comma separated)"
                    value={updatedGuide.languages ? updatedGuide.languages.join(', ') : ''}
                    onChangeText={(text) => setUpdatedGuide({ ...updatedGuide, languages: text.split(',').map(lang => lang.trim()) })}
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
    tripSection: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tripButton: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 10,
        margin: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    tripButtonText: {
        color: '#333',
    },
    sectionButton: {
        width: '100%',
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    sectionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tripsList: {
        width: '100%',
        backgroundColor: '#add8e6',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
    },
    tripText: {
        color: '#333',
        fontSize: 16,
        marginVertical: 2,
    },
    reviewsList: {
        width: '100%',
        backgroundColor: '#add8e6',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
    },
    reviewText: {
        color: '#333',
        fontSize: 16,
        marginVertical: 2,
    },
    updateButton: {
        width: '100%',
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
