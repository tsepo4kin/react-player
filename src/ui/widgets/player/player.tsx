import { FC, PropsWithChildren } from "react";
import Button from "../../components/button/button";

interface IAudioData {
  name: string;
  Author: string;
  length: number;
}

interface IPlayer {
  
}

const Player: FC<PropsWithChildren<IPlayer>> = () => {
	return (
		<div>
			<div className="start-controls">
				<Button>
					<i className="ic_back"></i>
				</Button>
				<Button>
					<i className="ic_play"></i>
				</Button>
				<Button>
					<i className="ic_next"></i>
				</Button>
			</div>
			<div>
				<img src="" alt="" />
				<span>Name</span>
				<span>Author</span>
				<progress className="progress" value={0.5} />
				<span>timer</span>
			</div>
			<div className="end-controls">
				<button>add</button>
				<Button>
					<i className="ic_download"></i>
				</Button>
				<progress className="progress vertical" value={0.5} />
			</div>
		</div>
	)
}

export default Player;
