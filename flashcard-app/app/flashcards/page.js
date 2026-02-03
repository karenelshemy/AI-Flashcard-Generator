'use client'
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from "@/firebase";
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, CircularProgress, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Flashcards() {
    const { isSignedIn, user, isLoaded } = useUser(); 
    const router = useRouter();
    const searchParams = useSearchParams();
    const flashcardDeckId = searchParams.get('id');
    const [deckName, setDeckName] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router])

    useEffect(() => {
        async function getFlashcardDeck() {
            if (!user || !flashcardDeckId) return;
            try {
                const deckReference = query(collection(db, `users/${user.emailAddresses[0].emailAddress}/${flashcardDeckId}`), orderBy("index", "asc"));
                const documents = await getDocs(deckReference);
                const flashcards = [];

                documents.forEach(document => {
                    flashcards.push({ id: document.id, ...document.data() });
                })

                setFlashcards(flashcards);
                setDeckName(flashcardDeckId);
                setCurrentIndex(0);
                setFlipped(false);
                setLoading(false);
            } catch (error) {
                console.error("Could not retrieve flashcards:", error);
                setLoading(false);
            }
        }
        getFlashcardDeck();
    }, [user, flashcardDeckId]);

    if (!isLoaded || !isSignedIn || loading) {
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

    const currentFlashcard = flashcards[currentIndex];

    const handleSelectPrevious = () => {
        if (currentIndex > 0) {
            setFlipped(false);
            setCurrentIndex(currentIndex - 1);
        }
    }

    const handleSelectNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setFlipped(false);
            setCurrentIndex(currentIndex + 1);
        }
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
            <Typography sx={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> {deckName} </Typography>
            <Box sx={{ mt: 4, mx: 'auto', width: 1200, minHeight: 600, borderRadius: 10, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)',  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pt: 4, pb: 4 }}>
                {flashcards.length === 0 ? 
                    (<Typography sx={{ color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center' }} > No flashcards to view in this deck. </Typography>) : 
                    (<>
                        <Box key={currentIndex} onClick={() => setFlipped(!flipped)} sx={{ perspective: 1000, mb: 10, width: 700, height: 300 }} >
                            <Box 
                                sx={{ 
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'transform 0.6s',
                                    transformStyle: 'preserve-3d',
                                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                    position: 'relative'
                                }}
                            >
                                <Box 
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: 25, 
                                        borderRadius: 5,
                                        boxShadow: 6,
                                        textAlign: 'center',
                                        overflowWrap: 'break-word',
                                        overflow: 'hidden'
                                    }}
                                > 
                                    {currentFlashcard.front}
                                </Box>
                                <Box 
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: 25,
                                        borderRadius: 5,
                                        boxShadow: 6,
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        textAlign: 'center',
                                        overflowWrap: 'break-word',
                                        overflow: 'hidden'
                                    }}
                                    >
                                        {currentFlashcard.back}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}} >
                            <Box sx={{ display: 'flex', gap: 4, mb: 3}}>
                                <IconButton 
                                    onClick={handleSelectPrevious} 
                                    disabled={currentIndex === 0}
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: 3
                                    }}
                                >
                                    <ArrowBackIcon fontSize="large" />
                                </IconButton>
                                <IconButton 
                                    onClick={handleSelectNext} 
                                    disabled={currentIndex === flashcards.length - 1}
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: 3
                                    }}
                                >
                                    <ArrowForwardIcon fontSize="large" />
                                </IconButton>
                            </Box>
                            <Box>
                                <Button 
                                    variant="contained"
                                    onClick={() => router.push(`/flashcards/learn?id=${flashcardDeckId}`)}
                                    sx={{
                                        width: 150,
                                        height: 50,
                                        backgroundColor: 'black',
                                        borderRadius: 3,
                                        textTransform: 'none'
                                    }}
                                > 
                                    LEARN DECK
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}