import React, { useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import './App.css';
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
//import { ethers } from 'ethers'
import { AppBar, Box, Button, Fab, Grid, Toolbar, Typography } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Image from "mui-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Follow } from 'react-twitter-widgets';

const theme = createTheme({
    typography: {
        fontFamily: 'Omiwa, Arial',
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

const injected = injectedModule()

const rpcUrl = `https://api.avax.network/ext/bc/C/rpc`

// initialize Onboard
init({
  wallets: [injected],
  chains: [
            {
      id: '0xa86a',
      token: 'AVAX',
      label: 'Avalanche Mainnet',
      rpcUrl
    }
  ]
})

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [width, setWidth]   = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // create an ethers provider
  //let ethersProvider, signer;

  if (wallet) {
    //ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
    //signer = ethersProvider.getSigner();
  }

  const gotoURL = (url) => {
    window.location.href = url;
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
                            disabled
                            variant="contained"
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
                          The OG PFP of Avalanche
                      </Typography>
                  </Grid>
              </Grid>
          </Box>
            <Box sx={{ width: '90%', margin: 'auto', mt: 3, maxWidth: 600 }}>
                <Grid container sx={{padding: 0}}>
                    <Grid item xs={4} display="flex" justifyContent="center">
                        <Fab
                            variant="extended"
                            sx={{width: '90%'}}
                            color="warning"
                            onClick={() => gotoURL('https://campfire.exchange/collections/0x6d5087b3082f73d42a32d85e38bc95dccede39bb')}
                        >
                            <img id="campfire" src="./images/campfire-log-black.png" height="30px" className="buttonIcon" alt="Campfire Logo"/>
                            Campfire
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
                            Legacy
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
                            Discord
                        </Fab>
                    </Grid>
                    <Grid item xs={12}>
                        <img src="/images/ape-summit.png" height="100%" width="100%" alt="Ape Summit 2023"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" sx={{overflowWrap: 'break-word'}}>
                            The Avax Apes have worked with prominent artists in the Avalanche ecosystem to bring you
                            limited edition NFTs for Avalanche Summit II
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: '90%', margin: 'auto', mt: 3, maxWidth: 600 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <Typography variant="h4" sx={{overflowWrap: 'break-word'}}>
                            Current Edition
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Image  id="wrap" src="/images/poster.png" height="100%" width="100%" alt="Example Poster"/>
                    </Grid>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <Fab
                            variant="extended"
                            sx={{width: '50%', mt:2}}
                            /*onClick={() => gotoURL('#faq')}*/
                            color="warning"
                        >
                            Mint
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
                        <Typography>When did the Avax Apes mint?</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                        <p className="otherFont">
                            The Avax Apes minted on September 1, 2021.
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{backgroundColor: '#FFAD06'}}
                    >
                        <Typography>What happened to the devs?</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                        <p className="otherFont">
                            After the original roadmap was delivered, the devs developed the nasty habit of
                            disappearing for months at time. This has caused some to consider the Avax Apes a rugged
                            project, but we politely disagree.
                        </p>
                        <p className="otherFont">
                            The Avax Apes have been a community-run project since nearly the very beginning, and despite
                            the original devs being AWOL The Apes have remained a strong presence within the
                            Avalanche ecosystem. A true social club where you can find a representative from nearly
                            every well-known project on Avalanche.
                        </p>
                        <p className="otherFont">
                            The community has control over all socials and the NFT contract, but does not
                            control the legacy website or internal marketplace.
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        sx={{backgroundColor: '#FFAD06'}}
                    >
                        <Typography>What is Alpha Chat?</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: '#FFAD06'}}>
                        <p className="otherFont">
                            The Avax Apes Alpha Chat is a token-gated &nbsp;
                            <Link href="https://discord.gg/YPuaQwwRmh" target="_blank" rel="_norefferer">Discord</Link>&nbsp;
                            channel where you can get information on all things Avalanche (as well as other chains).
                        </p>
                        <p className="otherFont">
                            A place where you can rub elbows with Avalanche veterans who have been here since the
                            beginning. If you are looking for a place where you can pick the brains of people who have
                            seen and done it all in web3, The Avax Apes Alpha Chat is where you should be.
                        </p>
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
