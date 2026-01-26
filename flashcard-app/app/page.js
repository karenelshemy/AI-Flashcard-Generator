'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function Home() {
    return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ebebeb' }} >
      <AppBar position="static" sx={{ backgroundColor: '#4272FF', boxShadow: 'none' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ fontSize: 30, flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
              Cardify
            </Typography>
            <SignedOut>
              <Button variant="outlined" color="inherit" href="/sign-in" sx={{ borderRadius: 3, textTransform: 'none'}}>Log In</Button>
              <Button variant="outlined" color="inherit" href="/sign-up" sx={{ ml: 2, borderRadius: 3, textTransform: 'none' }}>Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
      </AppBar>
    </Box>
  );
}