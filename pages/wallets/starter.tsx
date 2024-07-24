import { useEffect, useState } from 'react';
import * as web3 from '@solana/web3.js';
import * as walletAdapterReact from '@solana/wallet-adapter-react'; 
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Starter = () => {
    const [balance, setBalance] = useState<number | null>(null)
    const endpoint = web3.clusterApiUrl('devnet');
    const wallet = [ new walletAdapterWallets.PhantomWalletAdapter() ]

    const { connection } = useConnection()
    const { publicKey } = useWallet()

    console.log({connection, publicKey, balance})

    useEffect(()=> {
        const getInfo = async () => {
            if (connection && publicKey) {
                console.log('getting info')
                const walletInfo = await connection.getAccountInfo(publicKey);
                console.log({walletInfo})
                setBalance(walletInfo!.lamports / web3.LAMPORTS_PER_SOL)
            }

        }
        getInfo()
    }, [connection, publicKey])

    return (
        <>
        <walletAdapterReact.ConnectionProvider endpoint={endpoint}>
            <walletAdapterReact.WalletProvider wallets={wallet}>
            <main className='min-h-screen text-white'>
                            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 p-4'>
                                <div className='col-span-1 lg:col-start-2 lg:col-end-4 rounded-lg bg-[#2a302f] h-60 p-4'>
                                    <div className='flex justify-between items-center'>
                                        <h2 className='text-3xl font-semibold'>
                                            account info ✨
                                        </h2>
                                        {/* button component for connecting to solana wallet */}
                                        <WalletMultiButton
                                            className='!bg-helius-orange !rounded-xl hover:!bg-[#161b19] transition-all duration-200'
                                        />
                                    </div>

                                    <div className='mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                                        <ul className='p-2'>
                                            <li className='flex justify-between'>
                                                <p className='tracking-wider'>Wallet is connected...</p>
                                                <p className='text-helius-orange italic font-semibold'>
                                                    {publicKey ? 'yes' : 'no'}
                                                </p>
                                            </li>
                                            
                                            <li className='text-sm mt-4 flex justify-between'>
                                                <p className='tracking-wider'>Balance...</p>
                                                <p className='text-helius-orange italic font-semibold'>
                                                    {balance}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </main>
            </walletAdapterReact.WalletProvider>
        </walletAdapterReact.ConnectionProvider>
        </>
    )
}

export default Starter;