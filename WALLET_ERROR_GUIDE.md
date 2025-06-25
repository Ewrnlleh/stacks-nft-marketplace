# 🔐 Wallet Error Handling Guide

## Understanding "User Rejected Request" Error

The **"User rejected request"** error is a **normal and expected behavior** that occurs when users interact with their Stacks wallet. This is **NOT a bug** in the application.

## 🎯 What Causes This Error?

### Normal User Actions:
1. **❌ Clicking "Cancel"** in the wallet popup
2. **❌ Clicking "Reject"** in the transaction confirmation
3. **🚪 Closing the wallet popup** without confirming
4. **🔙 Navigating away** from the wallet confirmation screen
5. **⏰ Letting the wallet timeout** without action

### Why This Happens:
- **User Control**: Users have full control over their transactions
- **Security Feature**: Prevents unauthorized transactions
- **Expected Behavior**: Wallets are designed to let users cancel anytime

## ✅ How Our Application Handles This

### Current Error Handling:
```typescript
// User-friendly error messages
if (error.message && error.message.includes('User rejected')) {
  // Silent handling - user cancelled intentionally
  console.log('User cancelled the transaction');
} else if (error.message && error.message.includes('Insufficient funds')) {
  alert('💰 Insufficient funds. Please ensure you have enough STX tokens.');
} else {
  alert('❌ Transaction failed. Please try again.');
}
```

### What Users See:
- **✅ Minting NFT**: No error message (cancellation is normal)
- **✅ Purchasing**: No error message (cancellation is normal)
- **✅ Other Errors**: Clear, helpful error messages

## 🔧 For Users: How to Successfully Complete Transactions

### 1. Connect Your Wallet
1. Click **"Connect Wallet"** in the navigation
2. Select your preferred wallet (Hiro Wallet recommended)
3. **✅ Click "Connect"** to approve the connection

### 2. Confirm Transactions
1. Fill out the NFT minting form or select an NFT to purchase
2. Click the action button (Mint/Purchase)
3. **✅ Click "Confirm"** in the wallet popup
4. **⏳ Wait** for the transaction to be processed

### 3. If You Want to Cancel
1. **✅ Click "Cancel"** or "Reject" in the wallet - this is perfectly normal!
2. **✅ Close the popup** - no error will be shown
3. **✅ Try again** later if you change your mind

## 🛠️ Troubleshooting Other Issues

### Common Solutions:

#### 💰 Insufficient Funds
- **Problem**: Not enough STX in wallet
- **Solution**: Get testnet STX from [Stacks Faucet](https://explorer.stacks.co/sandbox/faucet)

#### 🌐 Network Issues
- **Problem**: Poor internet connection
- **Solution**: Check your internet and try again

#### 🔄 Wallet Connection Issues
- **Problem**: Wallet not responding
- **Solution**: Refresh page and reconnect wallet

#### ⚡ Transaction Stuck
- **Problem**: Transaction pending too long
- **Solution**: Check [Stacks Explorer](https://explorer.stacks.co/) for transaction status

## 📱 Wallet Setup Guide

### Install Hiro Wallet
1. Visit [wallet.hiro.so](https://wallet.hiro.so/)
2. Install browser extension
3. Create new wallet or import existing
4. **Switch to Stacks Testnet**

### Get Testnet STX
1. Copy your wallet address
2. Visit [Stacks Faucet](https://explorer.stacks.co/sandbox/faucet)
3. Paste address and request STX
4. Wait for confirmation

## 🎯 Expected User Experience

### ✅ Normal Flow:
1. Connect wallet → ✅ Success
2. Start transaction → Wallet popup appears
3. Confirm in wallet → ✅ Transaction submitted
4. Wait for confirmation → ✅ Success message

### ✅ User Cancellation (Also Normal):
1. Connect wallet → ✅ Success
2. Start transaction → Wallet popup appears
3. **User clicks "Cancel"** → ✅ Popup closes, no error
4. User can try again later → ✅ Normal behavior

## 🔍 For Developers: Error Detection

### Detecting User Rejections:
```typescript
catch (error: any) {
  if (error.message && error.message.includes('User rejected')) {
    // Handle silently - user cancelled intentionally
    console.log('User cancelled transaction');
    return; // Don't show error UI
  }
  // Handle other errors with user feedback
}
```

### Best Practices:
- ✅ **Silent handling** for user rejections
- ✅ **Clear messages** for actual errors
- ✅ **Helpful guidance** for common issues
- ✅ **Try again options** for users

## 🎉 Summary

The **"User rejected request"** error is a **feature, not a bug**! It shows that:

1. **✅ Your wallet security is working**
2. **✅ You have full control over transactions**
3. **✅ The application respects your choices**
4. **✅ You can safely cancel anytime**

**This is exactly how blockchain applications should work!** 🚀

---

## 📞 Need More Help?

- **📚 Documentation**: [Stacks Documentation](https://docs.stacks.co/)
- **🔍 Explorer**: [Stacks Explorer](https://explorer.stacks.co/)
- **💧 Faucet**: [Get Testnet STX](https://explorer.stacks.co/sandbox/faucet)
- **👛 Wallet**: [Hiro Wallet Support](https://wallet.hiro.so/)

**Remember**: User cancellations are normal and expected! 🎯
