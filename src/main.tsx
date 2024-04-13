import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui/app/App.tsx'
import './index.css'
import { createStore } from 'redux'
import { reducers } from './redux/index.ts'
import DataStorage from './utils/indexedDb.ts'
import { Provider } from 'react-redux'

(async () => {
	try {
		let db: any = await DataStorage.get('state')

		if (db === null) {
			db = undefined
		}

		const store = createStore(
			reducers,
			db
			// WINDOW.__REDUX_DEVTOOLS_EXTENSION__ &&
			//   WINDOW.__REDUX_DEVTOOLS_EXTENSION__(),
		)

		store.subscribe(() => {
			DataStorage.set('state', {
				songs: store.getState().songs
			})
		})

		ReactDOM.createRoot(document.getElementById('root')!).render(
			<React.StrictMode>
				<Provider store={store}>
					<App />
				</Provider>
			</React.StrictMode>
		)
	} catch (error) { }
})();
