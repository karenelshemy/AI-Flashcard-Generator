'use client' 
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, Divider, IconButton, Paper, Toolbar, TextField, Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'


export default function CreateFlashcards() {
    const { isSignedIn, user, isLoaded } = useUser(); 
    const router = useRouter();
    const [deckName, setDeckName] = useState("");
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router])

    function handleUpdateName(event) {
        setDeckName(event.target.value);
    }

    const handleNewCard = () => {
        setFlashcards([...flashcards, { front: ' ', back: ' '}])
    }

    function handleUpdateCard(index, side, text) {
        const cards = [...flashcards];
        cards[index][side] = text;
        setFlashcards(cards);
    }

    function handleDeleteCard(index) {
        const cards = [...flashcards];
        cards.splice(index, 1);
        setFlashcards(cards);
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
                <Typography sx={{ ml: 2, fontSize: 40, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> Create Your Own Flashcards </Typography>
                <Box sx={{ mt: 4, mx: 'auto', width: 1200, minHeight: 600, borderRadius: 10, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)',  display: 'flex', flexDirection:'column', gap: 2, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', borderRadius: 5, mt: 2 }} 
                        >
                            <TextField 
                                placeholder="Deck Name" 
                                value={deckName}
                                onChange={handleUpdateName}
                                sx={{
                                    width: 700,
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    '& .MuiOutlinedInput-notchedOutline' : {
                                        border: 'none'
                                    },
                                    '& input': {
                                        fontSize: 20, 
                                        fontWeight: 600,
                                        padding: '17px 20px'
                                    }
                                }}
                            />
                    </Box>
                    {flashcards.map((flashcard, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%', px: 2 }}
                        >
                            <Paper sx={{ width: 900, p: 2, borderRadius: 3, display: 'flex', flex: 1 }}
                            >
                                <Box sx={{ display: 'flex', flex: 1 }} >
                                    <Box sx={{ flex: 1, mr: 2 }} >
                                        <Typography sx={{ fontSize: 15, fontWeight: 'bold', mb: 1 }}> FRONT </Typography>
                                        <TextField
                                            multiline
                                            rows={3}
                                            fullWidth
                                            value={flashcard.front}
                                            onChange={(event) => handleUpdateCard(index, 'front', event.target.value)}
                                        />
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box sx={{ flex: 1, ml: 2 }}>
                                        <Typography sx={{ fontSize: 15, fontWeight: 'bold', mb: 1 }}> BACK </Typography>
                                        <TextField
                                            multiline
                                            rows={3}
                                            fullWidth
                                            value={flashcard.back}
                                            onChange={(event) => handleUpdateCard(index, 'back', event.target.value)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                            <IconButton sx={{ ml : 1 }} onClick={() => handleDeleteCard(index)} >
                                <DeleteIcon fontSize="large" sx={{ color: 'black' }} /> 
                            </IconButton>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <IconButton 
                            onClick={handleNewCard}
                            sx={{ 
                                backgroundColor: 'white',
                                width: 60, 
                                height: 60,
                                color: 'black'
                            }}
                            >
                                <AddCircleOutlineIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <Button 
                        variant="contained"
                        disabled={!deckName.trim()}
                        sx={{ 
                            mt: 1, 
                            alignSelf: 'center',
                            backgroundColor: 'black',
                            fontSize: 15,
                            width: 120, 
                            height: 40,
                            borderRadius: 3,
                            textTransform: 'none'
                    }}
                    >   
                        Save Deck
                    </Button>
                </Box>
            </Box>
    )
}