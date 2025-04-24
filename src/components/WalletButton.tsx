import React from 'react';
import { useWallet } from '../context/WalletContext';
import { Wallet } from 'lucide-react';

const WalletButton: React.FC = () => {
  const { connect, disconnect, account, isConnecting, isConnected } = useWallet();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <button
      onClick={handleClick}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
    >
      <Wallet size={18} />
      {isConnecting ? (
        'Connecting...'
      ) : isConnected && account ? (
        formatAddress(account)
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
};

export default WalletButton;
