<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Stacks NFT Marketplace - Copilot Instructions

This is a full-stack NFT marketplace built on the Stacks blockchain using Next.js and Clarity smart contracts.

## Architecture Overview

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, and App Router
- **Blockchain**: Stacks blockchain with Clarity smart contracts
- **Wallet Integration**: Stacks Connect for wallet authentication
- **Deployment**: Stacks testnet for development

## Key Technologies

- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Stacks Connect for wallet integration
- Clarity for smart contracts
- Lucide React for icons

## Smart Contract Features

- NFT minting with metadata
- Marketplace listing and purchasing
- Bidding system
- Royalty distribution
- Owner verification

## Code Patterns

- Use `'use client'` directive for client-side components
- Implement proper error handling with try-catch blocks
- Use TypeScript interfaces from `@/types/index.ts`
- Follow component composition patterns
- Use Tailwind utility classes for styling

## File Structure

- `/src/app/` - Next.js app router pages
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and blockchain interactions
- `/src/types/` - TypeScript type definitions
- `/src/contracts/` - Clarity smart contracts

## Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the design system defined in `tailwind.config.js`
- Use primary/secondary color palette
- Implement responsive design patterns
- Use proper spacing and typography scales

## Stacks Integration

- All contract interactions should use functions from `/src/lib/stacks.ts`
- Handle wallet connection state properly
- Implement proper error handling for blockchain transactions
- Use testnet for development and testing
