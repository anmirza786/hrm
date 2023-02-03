import { createTheme } from '@mui/material/styles';

export const custometheme = createTheme({
    palette: {
        primary: {
            main: "#29D398",
            contrastText: "white"
        },
        secondary: {
            main: "#3E56C4",
            contrastText: "white"
        },
        danger: {
            main: "#F03A5F",
            contrastText: "white"
        },
        warning: {
            main: "#FFE08A",
            contrastText: "black"
        },
        success: {
            main: "#29D398",
            contrastText: "white"
        },
        info: {
            main: "#3488CE",
            contrastText: "white"
        }
    }
})
