import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import Settings from '../pages/Settings';
import Header from '../widgets/header/header';
import Footer from '../widgets/footer/footer';
import PlayerPage from '../pages/PlayerPage';

const App = () => {
	const router = [
		{
			path: '/',
			element: <Home />,
			errorElement: <div>404</div>
		},
		{
			path: '/search',
			element: <SearchPage />
		},
		{
			path: '/settings',
			element: <Settings />
		},
		{
			path: '/player',
			element: <PlayerPage />
		}
	];

	return (
		<div className="app__wrapper">
			<div className="app__container">
				<div id="toasted__container" className="absolute w-full z-10"></div>
				<div id="dialog__container" className="absolute w-full z-10"></div>

				<Header></Header>

				<Routes>
					{router.map(r => (
						<Route path={r.path} key={r.path} element={r.element} />
					))}
				</Routes>

				<Footer />
			</div>
		</div>
	);
};

export default App;
