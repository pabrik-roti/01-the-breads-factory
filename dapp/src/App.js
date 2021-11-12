import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import g1 from "./assets/images/rotilogo.gif";
import g2 from "./assets/images/anthropophobia.png";
import g3 from "./assets/images/hashlips.png";
// import g4 from "./assets/images/...";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :hover {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
  border: solid;
  border-color: var(--light-grey);
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--green);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Today is your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Please wait! Minting the Logo...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "474747",
        to: "0x6710E0f18270bE32F9590503E306997B3162B83e",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.3 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, it's just premenstrual syndrome. Please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Alright! You now own one of the Logo. You can mint more."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.SpacerLarge />
        <s.TextTitle style={{ textAlign: "center", fontSize: 37, fontWeight: "bold" }}>
          Logo Pabrik Roti (LPR)
        </s.TextTitle>
        <s.SpacerXSmall />
        <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
          Logo Pabrik Roti is the Logo of The Breads Factory,
          an NFT project by&nbsp;
            <StyledLink
              target={"_blank"}
              title={"All Repositories"}
              href={"https://linktr.ee/pabrikroti.idn"}
              rel={"noreferrer"}
            >
              PabrikRoti.IDN&nbsp;
            </ StyledLink>
          in Polygon (Matic) blockchain
          which is also termed as The Breads Factory: Logo 10k.
          There is ten thousand (10000) unique logo in this NFT project
          that builds generatively from Her 50 different assets.
          May you be the lucky ones, you get Her rarest assets.
          If so, it's up to you. You can love it, keep it, or sell it.
          Just don't forget Her and Hers who have developed you.
        </s.TextDescription>
        <s.SpacerXSmall />
        <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
          The complete story can be read here:<br />
          <StyledLink
            target={"_blank"}
            title={"The Breads Factory"}
            href={"https://github.com/pabrik-roti/01-the-breads-factory/wiki"}
            rel={"noreferrer"}
          >
            PabrikRoti.IDN Wiki
          </ StyledLink>
        </s.TextDescription>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"Logo Pabrik Roti - Preview"} src={g1} />
            <s.SpacerSmall />
            <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
              Smart contract:<br />
              <StyledLink
                target={"_blank"}
                title={"Verified Smart Contract"}
                href={"https://polygonscan.com/token/0x6710E0f18270bE32F9590503E306997B3162B83e"}
                rel={"noreferrer"}
              >
                {truncate("0x6710E0f18270bE32F9590503E306997B3162B83e", 9)}
              </ StyledLink>
            </s.TextDescription>
          </s.Container>
          <s.SpacerMedium />
          <s.Container flex={1} jc={"center"} ai={"center"} style={{ backgroundColor: "var(--dark-widow)", padding: 24 }}>
          {blockchain.account === "" || blockchain.smartContract === null ? (
            <>
            
              <s.TextTitle style={{ textAlign: "center", fontSize: 27, fontWeight: "bold" }}>
                0.3 Matic/1 LPR
              </s.TextTitle>
              <s.SpacerXSmall />
              <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
                1 LPR costs 0.3 Matic. Excluding gas fee.
              </s.TextDescription>
              <s.SpacerSmall />
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }}
              >
                CONNECT WALLET
              </StyledButton>
              {blockchain.errorMsg !== "" ? (
                <>        
                  <s.SpacerXSmall />
                  <s.TextDescription style={{ textAlign: "center" }}>
                      {blockchain.errorMsg}
                  </s.TextDescription>
                </>        
              ) : null}
              <s.SpacerXSmall />
              <s.TextDescription style={{ textAlign: "center" }}>
              Don't have wallet?&nbsp;
                <StyledLink 
                  target={"_blank"}
                  title={"Download MetaMask wallet"}
                  href={"https://metamask.io/download.html"}
                  rel={"noreferrer"}
                >
                  Download here!
                </ StyledLink>
              </s.TextDescription>
              <s.SpacerXSmall />
              <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
                Connect to the Polygon (Matic) Mainnet network.
              </s.TextDescription>
              <s.SpacerSmall />
                </>
          ) : (
<>
              {Number(data.totalSupply) <= 10000 ? (
                <>
                  <s.TextTitle style={{ textAlign: "center", fontSize: 27, fontWeight: "bold" }}>
                    {data.totalSupply}/10000
                  </s.TextTitle>
                  <s.SpacerXSmall />
                  <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
                    1 LPR costs 0.3 Matic. Excluding gas fee.
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <StyledButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs(1);
                      getData();
                    }}
                  >
                    {claimingNft ? "BUSY MINTING" : "MINTING LOGO"}
                  </StyledButton>
                  <s.SpacerXSmall />
                  <s.TextDescription style={{ textAlign: "center" }}>
                    {feedback}
                  </s.TextDescription>
                  <s.SpacerXSmall />
                  <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
                    Lazy minting is available, while supplies last.
                  </s.TextDescription>
              <s.SpacerSmall />
                </>
              ) : (
                <>
                  <s.TextTitle style={{ textAlign: "center", fontSize: 27, fontWeight: "bold" }}>
                    SOLD OUT.
                  </s.TextTitle>
                  <s.SpacerXSmall />
                  <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
                    The Logo already sold out.
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <StyledButton
                    onClick={(e) => {
                      window.open("https://opensea.io/collection/logo-pabrik-roti");
                    }}
                  >
                    GO TO OPENSEA.IO
                  </StyledButton>
                  <s.SpacerXSmall />
                  <s.TextDescription style={{ textAlign: "center" }}>
                  The largest NFT marketplace.
              </s.TextDescription>
              <s.SpacerXSmall />
                  <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
                    You can still find, and buy Her on OpenSea.IO marketplace.
                  </s.TextDescription>
                  <s.SpacerSmall />
                </>
              )}
