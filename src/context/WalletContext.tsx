import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Web3ReactHooks, Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask';

interface WalletContextType {
  connect: () => Promise<void>;
  disconnect: () => void;
  account: string | undefined;
  isConnecting: boolean;
  isConnected: boolean;
  chainId: number | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
];

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <WalletProviderInner>{children}</WalletProviderInner>
    </Web3ReactProvider>
  );
};

const WalletProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { account, chainId, isActive, isActivating } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    if (isActive) return;
    
    setIsConnecting(true);
    try {
      await metaMask.activate();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    if (!isActive) return;
    metaMask.resetState();
  };

  // Auto-connect if previously connected
  useEffect(() => {
    metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to MetaMask');
    });
  }, []);

  const value = {
    connect,
    disconnect,
    account,
    isConnecting,
    isConnected: isActive,
    chainId
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
