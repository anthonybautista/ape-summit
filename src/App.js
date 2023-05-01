import React, {useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import './App.css';
import { init, useConnectWallet } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { AppBar, Box, Button, Fab, Grid, Toolbar, Typography } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Image from "mui-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Follow } from 'react-twitter-widgets';
import {ethers} from "ethers";
import ABI from './junk/abi.json';

const theme = createTheme({
    typography: {
        fontFamily: 'Omiwa, Arial'
    },
    palette: {
        primary: {
            main: '#E33C3D',
        },
        warning: {
            main: '#F2B500',
        },
        action: {
            disabledBackground: '#EFCCA2',
        }
    },
});

const edToArtist = {
    1: "COSTO BRAVO",
    2: "BRIE",
    3: "TAPTAPKABOOM",
    4: "EVE",
    5: "NOTWARHOL"
}

const cAdd = "0x89492b41247AD57FDCBc7076b57bE0bfb6b4Dd4D";

const injected = injectedModule()

const rpcUrl = `https://api.avax.network/ext/bc/C/rpc`
//const rpcUrl = `https://api.avax-test.network/ext/bc/C/rpc`

// initialize Onboard
init({
    wallets: [injected],
    chains: [
        {
            id: '0xa86a',
            //id: '0xa869',
            token: 'AVAX',
            label: 'Avalanche Mainnet',
            rpcUrl
        }
    ],
    appMetadata: {
        name: 'Ape Summit 2023',
        icon: 'data:image/png;base64,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',
        description: 'Avax Apes Summit Editions 2023',
        recommendedInjectedWallets: [
            { name: 'Core', url: 'https://core.app' },
            { name: 'MetaMask', url: 'https://metamask.io' }
        ]
    }
})

function App() {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    const [width, setWidth]   = useState(window.innerWidth);
    const [currEd, setCurrEd] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        async function fetchData(provider, contract) {
            await contract.currentId().then(x => {
                setCurrEd(Number(x));
            })
            await contract["open"]().then(io => {
                setIsOpen(io);
            })
        }
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(cAdd, ABI, provider);
        fetchData(provider, contract);
    }, [isOpen, currEd]);

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // create an ethers provider
    let ethersProvider, signer;

    if (wallet) {
        ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
        signer = ethersProvider.getSigner();
    }

    const mint = async () => {
        signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(cAdd, ABI, signer);

        try {
            const tx = await contract.ape();
            setErrorMessage('MINTING');
            const receipt = await tx.wait()
            if (receipt.status) {
                setErrorMessage('SUCCESSFULLY MINTED');
            } else {
                setErrorMessage('MINTING FAILED');
            }
        } catch (e) {
            setErrorMessage(e["reason"]);
        }
    }

    const gotoURL = (url) => {
        window.open(url);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className="App" sx={{ pb: 10 }}>
                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar disableGutters>
                        <Grid container sx={{padding: 0}} alignItems="center">
                            <Grid item xs={3} sm={2} display="flex" justifyContent="center" sx={{pl:2}}>
                                {
                                    width >= 475 ?
                                        <Link href="https://discord.gg/YPuaQwwRmh" target="_blank" rel="_norefferer">
                                            <FontAwesomeIcon icon={faDiscord} color="black" fontSize="32px" className="icons"/>
                                        </Link>
                                        :
                                        ""
                                }
                                <Link href="https://twitter.com/AvaxApesNFT" target="_blank" rel="_norefferer">
                                    <FontAwesomeIcon icon={faTwitter} color="black" fontSize="32px" className="icons"/>
                                </Link>
                            </Grid>
                            <Grid item xs={6} sm={8} display="flex" sx={{ px: 1 }}>
                                <Image
                                    src="/images/logo.png"
                                    heightalt="Avax Apes Logo"
                                    fit="scale-down"
                                    sx={{ maxHeight: 100}}
                                />
                            </Grid>
                            <Grid item xs={3} sm={2} display="flex" justifyContent="center" sx={{ px: 2 }}>
                                <Button
                                    id="connectButton"
                                    variant="contained"
                                    color="warning"
                                    sx={{ minWidth: 100, height: 30}}
                                    onClick={() => (wallet ? disconnect(wallet) : connect())}
                                >
                                    {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: '90%', margin: 'auto', mt: 3, maxWidth: 600 }}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h3" sx={{overflowWrap: 'break-word'}}>
                                THE OG PFP OF AVALANCHE
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ width: '90%', margin: 'auto', mt: 3, maxWidth: 600, position: 'relative' }} zIndex="0">
                    <Grid container sx={{padding: 0}}>
                        <Grid item xs={4} display="flex" justifyContent="center">
                            <Fab
                                variant="extended"
                                sx={{width: '90%'}}
                                color="warning"
                                onClick={() => gotoURL('https://campfire.exchange/collections/0x6d5087b3082f73d42a32d85e38bc95dccede39bb')}
                            >
                                <img id="campfire" src="./images/campfire-log-black.png" height="30px" className="buttonIcon" alt="Campfire Logo"/>
                                CAMPFIRE
                            </Fab>
                        </Grid>
                        <Grid item xs={4} display="flex" justifyContent="center">
                            <Fab
                                variant="extended"
                                sx={{width: '90%'}}
                                onClick={() => gotoURL('https://avaxapes.com')}
                                color="warning"
                            >
                                <img id="legacy" src="./images/small-ape-transparent.png" height="30px" className="buttonIcon" alt="Avax Ape Head"/>
                                LEGACY
                            </Fab>
                        </Grid>
                        <Grid item xs={4} display="flex" justifyContent="center">
                            <Fab
                                variant="extended"
                                sx={{width: '90%'}}
                                onClick={() => gotoURL('https://discord.gg/YPuaQwwRmh')}
                                color="warning"
                            >
                                <FontAwesomeIcon icon={faDiscord} color="black" fontSize="28px" className="buttonIcon"/>
                                DISCORD
                            </Fab>
                        </Grid>
                        <Grid item xs={12}>
                            <img src="/images/ape-summit.png" height="100%" width="100%" alt="Ape Summit 2023"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{overflowWrap: 'break-word'}}>
                                THE AVAX APES HAVE WORKED WITH PROMINENT ARTISTS IN THE AVALANCHE ECOSYSTEM TO BRING YOU
                                LIMITED EDITION NFTS FOR AVALANCHE SUMMIT II
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ width: '90%', margin: 'auto', mt: 3, maxWidth: 600 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <Typography variant="h4" sx={{overflowWrap: 'break-word'}}>
                                CURRENT EDITION BY
                            </Typography>
                            <Typography variant="h5" sx={{overflowWrap: 'break-word'}}>
                                {edToArtist[currEd]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Image  id="wrap" src={`images/posters/${currEd}.png`} height="100%" width="100%" alt="Example Poster"/>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <Typography variant="body1" className="errorText" sx={{overflowWrap: 'break-word'}}>
                                {errorMessage}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <Fab
                                variant="extended"
                                disabled={!isOpen || !wallet}
                                sx={{width: '50%'}}
                                onClick={() => mint()}
                                color="warning"
                            >
                                {isOpen ? "MINT" : "CLOSED"}
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{mt:5, textAlign: 'center'}}>
                    <Follow username="AvaxApesNFT"/>
                </Box>
                <Box sx={{ width: '90%', margin: 'auto', mt: 3, maxWidth: 600 }}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="h4" sx={{overflowWrap: 'break-word', mb: 1}}>
                            FAQ
                        </Typography>
                    </Box>
                    <Accordion id="faq">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{backgroundColor: '#FFAD06'}}
                        >
                            <Typography>WHEN DID THE AVAX APES MINT<span className="otherFont">?</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                            <Typography>
                                THE AVAX APES MINTED ON SEPTEMBER <span className="otherFont">1 , 2021.</span>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            sx={{backgroundColor: '#FFAD06'}}
                        >
                            <Typography>WHAT IS ALPHA CHAT<span className="otherFont">?</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                            <Typography sx={{mb:1}}>
                                THE AVAX APES ALPHA CHAT IS A TOKEN<span className="otherFont">-</span>GATED &nbsp;
                                <Link href="https://discord.gg/YPuaQwwRmh" target="_blank" rel="_norefferer">DISCORD</Link>&nbsp;
                                CHANNEL WHERE YOU CAN GET INFORMATION ON ALL THINGS AVALANCHE <span className="otherFont">
                            (as well as other chains).</span>
                            </Typography>
                            <Typography>
                                A PLACE WHERE YOU CAN RUB ELBOWS WITH AVALANCHE VETERANS WHO HAVE BEEN HERE SINCE THE
                                BEGINNING<span className="otherFont">.</span> IF YOU ARE LOOKING FOR A PLACE WHERE YOU CAN
                                PICK THE BRAINS OF PEOPLE WHO HAVE SEEN AND DONE IT ALL IN web<span className="otherFont">3,</span>&nbsp;
                                THEN THE AVAX APES ALPHA CHAT IS WHERE YOU SHOULD BE<span className="otherFont">.</span>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            sx={{backgroundColor: '#FFAD06'}}
                        >
                            <Typography>WHAT HAPPENED TO THE DEVS<span className="otherFont">?</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                            <Typography sx={{mb:1}}>
                                AFTER THE ORIGINAL ROADMAP WAS DELIVERED<span className="otherFont">,</span> THE DEVS
                                DEVELOPED A NASTY HABIT OF DISAPPEARING FOR MONTHS AT A TIME<span className="otherFont">.</span> &nbsp;
                                THIS HAS CAUSED SOME TO CONSIDER THE AVAX APES A RUGGED PROJECT<span className="otherFont">,</span> &nbsp;
                                BUT WE POLITELY DISAGREE<span className="otherFont">.</span>
                            </Typography>
                            <Typography sx={{mb:1}}>
                                THE AVAX APES HAVE BEEN A COMMUNITY<span className="otherFont">-</span>RUN PROJECT SINCE
                                NEARLY THE VERY BEGINNING<span className="otherFont">,</span> AND DESPITE THE ORIGINAL
                                DEVS BEING AWOL THE APES HAVE REMAINED A STRONG PRESENCE WITHIN THE AVALANCHE ECOSYSTEM
                                <span className="otherFont">.</span> A TRUE SOCIAL CLUB WHERE YOU CAN FIND A REPRESENTATIVE
                                FROM NEARLY EVERY WELL<span className="otherFont">-</span>KNOWN PROJECT ON AVALANCHE<span className="otherFont">.</span>
                            </Typography>
                            <Typography>
                                THE COMMUNITY HAS CONTROL OVER ALL SOCIALS AND THE NFT CONTRACT<span className="otherFont">,</span> BUT DOES NOT CONTROL THE
                                LEGACY WEBSITE OR INTERNAL MARKETPLACE<span className="otherFont">.</span>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            sx={{backgroundColor: '#FFAD06'}}
                        >
                            <Typography>WHY IS THE CONTRACT WEIRD<span className="otherFont">?</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                            <Typography sx={{mb:1}}>
                                THERE IS NOTHING WRONG WITH THE CONTRACT PER SE<span className="otherFont">,</span> BUT
                                THERE IS A SMALL QUIRK THAT PREVENTS APES FROM BEING TRADED ON
                                MOST MARKETPLACES<span className="otherFont">.</span> THIS ISSUE HAS TO DO WITH THE WAY
                                THE CONTRACT HANDLES APPROVALS<span className="otherFont">.</span>
                            </Typography>
                            <Typography sx={{mb:1}}>
                                WHILE MOST NFTS UTILIZE <span className="otherFont">"setApprovalForAll"</span> TO
                                HANDLE APPROVALS<span className="otherFont">,</span> &nbsp;
                                THE AVAX APES CONTRACT SIMPLY USES <span className="otherFont">"approve".</span> THIS IS
                                HARD<span className="otherFont">-</span>CODED INTO THE &nbsp;
                                <span className="otherFont">"_beforeTokenTransfer"</span> FUNCTION OF THE CONTRACT
                                <span className="otherFont">,</span> AND MEANS THAT MARKETPLACES
                                MUST MAKE A SPECIAL ACCOMMODATION TO EXECUTE NON<span className="otherFont">-</span>CUSTODIAL AVAX APE TRANSACTIONS
                                <span className="otherFont">.</span>
                            </Typography>
                            <Typography>
                                AS OF RIGHT NOW THE ONLY MARKETPLACE TO MAKE THIS ACCOMMODATION IS&nbsp;
                                <Link href="https://campfire.exchange/collections/0x6d5087b3082f73d42a32d85e38bc95dccede39bb" target="_blank" rel="_norefferer">
                                    CAMPFIRE</Link><span className="otherFont">.</span>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            sx={{backgroundColor: '#FFAD06'}}
                        >
                            <Typography>WHY CAN<span className="otherFont">'</span>T I BUY ON JOEPEGS<span className="otherFont">?</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                            <Typography sx={{mb:1}}>
                                SEE THE ABOVE SECTION ABOUT OUR CONTRACT<span className="otherFont">.</span>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{mt:10, textAlign: 'center'}}>
                    <Typography>
                        &copy; <span className="otherFont">2023</span> Apelify
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
