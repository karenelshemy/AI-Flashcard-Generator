'use client'
import { AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
    return (
    <Container maxWidth={false} disableGutters>
        <AppBar position = "static" sx={{ backgroundColor: 'white', boxShadow: 'none' }} >
            <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
                <Typography component = "a" variant = 'h5' href="/" sx = {{ fontSize: 30, fontWeight: 'bold', color: '#4272FF', cursor: 'pointer', textDecoration: 'none'}} >
                    Cardify
                </Typography>
                <Box sx={{ flexGrow: 1}} />
                <Button variant="outlined" href="/sign-in" sx={{ borderRadius: 3, textTransform: 'none', color: 'white', backgroundColor: '#4272FF'}}> Log In </Button>
                <Button variant="outlined" href="/sign-up" sx={{ ml: 2, borderRadius: 3, textTransform: 'none', color: 'white', backgroundColor: '#4272FF'}}> Sign Up </Button>
            </Toolbar>
        </AppBar>
        <Box 
            sx={{ 
                minHeight: '100vh', 
                background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)',
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