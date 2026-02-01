'use client'
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from "@/firebase";
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, Card, CircularProgress, Grid, Toolbar, Typography} from "@mui/material";

export default function ViewFlashcards() {
    const { isSignedIn, user, isLoaded } = useUser(); 
    const [flashcardDecks, setFlashcardDecks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router])

    useEffect(() => {
        async function getFlashcardDecks() {
            if (!user) return;
            const userReference = doc(collection(db, 'users'), user.emailAddresses[0].emailAddress);
            const docSnapshot = await getDoc(userReference);

            if (docSnapshot.exists()) {
                const flashcardSets = docSnapshot.data().flashcards || [];
                const flashcardIds = flashcardSets.map((flashcard, index) => ({
                    id: flashcard.deckName || `generated-id-${index}`,
                    ...flashcard,
                }));
                setFlashcardDecks(flashcardIds);
            } else {
                await setDoc(userReference, { flashcards: [] });
            }
        }
        getFlashcardDecks();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return (
        <Box>
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
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}} >
                <CircularProgress color="black"/>
            </Box>
        </Box>
        )
    }

    function handleSelectCard(id) {
        router.push(`/flashcards?id=${id}`);
    }
    
    return (
        <Box sx={{ pb: 3 }} > 
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
            <Typography sx={{ mr: 3, fontSize: 40, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> Your Flashcards </Typography>
            <Box sx={{ mt: 4, mx: 'auto', width: 1200, minHeight: 600, borderRadius: 10, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)',  display: 'flex', flexDirection:'column', gap: 2, pb: 2 }} >
                <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }} >
                    {flashcardDecks.map((flashcardDeck, index) => (
                        <Grid item key={index} >
                            <Card 
                                onClick={() => handleSelectCard(flashcardDeck.deckName || `generated-id-${index}`)}
                                sx={{
                                    width: 300, 
                                    height: 50, 
                                    borderRadius: 3,
                                    boxShadow: 4,  
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'scale(1.05)',
                                        transition: 'transform 0.3s, box-shadow 0.3s'
                                    },
                                }}
                            >
                                <Typography 
                                    sx={{ 
                                        fontSize: 20, 
                                        color: 'black', 
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: 250
                                    }}>
                                    {flashcardDeck.deckName}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}