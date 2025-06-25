# Deployment Guide

This guide covers deploying the Stacks NFT Marketplace smart contract to testnet and mainnet.

## 📋 Prerequisites

### Required Tools
- [Clarinet](https://github.com/hirosystems/clarinet) - Clarity development tool
- [Stacks CLI](https://github.com/stacks-network/stacks-core) - Command line interface
- Stacks wallet with STX for deployment

### Setup Environment
```bash
# Install Clarinet
npm install -g @hirosystems/clarinet

# Verify installation
clarinet --version
```

## 🧪 Testnet Deployment

### Step 1: Initialize Clarinet Project
```bash
# Create new Clarinet project (if not already done)
clarinet new nft-marketplace
cd nft-marketplace

# Copy contract file
cp src/contracts/nft-marketplace.clar contracts/
```

### Step 2: Configure Clarinet.toml
```toml
[project]
name = "nft-marketplace"
requirements = []
cache_dir = ".cache"

[[project.contracts]]
path = "contracts/nft-marketplace.clar"
depends_on = []

[repl.analysis]
passes = ["check_checker"]

[repl.analysis.check_checker]
strict = false
trusted_sender = false
trusted_caller = false
callee_filter = false
```

### Step 3: Test Contract Locally
```bash
# Check syntax
clarinet check

# Run tests
clarinet test

# Open REPL for testing
clarinet console
```

### Step 4: Deploy to Testnet
```bash
# Deploy contract
clarinet deploy --testnet

# Or manually with Stacks CLI
stx deploy_contract \
  --contract-name nft-marketplace \
  --code-body-file contracts/nft-marketplace.clar \
  --fee 1000 \
  --nonce 0 \
  --network testnet \
  --private-key <your-private-key>
```

## 🚀 Mainnet Deployment

### Step 1: Final Testing
- Complete thorough testing on testnet
- Verify all functions work correctly
- Test edge cases and error conditions
- Get community feedback

### Step 2: Security Audit
- Review contract code for vulnerabilities
- Test with various scenarios
- Consider third-party audit
- Document all functions and their purposes

### Step 3: Deploy to Mainnet
```bash
# Deploy to mainnet (requires STX for fees)
stx deploy_contract \
  --contract-name nft-marketplace \
  --code-body-file contracts/nft-marketplace.clar \
  --fee 50000 \
  --nonce 0 \
  --network mainnet \
  --private-key <your-mainnet-private-key>
```

### Step 4: Verify Deployment
- Check contract on Stacks Explorer
- Test basic functions
- Verify contract address
- Update frontend configuration

## 🔧 Configuration Updates

### Update Environment Variables
```env
# For testnet
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=<your-testnet-contract-address>

# For mainnet
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_CONTRACT_ADDRESS=<your-mainnet-contract-address>
```

### Update Frontend
```typescript
// lib/stacks.ts
export const CONTRACT_CONFIG = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
  contractName: 'nft-marketplace',
  network: getNetwork(),
};
```

## 📊 Post-Deployment

### Monitor Contract
- Watch transaction history
- Monitor contract performance
- Track user adoption
- Collect feedback

### Maintenance
- Plan for contract upgrades
- Monitor for security issues
- Maintain documentation
- Support community

## 🛡️ Security Considerations

### Best Practices
- Use hardware wallet for mainnet deployment
- Keep private keys secure
- Test thoroughly before mainnet
- Monitor contract interactions
- Have emergency procedures

### Contract Security
- Immutable once deployed
- No upgrade mechanism (by design)
- Test all edge cases
- Verify post-conditions
- Audit by experts

## 📈 Success Metrics

### Track These Metrics
- Number of NFTs minted
- Total trading volume
- Active users
- Transaction success rate
- Gas efficiency

## 🆘 Troubleshooting

### Common Issues
- **Deployment fails**: Check STX balance and network
- **Contract not found**: Verify contract address
- **Transaction rejected**: Check contract function parameters
- **High fees**: Adjust fee estimation

### Getting Help
- Stacks Discord community
- GitHub issues
- Documentation
- Stack Overflow

---

**Current Deployment Status**: 
- ✅ **Testnet**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-marketplace`
- ⏳ **Mainnet**: Pending final testing and security audit

Remember to always test thoroughly on testnet before mainnet deployment!
