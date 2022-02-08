import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { client } from "../../apollo-client/apollo-client";
import TOKEN_BALANCE from "../../../graphql/token-balance";
import NFT_BALANCE from "../../../graphql/nft-balance";
import { FaWallet, FaChevronDown } from "react-icons/fa";
import { RiLogoutCircleRLine, RiSettings4Fill } from "react-icons/ri";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Flex,
  Icon,
  Spacer,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { ethereum, BlockchainNetwork } from "../../../common/types";

type UserBalances = {
  native: string;
  dapp: string;
  nft: string;
};

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

const dappNetwork: BlockchainNetwork = {
  chainId: "0x61",
  chainName: "Binance Testnet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-2-s2.binance.org:8545/"],
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
};

async function fetchUserBalances(wallet: string, setUserBalances: any) {
  const formatValue = (value: BigNumber): string => {
    let formattedValue: string = ethers.utils.formatEther(value);

    const splitValue: string[] = formattedValue.split(".");

    formattedValue = `${splitValue[0]}.${splitValue[1].slice(0, 4)}`;

    return formattedValue;
  };

  const userBalances: UserBalances = {
    native: formatValue(await provider.getBalance(wallet)),
    dapp: formatValue(
      (
        await client.query({
          query: TOKEN_BALANCE,
          variables: { address: wallet },
        })
      ).data.LGNDbalanceOf.balance
    ),
    nft: (
      await client.query({
        query: NFT_BALANCE,
        variables: { address: wallet },
      })
    ).data.NFTbalanceOf.balance.toString(),
  };

  console.log(userBalances);

  setUserBalances(userBalances);
}

async function handleDisconnection(setUserWallet: any) {
  const accounts = await ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });

  const wallet: string = accounts[0];

  setUserWallet(wallet);
}

const ConnectedMenu = ({ walletAddress, setUserWallet }: any) => {
  const [userBalances, setUserBalances] = useState<UserBalances | undefined>();

  const displayWallet: string = `0x...${walletAddress.slice(-4)}`;

  useEffect(() => {
    fetchUserBalances(walletAddress, setUserBalances);
  }, []);

  return (
    <Flex align="center">
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          color="white"
          fontSize="md"
          borderRadius={30}
          background="blue.600"
          leftIcon={<FaWallet />}
          rightIcon={<FaChevronDown />}
          _hover={{ background: "blue.300" }}
        >
          {displayWallet}
        </MenuButton>
        <MenuList borderRadius={20}>
          <MenuGroup>
            <MenuItem _hover={{ background: "none", cursor: "auto" }}>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                {dappNetwork.nativeCurrency.symbol}
              </Text>
              <Spacer />
              {userBalances?.native ? (
                <Text>{userBalances?.native}</Text>
              ) : (
                <Spinner color="blue.500" />
              )}
            </MenuItem>
            <MenuItem _hover={{ background: "none", cursor: "auto" }}>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                LGND
              </Text>
              <Spacer />
              {userBalances?.dapp ? (
                <Text>{userBalances?.dapp}</Text>
              ) : (
                <Spinner color="blue.500" />
              )}
            </MenuItem>
            <MenuItem _hover={{ background: "none", cursor: "auto" }}>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                NFTs
              </Text>
              <Spacer />
              {userBalances?.nft ? (
                <Text>{userBalances?.nft} Legends</Text>
              ) : (
                <Spinner color="blue.500" />
              )}
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem _hover={{ background: "none" }}>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                Profile
              </Text>
              <Spacer />
              <Icon as={RiSettings4Fill} w={5} h={5} color="gray.500" />
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem
              onClick={() => handleDisconnection(setUserWallet)}
              _hover={{ background: "none" }}
            >
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                Disconnect Wallet
              </Text>
              <Spacer />
              <Icon as={RiLogoutCircleRLine} w={5} h={5} color="red.500" />
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ConnectedMenu;
