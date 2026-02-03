'use client'
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from "@/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography } from "@mui/material";

export default function LearnDeck() {
    const { isSignedIn, user, isLoaded } = useUser(); 
    const router = useRouter();
    const searchParams = useSearchParams();
    const flashcardDeckId = searchParams.get('id');
    const [flashcards, setFlashcards] = useState([]);
    const [shuffledDeck, setShuffledDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [understanding, setUnderstanding] = useState("");
    const [flipped, setFlipped] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showLevels, setShowLevels] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [totalTime, setTotalTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [cardsRepeated, setCardsRepeated] = useState(0);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router])

    useEffect(() => {
        async function getFlashcardDeck() {
            if (!user || !flashcardDeckId) return;
            try {
                const deckReference = collection(db, `users/${user.emailAddresses[0].emailAddress}/${flashcardDeckId}`);
                const documents = await getDocs(deckReference);
                const flashcards = [];

                documents.forEach(document => {
                    flashcards.push({ id: document.id, ...document.data() });
                })

                const shuffledDeck = [...flashcards].sort(() => Math.random() - 0.5)

                setFlashcards(flashcards);
                setShuffledDeck(shuffledDeck);
                setCurrentIndex(0);
                setFlipped(false);
                setUnderstanding("");
                setLoading(false);
                setStartTime(Date.now());
            } catch (error) {
                console.error("Could not retrieve flashcards:", error);
                setLoading(false);
            }
        }
        getFlashcardDeck();
    }, [user, flashcardDeckId]);

    useEffect(() => {
        if (isFinished && startTime) {
            const endTime = Date.now();
            setTotalTime((endTime - startTime) / 1000);
        }
    }, [isFinished, startTime]);

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

    const currentFlashcard = shuffledDeck[currentIndex];

    const handleTryAgain = () => {
        const shuffledDeck = [...flashcards].sort(() => Math.random() - 0.5)
        setShuffledDeck(shuffledDeck);
        setCurrentIndex(0);
        setFlipped(false);
        setShowLevels(false);
        setIsFinished(false);
        setCardsRepeated(0);
        setUnderstanding("");
        setLoading(false);
        setTotalTime(0);
        setStartTime(Date.now());
    }

    const handleShowLevels = () => {
        setFlipped(!flipped);
        if(!showLevels) {
            setShowLevels(true);
        }
    }

    function handleUnderstandingSelection(level) {
        setUnderstanding(level);
    }

    const handleSelectNext = () => {
        setFlipped(false);
        setUnderstanding("");
        setShowLevels(false);

        let deck = [...shuffledDeck];
        if (understanding === "know") {
            deck.splice(currentIndex, 1);
        } else if (understanding === 'study') {
            const card = deck.splice(currentIndex, 1)[0];
            deck.push(card);
            setCardsRepeated(prevCards => prevCards + 1)
        }
        if (deck.length === 0) {
            setIsFinished(true);
            return;
        }

        setShuffledDeck(deck);
        setCurrentIndex(prevIndex => {
            if (prevIndex >= deck.length) {
                return deck.length - 1;
            }
            return prevIndex;
        });
    }

    if (isFinished) {
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
            <Typography sx={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> Great Job! </Typography>
            <Box sx={{ mt: 4, mx: 'auto', width: 1200, minHeight: 600, borderRadius: 10, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)',  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pb: 4 }} >
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> You have completed learning this deck! </Typography>
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> Total Time Spent: {totalTime} seconds </Typography>
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> Number of Cards Repeated: {cardsRepeated} </Typography>
                <Button variant="contained" onClick={handleTryAgain} sx={{ borderRadius: 3, mt: 2, fontSize: 15, textTransform: 'none', backgroundColor: 'black' }}> Try Again </Button>
                <Button variant="contained" onClick={() => router.push("/view_flashcards")} sx={{ borderRadius: 3, mt: 2, fontSize: 15, textTransform: 'none', backgroundColor: 'black' }}> Exit Learning </Button>
            </Box>
            </Box>
        );
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
            <Typography sx={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> Learn Mode </Typography>
            <Box sx={{ mt: 4, mx: 'auto', width: 1200, minHeight: 600, borderRadius: 10, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)',  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pb: 4 }} >
                <Box key={currentFlashcard.id} onClick={handleShowLevels} sx={{ perspective: 1000, mb: 5, width: 700, height: 300 }} >
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
                {showLevels && (
                    <>
                        <Typography sx={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                            How familiar are you with this?
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 4, mb: 5 }} >
                            <Button 
                                variant={understanding === 'know' ? 'contained' : 'outlined'}
                                color="success"
                                onClick={() => handleUnderstandingSelection('know')}
                                sx={{ mt: 2, textTransform: 'none', fontSize: 15, borderRadius: 3 }}
                            >
                                I know this!
                            </Button>
                            <Button 
                                variant={understanding === 'study' ? 'contained' : 'outlined'}
                                color="error"
                                onClick={() => handleUnderstandingSelection('study')}
                                sx={{ mt: 2, textTransform: 'none', fontSize: 15, borderRadius: 3 }}
                            >
                                Not too familiar
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex' }} >
                            <Button
                                variant="contained"
                                disabled={!understanding}
                                onClick={handleSelectNext}
                                sx={{ textTransform: 'none', backgroundColor: "black", color: "white", borderRadius: 2 }}
                            >
                                Next Card
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 2 }} >
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/view_flashcards")}
                                sx={{ textTransform: 'none', borderRadius: 2, borderColor: 'black', color: 'black' }}
                            >
                                Exit Learning
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}
