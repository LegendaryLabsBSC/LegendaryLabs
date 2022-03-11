import React, { useState, useEffect, useContext } from "react";
import {
  MetaMaskContext,
  MetaMaskContextType,
} from "@/context/metaMaskContext";
import {
  // Button,
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
import { Button } from "@mui/material";
import { RiLogoutCircleRLine, RiSettings4Fill } from "react-icons/ri";
import { FaWallet, FaChevronDown } from "react-icons/fa";

const MetaMaskConnection = () => {
  const { wallet, balances, connectWallet, fetchBalances, dappNetwork } =
    useContext(MetaMaskContext) as MetaMaskContextType;

  const displayWallet: string = `0x...${wallet.slice(-4)}`;

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    fetchBalances();
  }, [wallet]);

  return wallet.length > 0 ? (
    // <ConnectedMenu />
    <Flex align="center">
      <Menu>
        <MenuButton
          // as={Button}
          // size="sm"
          color="success"
          fontSize="md"
          borderRadius={30}
          background="white"
          // leftIcon={<FaWallet />}
          // rightIcon={<FaChevronDown />}
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
              {balances.native.length > 0 ? (
                <Text>{balances?.native}</Text>
              ) : (
                <Spinner color="blue.500" />
              )}
            </MenuItem>
            <MenuItem _hover={{ background: "none", cursor: "auto" }}>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                LGND
              </Text>
              <Spacer />
              {balances.dapp.length > 0 ? (
                <Text>{balances?.dapp}</Text>
              ) : (
                <Spinner color="blue.500" />
              )}
            </MenuItem>
            <MenuItem _hover={{ background: "none", cursor: "auto" }}>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                NFTs
              </Text>
              <Spacer />
              {balances.nft.length > 0 ? (
                <Text>{balances?.nft} Legends</Text>
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
              // onClick={() => handleDisconnection()}
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
  ) : (
    <Button
      // size="sm"
      // color="white"
      color="info"
      variant="contained"
      // fontSize="md"
      // borderRadius={30}
      // background="blue.600"
      onClick={() => connectWallet()}
      // _hover={{ background: "blue.300" }}
    >
      Connect Wallet
    </Button>
  );
};

export default MetaMaskConnection;
