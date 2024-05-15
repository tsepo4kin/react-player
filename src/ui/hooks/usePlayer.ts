import { useState } from "react";
import { IPlayer } from "../../domain/models/player";
import { playerController } from "../../infrastructure/controllers/player.controllers";

export function usePlayer() {
	const [playerState, setPlayerState] = useState<IPlayer>(
		playerController.getPlayerData()
	);

	return { playerController, playerState, setPlayerState };
}
