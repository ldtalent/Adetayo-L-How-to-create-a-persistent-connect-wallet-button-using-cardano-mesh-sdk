import { useState, useEffect } from 'react'
import { useWallet, useWalletList } from '@meshsdk/react'
import Image from 'next/image'

const ConnectWallet = () => {
	const [selectedWallet, setSelectedWallet] = useState(null)

	const { connect, disconnect, connecting } = useWallet()
	const wallets = useWalletList()

	useEffect(() => {
		const storedWallet = localStorage.getItem('selectedWallet')
		if (storedWallet) {
			setSelectedWallet(JSON.parse(storedWallet))
			connect(JSON.parse(storedWallet).name)
		}
	}, [])

	const handleWalletSelection = (wallet) => {
		localStorage.setItem('selectedWallet', JSON.stringify(wallet))
		setSelectedWallet(wallet)
		connect(wallet.name)
	}

	const handleDisconnect = () => {
		localStorage.removeItem('selectedWallet')
		disconnect()
		setSelectedWallet(null)
	}

	return (
		<div className='dropdown'>
			<div className='dropdown-btn'>
				{selectedWallet ? (
					<div>
						<span>{selectedWallet.name}</span>
						<Image
							src={selectedWallet.icon}
							alt={selectedWallet.name}
							width='30'
							height='30'
						/>
					</div>
				) : (
					<div>connect wallet</div>
				)}
			</div>
			<>
				{!selectedWallet && !connecting && (
					<ul className='dropdown-content'>
						{wallets.map((wallet) => (
							<li
								key={wallet.name}
								onClick={() => handleWalletSelection(wallet)}
							>
								<span>{wallet.name}</span>
								<Image
									src={wallet.icon}
									alt={wallet.name}
									width='30'
									height='30'
								/>
							</li>
						))}
					</ul>
				)}
			</>
			<>
				{selectedWallet && (
					<div className='dropdown-content'>
						<li onClick={handleDisconnect}>disconnect</li>
					</div>
				)}
			</>
		</div>
	)
}

export default ConnectWallet
