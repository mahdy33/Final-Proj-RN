import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import GuidesLogo from '../assets/guides-logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-paper';

const images = [
    require('../assets/searchscreen1.webp'),
    require('../assets/searchscreen2.jpeg'),
    require('../assets/searchscreen3.jpeg'),
];

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const CITY_NAME = 'YOUR_CITY_NAME';

export default function SearchScreen() {
    const navigation = useNavigation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
    const [people, setPeople] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [hasCar, setHasCar] = useState(false);
    const scrollViewRef = useRef(null);
    const { width } = Dimensions.get('window');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: currentImageIndex * width, animated: true });
        }
    }, [currentImageIndex, width]);

    useEffect(() => {
        fetchTemperature();
    }, []);

    const fetchTemperature = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
            );
            setTemperature(response.data.main.temp);
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirmFromDate = (date) => {
        setFromDate(date);
        setFromDatePickerVisibility(false);
    };

    const handleConfirmToDate = (date) => {
        setToDate(date);
        setToDatePickerVisibility(false);
    };

    const TripCard = ({ image, title, subtitle, rating }) => {
        const [isFavorite, setIsFavorite] = useState(false);

        return (
            <View style={styles.tripCard}>
                <Image source={image} style={styles.tripImage} />
                <Text style={styles.tripTitle}>{title}</Text>
                <Text style={styles.tripSubtitle}>{subtitle}</Text>
                <View style={styles.tripFooter}>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <Icon name="heart" size={20} color={isFavorite ? "#FF1493" : "#000"} />
                    </TouchableOpacity>
                    <View style={styles.ratingContainer}>
                        {[...Array(5)].map((_, index) => (
                            <Icon
                                key={index}
                                name="star"
                                size={20}
                                color={index < rating ? "#FFD700" : "#ccc"}
                            />
                        ))}
                        <Text style={styles.ratingText}>{rating}/5</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => { /* handle logout */ }}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
                <GuidesLogo width={50} height={50} style={styles.logo} />
                <Text style={styles.tempText}>
                    {temperature !== null && `${temperature}°C`}
                </Text>
            </View>
            <View style={styles.featuredContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        const index = Math.floor(event.nativeEvent.contentOffset.x / width);
                        setCurrentImageIndex(index);
                    }}
                    scrollEventThrottle={16}
                >
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            source={image}
                            style={[styles.featuredImage, { width }]}
                        />
                    ))}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <View style={styles.searchSection}>
                        <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="#ccc"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setFromDatePickerVisibility(true)} style={styles.dateInput}>
                        <Text style={styles.dateInputText}>{fromDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToDatePickerVisibility(true)} style={styles.dateInput}>
                        <Text style={styles.dateInputText}>{toDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.peopleInput}
                        placeholder="People"
                        placeholderTextColor="#ccc"
                        keyboardType="numeric"
                        value={people}
                        onChangeText={setPeople}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isFromDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmFromDate}
                onCancel={() => setFromDatePickerVisibility(false)}
                textColor="black"
            />
            <DateTimePickerModal
                isVisible={isToDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmToDate}
                onCancel={() => setToDatePickerVisibility(false)}
                textColor="black"
            />
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Guides</Text>
                <View style={styles.switchContainer}>
                    <Switch
                        value={hasCar}
                        onValueChange={setHasCar}
                        color="#81b0ff"
                    />
                    <Text style={styles.switchText}>has car ?</Text>
                </View>
            </View>
            <View style={styles.tripsContainer}>
                <TripCard
                    image={require('../assets/searchscreen3.jpeg')}
                    title="Gujrat"
                    subtitle="Pakistan"
                    rating={2}
                />
                <TripCard
                    image={require('../assets/searchscreen3.jpeg')}
                    title="London Eye"
                    subtitle="England"
                    rating={4}
                />
                <TripCard
                    image={require('../assets/searchscreen3.jpeg')}
                    title="Washington DC"
                    subtitle="America"
                    rating={3}
                />
                <TripCard
                    image={require('../assets/searchscreen3.jpeg')}
                    title="New York"
                    subtitle="America"
                    rating={5}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    tempText: {
        fontSize: 16,
        color: '#333',
    },
    logo: {
        flex: 1,
        alignItems: 'flex-end',
    },

    logoutButton: {
        backgroundColor: '#FF1493',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    featuredContainer: {
        position: 'relative',
        height: 200,
        marginBottom: 20,
    },
    featuredImage: {
        height: '100%',
        borderRadius: 10,
    },
    inputContainer: {
        position: 'absolute',
        top: '50%',
        left: '5%',
        right: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        flex: 2,
        marginRight: 5,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#fff',
    },
    dateInput: {
        flex: 1,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#fff',
        borderWidth: 1,
        justifyContent: 'center',
        marginRight: 5,
    },
    dateInputText: {
        color: '#fff',
    },
    peopleInput: {
        flex: 0.8,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#fff',
        borderWidth: 1,
        color: '#fff',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    tripsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    tripCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '40%',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    tripImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    tripSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    tripFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 5,
    },
});
