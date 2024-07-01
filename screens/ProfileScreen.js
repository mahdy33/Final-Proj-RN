// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: 'https://placekitten.com/200/200' }}
                style={styles.profileImage}
            />
            <Text style={styles.title}>GoodMorning Guide</Text>
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
                <Text style={styles.tripText}>trip 1</Text>
                <Text style={styles.tripText}>trip 2</Text>
                <Text style={styles.tripText}>trip 3</Text>
                <Text style={styles.tripText}>etc</Text>
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
});
