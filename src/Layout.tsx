/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Box, CssBaseline, styled } from "@mui/material";
import { Lnb } from "./Lnb";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));
interface Props {
    children: React.ReactNode
}
function Layout(props: Props) {
    const [open, setOpen] = React.useState(false);
    const { children } = props;
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Lnb open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    )
}

export default Layout
