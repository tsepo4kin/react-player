import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from '../widgets/header/header'
import Home from '../pages/home/home'
import Library from '../pages/library/library'
import Settings from '../pages/settings/settings'
import Player from '../widgets/player/player'
import { ThemeProvider } from '@material-tailwind/react'
import Footer from '../widgets/footer/footer'

const router = createBrowserRouter([
	{ path: '/', element: <Home />, errorElement: <div>404</div> },
	{ path: '/library', element: <Library /> },
	{ path: '/player', element: <Player /> },
	{ path: '/settings', element: <Settings /> }
])

const App = () => {
	const customTheme = {
		component: {
			defaultProps: { color: 'green' },
			valid: {},
			styles: {}
		}
	}
	return (
		<ThemeProvider value={customTheme}>
			<div className="app__wrapper">
				<div className="app__container">
					<Header></Header>

					<RouterProvider router={router} />

					<Footer></Footer>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default App
