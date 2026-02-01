'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

export default function Home() {
    return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }} >
      <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
          <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
            <Typography component = "a" variant = 'h5' href="/" sx = {{ fontSize: 30, fontWeight: 'bold', color: '#4272FF', cursor: 'pointer', textDecoration: 'none'}} >
                Cardify
            </Typography>
            <Box sx={{ flexGrow: 1}} />
            <SignedOut>
              <Button variant="contained" href="/sign-in" sx={{ borderRadius: 3, textTransform: 'none', color: 'white', backgroundColor: '#4272FF'}}>Log In</Button>
              <Button variant="contained" href="/sign-up" sx={{ ml: 2, borderRadius: 3, textTransform: 'none', color: 'white', backgroundColor: '#4272FF' }}>Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mt: 3, textAlign:'center', fontSize: 35, fontWeight: 'bold', color: 'black' }}>
          Take Learning To Another Level With Cardify
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, textAlign: 'center', fontSize: 20, color: '#525050' }} >
          Create flashcards manually or generate them instantly with AI. 
        </Typography>
      </Container>
      <Box sx={{ mt: 8, mx: 'auto', maxWidth: 1000, p: 2, borderRadius: 5, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)', display: 'flex', alignItems: 'center' }}>
        <Box component="img" src="null" sx={{ width: 400, height: 300, borderRadius: 3, boxShadow: 4, objectFit: 'cover' }} />
        <Box sx={{ textAlign: 'center', mt: -3 }}> 
          <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
            AI Flashcard Generator
          </Typography>
          <Typography sx={{ fontSize: 20, mt: 1 }}>
            Type in any topic or upload a file you want to learn, and with just one click, let AI generate flashcards within seconds.
          </Typography>
          <Button variant="contained" href="/flashcard-generator" sx={{ mt: 2, padding: '10px 20px', borderRadius: 3, textTransform: 'none', color: 'white', backgroundColor: 'black'}}>Try It Out</Button>
        </Box>
      </Box>
      <Box sx={{ mt: 8, mx: 'auto', maxWidth: 1000, p: 2, borderRadius: 5, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
        <Box sx={{ flex: 1, maxWidth: 400, textAlign: 'center' }}> 
          <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
            Create Your Own Flashcards
          </Typography>
          <Typography sx={{ fontSize: 20, mt: 1, lineHeight: 1.5 }}>
            Turn your notes into personalized flashcards tailored to your study needs.
          </Typography>
          <Button variant="contained" href="/create" sx={{ mt: 2, padding: '10px 20px', borderRadius: 3, textTransform: 'none', color: 'white', backgroundColor: 'black'}}> Get Started </Button>
        </Box>
        <Box component="img" src="null" sx={{ width: 450, height: 300, borderRadius: 3, boxShadow: 4, objectFit: 'cover', flexShrink: 0 }} />
      </Box>
      <Box sx={{ mt: 8, mx: 'auto', maxWidth: 1000, p: 2, borderRadius: 5, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)', display: 'flex', alignItems: 'center' }}>
        <Box component="img" src="null" sx={{ width: 400, height: 300, borderRadius: 3, boxShadow: 4, objectFit: 'cover' }} />
        <Box sx={{ textAlign: 'center', mt: -1 }}> 
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', ml: 15 }}>
            See Your Flashcards
          </Typography>
          <Typography sx={{ fontSize: 20, mt: 1, ml: 17 }}>
            View, manage, and study all your<br />
            flashcard decks in one place.
          </Typography>
          <Button variant="contained" sx={{ mt: 2, ml: 15, padding: '10px 20px', borderRadius: 3, textTransform: 'none', color: 'white', backgroundColor: 'black'}}> View </Button>
        </Box>
      </Box>
    </Box> 
  )
}