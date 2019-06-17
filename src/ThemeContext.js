import React from 'react'

const Themes = {
    dark: 'dark',
    ligth: 'light'
};
const ThemeContext = React.createContext(Themes.dark);

export {Themes, ThemeContext};
