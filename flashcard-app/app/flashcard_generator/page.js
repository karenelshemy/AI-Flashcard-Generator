'use client' 
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, CircularProgress, Toolbar, TextField, Typography} from "@mui/material";

export default function FlashcardGenerator() {
    const { isSignedIn, user, isLoaded } = useUser(); 
    const router = useRouter();
    const [file, setFile] = useState("");
    const [topic, setTopic] = useState("");
    const [count, setCount] = useState("");
    const [isCountIncorrect, setIsCountIncorrect] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router])

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
    
    function handleSelectFile(event) {
        const file = event.target.files[0];
        if (file.type !== "application/pdf") {
            window.alert("File must be a .pdf.");
            return;
        }
        if (file.size > (2 * (1024 * 1024))) {
            window.alert("File must be of size 2 MB.");
            return;
        }
        setFile(file);
    }

    const handleRemoveFile = () => {
        setFile("");
    }
    
    function handleUpdateTopic(event) {
        setTopic(event.target.value);
    }

    function handleCount(event) {
        let number = event.target.value;
        if (number === "") {
            setCount("");
            setIsCountIncorrect(false);
            return
        }

        if(!/^\d+$/.test(number)) {
            setCount(number);
            setIsCountIncorrect(true);
            return;
        }

        number = Number(number);

        if (number < 1) {
            setCount(number);
            setIsCountIncorrect(true);
            return;
        } else if (number > 25) {
            setCount(number);
            setIsCountIncorrect(true);
            return;
        }

        setCount(number);
        setIsCountIncorrect(false);
    }

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
            <Typography sx={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', mt: 5 }}> AI Flashcard Generator </Typography>
            <Box sx={{ mt: 3, height: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ width: 1000, height: 600, borderRadius: 10, background: 'linear-gradient(to bottom right, #89CFF0, #A084E8)',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ width: 950, height: 550, backgroundColor: 'white', borderRadius: 10 }} > 
                        <Box component="form" sx={{ mt: 2 }}>
                            <Box sx={{ width: '100%', width: 900, mx: 'auto' }} >
                                <TextField 
                                    name="topic"
                                    fullWidth
                                    label="What do you want to study?"
                                    value={topic}
                                    onChange={handleUpdateTopic}
                                    multiline
                                    rows={6}
                                    disabled={!!file}
                                    slotProps={{ 
                                        input: {
                                            sx: { borderRadius: 4 }
                                        }
                                    }}
                                />
                                <Box sx={{ mt: 3, width: 900, height: 10, backgrounColor: 'black', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    <Typography sx={{ fontSize: 20, color: 'black'}}> OR </Typography>
                                </Box>
                                <Box sx={{ mt: 4, width: '100%', width: 900, height: 100, border: 2, borderRadius: 4, borderColor: 'gray', borderStyle: 'dotted', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, opacity: topic ? 0.5 : 1, pointerEvents: topic ? 'none' : 'auto'}} >
                                    {!file && (
                                        <>
                                        <Typography sx={{ fontSize: 18 }}> Upload File (max: 2MB) </Typography>
                                        <Button variant="contained" component="label" sx={{ fontSize: 12, textTransform: 'none' }} 
                                        > 
                                            Select File
                                            <input 
                                                type="file"
                                                accept="application/pdf"
                                                hidden
                                                onChange={handleSelectFile}
                                            />
                                        </Button>
                                        </>
                                    )}

                                    {file && (
                                        <>
                                        <Typography sx={{ fontSize: 18 }}> Uploaded: {file.name} </Typography>
                                        <Button variant="contained" component="label" onClick={handleRemoveFile} sx={{ fontSize: 12, textTransform: 'none', backgroundColor: '#B8381D' }}
                                        >
                                            Remove File
                                        </Button>
                                        </>
                                    )}
                                </Box>
                                <Box sx={{ mt: 4, width: '100%'}}>
                                    <TextField 
                                        name="count"
                                        label="Number of Flashcards" 
                                        type="text" 
                                        value={count} 
                                        fullWidth
                                        onChange={handleCount}
                                        error={isCountIncorrect}
                                        helperText={isCountIncorrect ? "Please enter a number between 1 and 25." : "Choose a number between 1 and 25." }
                                        slotProps={{ 
                                        input: {
                                            sx: { borderRadius: 4 }
                                        }
                                    }}
                                    />
                                </Box>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} >
                                    <Button 
                                        variant="contained" 
                                        component="label" 
                                        disabled={(!topic && !file) || isCountIncorrect || count === ""}
                                        sx={{ fontSize: 16, height: 45, textTransform: 'none', borderRadius: 4, backgroundColor: 'black' }} 
                                    > 
                                        Generate Flashcards 
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}