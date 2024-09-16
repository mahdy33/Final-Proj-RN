import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Dimensions, Linking, KeyboardAvoidingView, FlatList } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import GuidesLogo from '../assets/guides-logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../FavoritesContext';
import { OPEN_CAGE_API, OPENWEATHERMAP_API_KEY } from '@env';

const images = [
    require('../assets/searchscreen1.webp'),
    require('../assets/searchscreen2.jpeg'),
    require('../assets/searchscreen3.jpeg'),
];

const CITY_NAME = 'paris';

const TripCard = ({ guide }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { addFavorite, removeFavorite } = useContext(FavoritesContext);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            removeFavorite(guide);
        } else {
            addFavorite(guide);
        }
    };

    return (
        <View style={styles.tripCard}>
            <Image source={require('../assets/searchscreen3.jpeg')} style={styles.tripImage} />
            <Text style={styles.tripTitle}>{guide.firstName} {guide.lastName}</Text>
            <Text style={styles.tripSubtitle}>
                Speaks: {Array.isArray(guide.languages) ? guide.languages.join(', ') : guide.languages}
            </Text>
            <View style={styles.tripFooter}>
                <TouchableOpacity onPress={toggleFavorite}>
                    <Icon name="heart" size={20} color={isFavorite ? "#FF1493" : "#000"} />
                </TouchableOpacity>
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, index) => (
                        <Icon
                            key={index}
                            name="star"
                            size={20}
                            color={index < guide.averageRating ? "#FFD700" : "#ccc"}
                        />
                    ))}
                    <Text style={styles.ratingText}>{guide.averageRating}/5</Text>
                </View>
            </View>
        </View>
    );
};


export default function SearchScreen() {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
    const [people, setPeople] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [hasCar, setHasCar] = useState(false);
    const scrollViewRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        fetchTemperature();
        fetchCountries();
        fetchGuides();
    }, []);

    const fetchTemperature = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
            );
            setTemperature(response.data.main.temp);
        } catch (error) {
            console.error('Error fetching temperature:', error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countriesData = response.data.map(country => ({
                name: country.name.common,
                website: country.tld ? `https://${country.tld[0]}` : ''
            }));
            setCountries(countriesData);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchGuides = async () => {
        try {
            const response = await axios.get('http://guides.somee.com/api/GuidesRW');

            // Directly set the array since the response is the guide array, not wrapped in a "Guides" key
            setGuides(response.data);

        } catch (error) {
            console.error('Error fetching guides:', error);
        }
    };


    const handleLogout = () => {
        console.log('Logout pressed');
        console.log(`Open Cage API Key: ${OPEN_CAGE_API}`);
    };

    const handleConfirmFromDate = (date) => {
        setFromDate(date);
        setFromDatePickerVisibility(false);
    };

    const handleConfirmToDate = (date) => {
        setToDate(date);
        setToDatePickerVisibility(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filteredData = countries.filter(country =>
                country.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCountries(filteredData);
        } else {
            setFilteredCountries([]);
        }
    };

    const openWebsite = (website) => {
        if (website) {
            Linking.openURL(website).catch((err) => console.error('Failed to open URL:', err));
        } else {
            alert('No website available for this country');
        }
    };

    const renderCountry = ({ item }) => (
        <TouchableOpacity style={styles.countryItem} onPress={() => openWebsite(item.website)}>
            <Text style={styles.countryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderTripCard = ({ item }) => (
        <TripCard guide={item} />
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
                                placeholder="Choose your destination"
                                placeholderTextColor="#ccc"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                        </View>
                        <View style={styles.sideInputs}>
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
                {searchQuery.length > 0 && (
                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item) => item.name}
                        renderItem={renderCountry}
                        style={styles.list}
                    />
                )}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Guides</Text>
                </View>
                <FlatList
                    data={guides}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderTripCard}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.horizontalScroll}
                />
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Domestic destinations</Text>
                </View>
                <FlatList
                    data={[
                        { image: require('../assets/searchscreen1.webp'), title: "Riyadh, Saudi Arabia", subtitle: "", rating: 4 },
                        { image: require('../assets/searchscreen2.jpeg'), title: "Jeddah, Saudi Arabia", subtitle: "", rating: 4 },
                        { image: require('../assets/searchscreen3.jpeg'), title: "Dammam, Saudi Arabia", subtitle: "", rating: 4 },
                    ]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderTripCard}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.horizontalScroll}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        paddingTop: 0, // Align the content to the top of the screen
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
    sideInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3,
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
        flex: 1,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#fff',
        borderWidth: 1,
        color: '#fff',
    },
    list: {
        flex: 1,
    },
    countryItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    countryName: {
        fontSize: 16,
        color: '#333',
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
    horizontalScroll: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    tripCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    tripImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerButton: {
        alignItems: 'center',
    },
    footerButtonText: {
        fontSize: 12,
        color: '#555',
        marginTop: 5,
    },
});
