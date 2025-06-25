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
}

const WalletContext = createContext<WalletContextType | null>(null);

const appConfig = new AppConfig(['store_write', 'publish_data']);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userData, setUserData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
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

    showConnect({
      appDetails: {
        name: 'Stacks NFT Marketplace',
        icon: '/icon.png',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
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
