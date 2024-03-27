// import Button from './components/button/button'

import { useState } from "react"
import Checkbox from "./components/checkbox/checkbox"
import InputText from "./components/inputText/inputText"
import Button from "./components/button/button"

const App = () => {
	const [jopa1, setJopa1] = useState(false)
	const [jopa2, setJopa2] = useState(true)

	return (
		<>
			<header>{/* player */}
				
			</header>

			<main>
				{/* audio list */}

				<i className="ic_continue"></i>
			</main>

			<footer>{/* footer */}</footer>
		</>
	)
}

export default App
