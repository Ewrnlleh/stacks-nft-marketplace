import {
  StacksTestnet,
  StacksMainnet,
  StacksMocknet,
} from '@stacks/network';
import {
  AnchorMode,
  PostConditionMode,
  makeContractCall,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  broadcastTransaction,
  makeContractSTXPostCondition,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  NonFungibleConditionCode,
} from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';

// Network configuration
export const getNetwork = () => {
  const networkType = process.env.NEXT_PUBLIC_NETWORK || 'testnet';
  
  switch (networkType) {
    case 'mainnet':
      return new StacksMainnet();
    case 'testnet':
      return new StacksTestnet();
    case 'devnet':
    case 'mocknet':
      return new StacksMocknet();
    default:
      return new StacksTestnet();
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
    { type: 'ascii', value: name },
    { type: 'ascii', value: description },
    { type: 'ascii', value: imageUrl },
    { type: 'uint', value: royaltyPercentage * 100 }, // Convert to basis points
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'mint-nft',
    functionArgs,
    senderKey: process.env.NEXT_PUBLIC_PRIVATE_KEY || '',
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  try {
    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, CONTRACT_CONFIG.network);
    return broadcastResponse;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
};

// List NFT for sale
export const listNFT = async (
  tokenId: number,
  priceInStx: number,
  senderAddress: string
) => {
  const functionArgs = [
    { type: 'uint', value: tokenId },
    { type: 'uint', value: stxToMicroStx(priceInStx) },
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'list-nft',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    postConditions: [
      makeStandardNonFungiblePostCondition(
        senderAddress,
        NonFungibleConditionCode.Sends,
        createAssetInfo(CONTRACT_CONFIG.contractAddress, CONTRACT_CONFIG.contractName, 'stacks-nft'),
        { type: 'uint', value: tokenId }
      ),
    ],
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
  const priceInMicroStx = stxToMicroStx(priceInStx);
  
  const functionArgs = [
    { type: 'uint', value: tokenId },
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'purchase-nft',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    postConditions: [
      makeStandardSTXPostCondition(
        buyerAddress,
        FungibleConditionCode.Equal,
        priceInMicroStx
      ),
      makeContractSTXPostCondition(
        CONTRACT_CONFIG.contractAddress,
        CONTRACT_CONFIG.contractName,
        FungibleConditionCode.Equal,
        priceInMicroStx
      ),
    ],
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
  const bidAmountInMicroStx = stxToMicroStx(bidAmountInStx);
  
  const functionArgs = [
    { type: 'uint', value: tokenId },
    { type: 'uint', value: bidAmountInMicroStx },
    { type: 'uint', value: expirationBlocks },
  ];

  const txOptions = {
    contractAddress: CONTRACT_CONFIG.contractAddress,
    contractName: CONTRACT_CONFIG.contractName,
    functionName: 'place-bid',
    functionArgs,
    network: CONTRACT_CONFIG.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    postConditions: [
      makeStandardSTXPostCondition(
        bidderAddress,
        FungibleConditionCode.Equal,
        bidAmountInMicroStx
      ),
    ],
  };

  return openContractCall(txOptions);
};

// Accept bid
export const acceptBid = async (
  tokenId: number,
  ownerAddress: string
) => {
  const functionArgs = [
    { type: 'uint', value: tokenId },
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
    { type: 'uint', value: tokenId },
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
