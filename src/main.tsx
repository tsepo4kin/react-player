import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ui/app/App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { setupStorage } from './infrastructure/controllers/storage.conrollers.ts';

(async () => {
	try {
		const store = await setupStorage();

		ReactDOM.createRoot(document.getElementById('root')!).render(
			<React.StrictMode>
				<Provider store={store}>
					<HashRouter>
						<App />
					</HashRouter>
				</Provider>
			</React.StrictMode>
		);
	} catch (error) {}
})();
