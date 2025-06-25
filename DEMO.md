# Stacks NFT Marketplace Demo Guide

This guide will walk you through all the features of the NFT marketplace.

## 🚀 Getting Started

### Prerequisites
1. **Hiro Wallet Extension**: Install from [wallet.hiro.so](https://wallet.hiro.so/)
2. **Testnet STX**: Get free testnet STX from the [Stacks faucet](https://explorer.stacks.co/sandbox/faucet)

### Setup Instructions
1. Install Hiro Wallet browser extension
2. Create a new wallet or import existing one
3. Switch to **Stacks Testnet** in wallet settings
4. Visit the [Stacks faucet](https://explorer.stacks.co/sandbox/faucet) to get testnet STX
5. Open the NFT Marketplace at `http://localhost:3001`

## 🏠 Homepage Features

### Hero Section
- **Discover, Create, Trade**: Main call-to-action buttons
- **Bitcoin Security**: Highlighting Stacks' Bitcoin security model
- **Low Fees**: Efficient smart contract transactions
- **Creator Royalties**: Automatic royalty distribution

### Live Statistics
- **Total Volume**: Marketplace trading volume in STX
- **Total Users**: Number of registered users
- **NFTs Listed**: Total NFTs available for purchase
- **Floor Price**: Lowest listed NFT price

### Featured NFTs Grid
- Browse trending and recently listed NFTs
- Interactive NFT cards with hover effects
- Quick view and purchase options

## 🔗 Wallet Integration

### Connect Wallet
1. Click **"Connect Wallet"** in the top navigation
2. Approve connection in Hiro Wallet popup
3. Your address will appear in the navigation bar
4. You can now interact with smart contracts

### Wallet Features
- **Address Display**: Shortened wallet address format
- **Network Detection**: Automatic testnet configuration
- **Session Management**: Persistent wallet connection
- **Disconnect Option**: Clean wallet disconnection

## 🎨 Create NFTs

### Minting Process
1. Navigate to **"Create"** page
2. **Upload Artwork**: Drag & drop or browse for image files
3. **Add Metadata**:
   - **Name**: Unique NFT name (max 64 characters)
   - **Description**: Detailed description (max 256 characters)
   - **Royalty Percentage**: 0-10% creator royalty
4. **Preview**: Review your NFT before minting
5. **Mint**: Confirm transaction in wallet

### Supported Features
- **File Formats**: PNG, JPG, GIF, WEBP
- **File Size**: Up to 100MB
- **Metadata Storage**: On-chain metadata with IPFS support
- **Royalty System**: Automatic royalty distribution

## 🛍️ Marketplace Features

### Browse & Explore
- **Search Bar**: Search NFTs, collections, or creators
- **Filter Options**:
  - Status (Buy Now, On Auction, New, Has Offers)
  - Price Range (Custom or preset ranges)
  - Collections
  - Traits (Background, Rarity, etc.)
- **Sort Options**: Recent, Price (Low/High), Popularity

### NFT Interactions
- **View Details**: Click any NFT to see full details
- **Purchase**: Buy listed NFTs with STX
- **Place Bids**: Submit time-limited bids
- **Like/Favorite**: Save NFTs to favorites

## 💰 Smart Contract Features

### Core Functions
- **mint-nft**: Create new NFTs with metadata
- **list-nft**: List NFTs for sale at fixed price
- **purchase-nft**: Buy listed NFTs with automatic payments
- **place-bid**: Submit time-limited bids with STX escrow
- **accept-bid**: Accept highest bid on owned NFTs

### Advanced Features
- **Royalty Distribution**: Automatic payment to creators
- **Marketplace Fees**: 2.5% fee on all sales
- **Ownership Tracking**: Complete ownership history
- **Post-conditions**: Secure transaction validation

## 🏛️ Collections

### Featured Collections
- **Cosmic Wanderers**: Space-themed digital art
- **Digital Genesis**: Abstract digital artworks
- **Neon Dreams**: Vibrant neon-style NFTs
- **Pixel Paradise**: Retro pixel art collection
- **Ethereal Landscapes**: Dreamlike landscape art

### Collection Features
- **Collection Statistics**: Items, volume, floor price
- **Creator Information**: Collection owner details
- **Trait Filtering**: Filter by collection-specific traits

## 🎯 Bidding System

### How Bidding Works
1. **Place Bid**: Submit bid amount and expiration time
2. **Bid Validation**: Smart contract validates bid parameters
3. **STX Escrow**: Bid amount held in smart contract
4. **Expiration**: Bids expire after specified block height
5. **Acceptance**: NFT owners can accept bids anytime

### Bidding Features
- **Time-Limited Bids**: Automatic expiration
- **Competitive Bidding**: Multiple bids per NFT
- **Instant Settlement**: Immediate transfer on acceptance
- **Fair Distribution**: Royalties and fees handled automatically

## 🛡️ Security Features

### Blockchain Security
- **Bitcoin-Secured**: Leverages Bitcoin's proof-of-work
- **Smart Contract Audited**: Clarity contract security
- **Post-conditions**: Prevent unauthorized transfers
- **Ownership Verification**: Cryptographic proof of ownership

### User Protection
- **Secure Wallet Integration**: Non-custodial wallet connection
- **Transaction Transparency**: All transactions on-chain
- **Immutable Records**: Permanent ownership history
- **Reversible Actions**: Cancel listings and bids

## 📊 Analytics & Statistics

### Marketplace Metrics
- **Trading Volume**: Real-time volume tracking
- **Price Analytics**: Floor price and trends
- **User Activity**: Creator and collector statistics
- **Collection Performance**: Volume and growth metrics

### Personal Dashboard
- **Owned NFTs**: View your NFT collection
- **Listed Items**: Manage your active listings
- **Bid History**: Track placed and received bids
- **Transaction History**: Complete activity log

## 🔧 Technical Architecture

### Frontend Stack
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Stacks Connect**: Wallet integration

### Blockchain Integration
- **Clarity Smart Contracts**: Secure and auditable
- **Stacks Testnet**: Development and testing
- **STX Payments**: Native Stacks token transactions
- **Post-conditions**: Transaction safety mechanisms

## 🚀 Deployment Information

### Contract Deployment
- **Network**: Stacks Testnet
- **Contract Address**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-marketplace`
- **Explorer**: View on [Stacks Explorer](https://explorer.stacks.co/)

### Environment Configuration
- **Network**: Testnet for development
- **API Endpoint**: Stacks API for blockchain data
- **IPFS**: Metadata and image storage
- **Wallet**: Hiro Wallet integration

## 🐛 Troubleshooting

### Common Issues
1. **Wallet Connection**: Ensure Hiro Wallet is installed and set to testnet
2. **Transaction Failures**: Check STX balance and network connectivity
3. **Image Upload**: Verify file format and size limits
4. **Contract Interaction**: Confirm wallet is connected to correct network

### Getting Help
- **Documentation**: [Stacks Documentation](https://docs.stacks.co/)
- **Explorer**: [Stacks Explorer](https://explorer.stacks.co/)
- **Faucet**: [Testnet STX Faucet](https://explorer.stacks.co/sandbox/faucet)
- **Wallet**: [Hiro Wallet Support](https://wallet.hiro.so/)

## 🎉 Demo Scenarios

### Scenario 1: First-time User
1. Connect wallet and get testnet STX
2. Browse featured NFTs and collections
3. Explore filtering and search features
4. View individual NFT details

### Scenario 2: Creator Journey
1. Connect wallet with testnet STX
2. Navigate to Create page
3. Upload artwork and add metadata
4. Mint first NFT
5. List NFT for sale

### Scenario 3: Collector Experience
1. Connect wallet and fund with STX
2. Browse and filter NFTs
3. Place bid on desired NFT
4. Purchase NFT directly
5. View owned NFTs in collection

### Scenario 4: Advanced Trading
1. Create and mint multiple NFTs
2. List NFTs at different price points
3. Receive and manage bids
4. Accept bids and complete sales
5. Track royalty earnings

Enjoy exploring the Stacks NFT Marketplace! 🚀
