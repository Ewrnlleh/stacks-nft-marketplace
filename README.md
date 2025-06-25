# Stacks NFT Marketplace

A full-stack decentralized NFT marketplace built on the Stacks blockchain, allowing users to mint, list, and purchase NFTs using STX tokens. This project demonstrates how to build decentralized applications on Stacks using Clarity smart contracts and Next.js.

## 🌟 Features

### Core Features
- **NFT Minting**: Create and mint unique NFTs with custom metadata
- **Marketplace Listing**: List NFTs for sale with customizable pricing
- **Secure Purchasing**: Buy NFTs with STX tokens using secure smart contracts
- **Ownership Tracking**: Transparent ownership history and transfers
- **Wallet Integration**: Seamless Stacks wallet connection for testnet

### Additional Features
- **Bidding System**: Place and accept bids on NFTs with expiration times
- **Royalty Distribution**: Automatic royalty payments to original creators (up to 10%)
- **Advanced Search & Filtering**: Filter by price, status, collections, and traits
- **Responsive Design**: Mobile-first design with modern UI/UX
- **Real-time Stats**: Marketplace statistics and analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stacks wallet (for testnet)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stacks-nft-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_NETWORK=testnet
   NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
   NEXT_PUBLIC_API_URL=https://stacks-node-api.testnet.stacks.co
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Contract Deployment

### Contract Address
**Testnet Contract**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-marketplace`

The smart contract has been deployed to the Stacks testnet and includes the following functions:

#### Public Functions
- `mint-nft(name, description, image, royalty-percentage)` - Mint a new NFT
- `list-nft(token-id, price)` - List an NFT for sale
- `unlist-nft(token-id)` - Remove NFT from listing
- `purchase-nft(token-id)` - Purchase a listed NFT
- `place-bid(token-id, amount, expires-at)` - Place a bid on an NFT
- `accept-bid(token-id)` - Accept the highest bid on an NFT

#### Read-only Functions
- `get-nft-metadata(token-id)` - Get NFT metadata
- `get-listing(token-id)` - Get listing information
- `get-bid(token-id)` - Get current bid information
- `get-user-stats(user)` - Get user statistics

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful SVG icons

### Blockchain Integration
- **Stacks Connect**: Wallet authentication and transaction signing
- **Stacks Transactions**: Blockchain interaction library
- **Clarity Smart Contracts**: Secure, auditable smart contracts

### Key Components
- **WalletProvider**: Manages wallet connection state
- **NFTCard**: Displays NFT information and actions
- **NFTGrid**: Grid layout for NFT collections
- **FilterSidebar**: Advanced filtering options
- **StatsSection**: Marketplace analytics

## 💰 Smart Contract Features

### NFT Standard
- ERC-721 compatible NFTs on Stacks
- Custom metadata with name, description, and image
- Creator royalties with automatic distribution
- Secure ownership transfers

### Marketplace Functions
- **Listing Management**: Create, update, and cancel listings
- **Purchase Mechanism**: Secure STX transfers with post-conditions
- **Bidding System**: Time-limited bids with automatic expiration
- **Fee Structure**: 2.5% marketplace fee on all sales

### Security Features
- **Post-conditions**: Prevent unauthorized token transfers
- **Ownership Verification**: Only owners can list/transfer NFTs
- **Royalty Enforcement**: Automatic creator royalty distribution
- **Access Control**: Admin functions restricted to contract owner

## 🎨 Additional Implementations

### 1. Advanced Bidding System
- **Time-limited Bids**: Bids expire after specified block height
- **Bid Management**: Users can update or cancel active bids
- **Automatic Acceptance**: Sellers can accept the best bid
- **STX Escrow**: Secure bid amount handling

### 2. Creator Royalty System
- **Flexible Royalties**: Creators set royalty percentage (0-10%)
- **Automatic Distribution**: Smart contract handles royalty payments
- **Transparent Tracking**: All royalty payments are recorded on-chain
- **Multi-party Benefits**: Benefits creators, marketplace, and platform

### 3. Enhanced User Experience
- **Responsive Design**: Mobile-optimized interface
- **Real-time Updates**: Live marketplace statistics
- **Advanced Filtering**: Multi-criteria search and filtering
- **Wallet Integration**: Seamless Stacks wallet connection

## 🛠️ Development

### Project Structure
```
src/
├── app/                 # Next.js app router pages
│   ├── page.tsx        # Homepage
│   ├── explore/        # Browse NFTs
│   └── create/         # Mint new NFTs
├── components/         # Reusable React components
├── contracts/          # Clarity smart contracts
├── lib/               # Utility functions
└── types/             # TypeScript definitions
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Smart Contract Development
The Clarity smart contract is located in `src/contracts/nft-marketplace.clar` and includes:
- NFT minting and metadata management
- Marketplace listing and purchasing logic
- Bidding system with time expiration
- Royalty distribution mechanism
- Administrative functions

## 🔧 Configuration

### Environment Variables
```env
# Network Configuration
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=<your-contract-address>

# API Endpoints
NEXT_PUBLIC_API_URL=https://stacks-node-api.testnet.stacks.co
NEXT_PUBLIC_STACKS_API_URL=https://stacks-node-api.testnet.stacks.co

# App Settings
NEXT_PUBLIC_APP_NAME=Stacks NFT Marketplace
NEXT_PUBLIC_APP_DESCRIPTION=A decentralized NFT marketplace
```

### Wallet Setup
1. Install [Hiro Wallet](https://wallet.hiro.so/) browser extension
2. Create or import a wallet
3. Switch to Stacks testnet
4. Get testnet STX from the [faucet](https://explorer.stacks.co/sandbox/faucet)

## 📚 Documentation

### Project Guides
- [**Wallet Error Handling Guide**](WALLET_ERROR_GUIDE.md) - Understanding user rejections and transaction errors
- [**Demo Guide**](DEMO.md) - Complete feature walkthrough
- [**Deployment Guide**](DEPLOYMENT.md) - Contract deployment instructions

### API Reference
- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Language Reference](https://docs.stacks.co/clarity/)
- [Stacks Connect Guide](https://github.com/hirosystems/connect)

### Resources
- [Stacks Explorer](https://explorer.stacks.co/)
- [Testnet Faucet](https://explorer.stacks.co/sandbox/faucet)
- [Hiro Wallet](https://wallet.hiro.so/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stacks Foundation for the blockchain infrastructure
- Hiro Systems for development tools and wallet
- Next.js team for the excellent React framework
- Tailwind CSS for the utility-first CSS framework

---

**Contract Address (Testnet)**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-marketplace`

Built with ❤️ on the Stacks blockchain
