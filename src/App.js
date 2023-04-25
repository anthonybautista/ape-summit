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
                          THE OG PFP OF AVALANCHE
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
                            CURRENT EDITION
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
                            MINT
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
