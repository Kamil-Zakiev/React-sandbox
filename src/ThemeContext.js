import React from 'react'

const Themes = {
    dark: 'dark',
    ligth: 'light',
    oppositeOf: (theme) => {
        return theme === Themes.dark ? Themes.ligth : Themes.dark;
    },
    classFor: (theme) => {
        return theme === Themes.dark ? 'black' : 'lightblue';
    }
};
const ThemeContext = React.createContext(Themes.dark);

export {Themes, ThemeContext};
