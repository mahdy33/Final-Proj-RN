import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (guide) => {
        setFavorites([...favorites, guide]);
    };

    const removeFavorite = (guide) => {
        setFavorites(favorites.filter(fav => fav._id !== guide._id));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
