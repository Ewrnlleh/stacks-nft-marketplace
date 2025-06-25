'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';

interface WalletContextType {
  userSession: UserSession | null;
  userData: any;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  address: string | null;
  isClient: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

const appConfig = new AppConfig(['store_write', 'publish_data']);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after component mounts to prevent hydration mismatch
    setIsClient(true);
    
    const session = new UserSession({ appConfig });
    setUserSession(session);

    if (session.isSignInPending()) {
      session.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setIsConnected(true);
        setAddress(userData.profile.stxAddress.testnet);
      });
    } else if (session.isUserSignedIn()) {
      const userData = session.loadUserData();
      setUserData(userData);
      setIsConnected(true);
      setAddress(userData.profile.stxAddress.testnet);
    }
  }, []);
  const connect = () => {
    if (!userSession) return;

    try {
      showConnect({
        appDetails: {
          name: 'Stacks NFT Marketplace',
          icon: '/icon.png',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        onCancel: () => {
          // User cancelled the connection request
          console.log('User cancelled wallet connection');
        },
        userSession,
      });
    } catch (error: any) {
      // Handle user rejection or other errors gracefully
      if (error.message && error.message.includes('User rejected')) {
        console.log('User rejected wallet connection');
      } else {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  const disconnect = () => {
    if (!userSession) return;
    
    userSession.signUserOut('/');
    setUserData(null);
    setIsConnected(false);
    setAddress(null);
  };
  const value = {
    userSession,
    userData,
    isConnected,
    connect,
    disconnect,
    address,
    isClient,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
