// Stacks blockchain interaction utilities
import { STACKS_TESTNET, STACKS_MAINNET, STACKS_MOCKNET } from '@stacks/network';
import {
  AnchorMode,
  PostConditionMode,
  makeContractCall,
  PostCondition,
  FungibleConditionCode,
  broadcastTransaction,
  NonFungibleConditionCode,
  stringAsciiCV,
  uintCV,
} from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';

// Network configuration
export const getNetwork = () => {
  const networkType = process.env.NEXT_PUBLIC_NETWORK || 'testnet';
  
  switch (networkType) {
    case 'mainnet':
      return STACKS_MAINNET;
    case 'testnet':
      return STACKS_TESTNET;
    case 'devnet':
    case 'mocknet':
      return STACKS_MOCKNET;
    default:
      return STACKS_TESTNET;
  }
};

// Contract configuration
export const CONTRACT_CONFIG = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractName: 'nft-marketplace',
  network: getNetwork(),
};

// Convert STX to microSTX
export const stxToMicroStx = (stx: number): number => {
  return Math.floor(stx * 1000000);
};

// Convert microSTX to STX
export const microStxToStx = (microStx: number): number => {
  return microStx / 1000000;
};

// Mint NFT function
export const mintNFT = async (
  name: string,
  description: string,
  imageUrl: string,
  royaltyPercentage: number,
  senderAddress: string
) => {
  const functionArgs = [
    stringAsciiCV(name),
    stringAsciiCV(description),
    stringAsciiCV(imageUrl),
    uintCV(royaltyPercentage * 100), // Convert to basis points
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'mint-nft',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  return openContractCall(txOptions);
};

// List NFT for sale
export const listNFT = async (
  tokenId: number,
  priceInStx: number,
  senderAddress: string
) => {
  const functionArgs = [
    uintCV(tokenId),
    uintCV(stxToMicroStx(priceInStx)),
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'list-nft',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  return openContractCall(txOptions);
};

// Purchase NFT
export const purchaseNFT = async (
  tokenId: number,
  priceInStx: number,
  sellerAddress: string,
  buyerAddress: string
) => {
  const functionArgs = [
    uintCV(tokenId),
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'purchase-nft',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  return openContractCall(txOptions);
};

// Place bid on NFT
export const placeBid = async (
  tokenId: number,
  bidAmountInStx: number,
  expirationBlocks: number,
  bidderAddress: string
) => {
  const functionArgs = [
    uintCV(tokenId),
    uintCV(stxToMicroStx(bidAmountInStx)),
    uintCV(expirationBlocks),
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'place-bid',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  return openContractCall(txOptions);
};

// Accept bid
export const acceptBid = async (
  tokenId: number,
  ownerAddress: string
) => {
  const functionArgs = [
    uintCV(tokenId),
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'accept-bid',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  return openContractCall(txOptions);
};

// Remove listing
export const unlistNFT = async (
  tokenId: number,
  ownerAddress: string
) => {
  const functionArgs = [
    uintCV(tokenId),
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'unlist-nft',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  return openContractCall(txOptions);
};

// Helper function to format Stacks address
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Helper function to format STX amount
export const formatSTX = (microStx: number): string => {
  const stx = microStxToStx(microStx);
  return `${stx.toLocaleString()} STX`;
};
