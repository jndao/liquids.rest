const universalTheme = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',

  // colors
  grey: '#909296',
  darkGrey: '#535454',
  white: 'white',
}

export const darkTheme = {
  ...universalTheme,

  bg: '#25262B',
  fg: 'white'
}

export const lightTheme = {
  ...universalTheme,

  bg: 'white',
  fg: 'black'
}