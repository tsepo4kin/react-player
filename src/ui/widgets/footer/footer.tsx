import MyIconBtn from '../../components/myIconBtn/myIconBtn'

const footerMenu = [
	{ icon: 'fa-solid fa-gear' },
	{ icon: 'fa-regular fa-circle-play' },
	{ icon: 'fa-solid fa-music' }
]

const Footer = () => {
	return (
		<footer className="py-2 px-4">
			<div className="flex">
				{footerMenu.map((icon, idx) => (
					<MyIconBtn variant="text" className="mx-2" key={idx} size="sm">
						<i className={icon.icon}></i>
					</MyIconBtn>
				))}
			</div>
		</footer>
	)
}

export default Footer
