'use client'
import { AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
    <Container maxWidth={false} disableGutters>
        <AppBar position = "static" sx={{ backgroundColor: '#4272FF', boxShadow: 'none' }} >
            <Toolbar>
                <Typography variant = 'h5' sx = {{ fontSize: 30, fontWeight: 'bold', color: '#fff', flexGrow: 1 }} >
                    Cardify
                </Typography>
                <Button variant="outlined" color = "inherit" href="/sign-in" sx={{ borderRadius: 3, textTransform: 'none'}}> Log In </Button>
                <Button variant="outlined" color = "inherit" href="/sign-up" sx={{ ml: 2, borderRadius: 3, textTransform: 'none'}}> Sign Up </Button>
            </Toolbar>
        </AppBar>
        <Box 
            sx={{ 
                minHeight: '100vh', 
                backgroundColor: '#ebebeb',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 15
            }}
            >   
                <SignIn />
        </Box>
    </Container>
    )
}