export interface NFT {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  owner: string;
  creator: string;
  price?: number;
  isListed: boolean;
  listingId?: string;
  royaltyPercentage: number;
  metadata: {
    attributes: Array<{
      trait_type: string;
      value: string | number;
    }>;
    external_url?: string;
  };
  createdAt: string;
  lastSale?: {
    price: number;
    buyer: string;
    seller: string;
    timestamp: string;
  };
}

export interface Listing {
  id: string;
  nftId: string;
  seller: string;
  price: number;
  currency: 'STX';
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface Bid {
  id: string;
  nftId: string;
  bidder: string;
  amount: number;
  currency: 'STX';
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
}

export interface User {
  address: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  verified: boolean;
  joinedAt: string;
  stats: {
    nftsOwned: number;
    nftsCreated: number;
    totalSales: number;
    totalPurchases: number;
  };
}

export interface ContractCallResponse {
  txid: string;
  success: boolean;
  error?: string;
}

export interface WalletConnection {
  isConnected: boolean;
  address?: string;
  network: 'mainnet' | 'testnet' | 'devnet';
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  volume24h: number;
  contractAddress: string;
}
