import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    // accent1Color: "#8bc34a",
    // primary1Color: "#616161",
    // primary2Color: "#0288d1",
    // primary3Color: "#8bc34a",
    // accent2Color: "#64b5f6",
    // accent3Color: "#bdbdbd"
    primary: {
      dark: '#33691e',
      main: '#3f3f3f'
      // dark: "#8bc34a"
    },
    secondary: {
      main: '#33691e'
    }
  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        background: '#0288d1'
      }
    }
  },
  typography: {
    useNextVariants: true
  }
})
