import '@/styles/globals.css'
import { MeshProvider } from '@meshsdk/react'

export default function App({ Component, pageProps }) {
	return (
		<MeshProvider>
			<Component {...pageProps} />
		</MeshProvider>
	)
}
