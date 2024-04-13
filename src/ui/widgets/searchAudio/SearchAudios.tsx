import { useEffect, useState } from 'react'
import { searchFromYoutube } from '../../../api/api'
import MyInputText from '../../components/myInputText/myInputText'
import AudioItem from '../audioItem/audioItem'

const SearchAudios = () => {
	const [searchString, setSearchString] = useState('')
	const [songsData, setSongsData] = useState<Array<any>>([])

	useEffect(() => {
		if (searchString) {
			searchFromYoutube(searchString)
				.then(res => setSongsData(res.items.slice(0, 6)))
				.catch(e => console.log(e))
		} else {
			setSongsData([])
		}
	}, [searchString])

	return (
		<div className="py-2 px-4 w-full">
			<div className="pb-2">
				<MyInputText
					value={searchString}
					onChange={e => {
						setSearchString(e.target.value)
					}}
				></MyInputText>
			</div>

			{songsData.length > 0 && (
				<div className="border border-gray-600 rounded-lg">
					{songsData.map((song: any) => (
						<AudioItem
							className="py-2 px-2 w-full"
							key={song.url}
							song={song}
							canDownload={true}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default SearchAudios