</>
          )}

          <s.TextDescription style={{ textAlign: "center", fontSize: 12 }}>
          Please make sure you are connected to the Polygon (Matic) Mainnet)
          and use your correct wallet address.
          The gas limit is already set to 474747 for this contract.
          But, if you want to change gas limit, you can set it higher to successfully mint your NFT.
          Once you success mint your NFT, you cannot undo this action.
          </s.TextDescription>
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.TextTitle  style={{ textAlign: "center", fontSize: 27 }}>
          Thanks to:
        </s.TextTitle>
        <s.SpacerXSmall />
        <s.Container jc={"center"} ai={"center"} fd={"row"} style={{ width: "70%" }}>
          <StyledLink
            target={"_blank"}
            href={"https://b2c1.straight-line.org/"}
            rel={"noreferrer"}
          >
            <StyledImg 
              alt={"anthropophobia"} 
              title={"Anthropophobia Viruses"} 
              src={g2}
              style={{ width: "47px", height: "47px" }}
            />
          </StyledLink>
          <s.SpacerSmall />
          <StyledLink
            target={"_blank"}
            href={"https://hashlips.online/HashLips"}
            rel={"noreferrer"}
          >
            <StyledImg 
              alt={"hashlips"} 
              title={"HashLips"} 
              src={g3}
              style={{ width: "47px", height: "47px" }}
            />
          </StyledLink>
        </s.Container>
        <s.SpacerSmall />
        <s.TextDescription style={{ textAlign: "center", fontSize: 17 }}>
          Kondom Berduri! © 2021 by&nbsp;
            <StyledLink 
              title={"Pabrik Roti - The Breads Factory"}
              target={"_blank"} 
              href={"https://linktr.ee/pabrikroti.idn"} 
              rel={"noreferrer"}
            >
              Pabrik Roti Indonesia
            </StyledLink>
        </s.TextDescription>
        <s.SpacerLarge />
      </s.Container>
    </s.Screen>
  );
}

export default App;
