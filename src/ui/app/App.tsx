import Header from '../widgets/header/header'
import { ThemeProvider } from '@material-tailwind/react'
import Footer from '../widgets/footer/footer'
import { useState } from 'react'
import AudioItem from '../widgets/audioItem/audioItem'
import { useSelector } from 'react-redux'
import SearchAudios from '../widgets/searchAudio/SearchAudios'

const App = () => {
	const customTheme = {
		component: {
			defaultProps: { color: 'green' },
			valid: {},
			styles: {}
		}
	}

	const songs = useSelector((state: any) => state.songs)

	const [currentTrack, setCurrentTrack] = useState<MediaSource | null>(null)

	return (
		<ThemeProvider value={customTheme}>
			<div className="app__wrapper">
				<div className="app__container">
					<Header></Header>

					<SearchAudios />

					<div className="h-full w-full px-2 py-2 overflow-y-scroll">
						<div className="px-4">
							{songs.map((song: unknown, idx: number) => (
								<AudioItem
									className="py-2"
									song={song}
									key={idx}
									idx={idx}
									canDelete={true}
									onClick={() => setCurrentTrack(songs[idx])}
								/>
							))}
						</div>
					</div>

					<Footer currentTrack={currentTrack}></Footer>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default App
