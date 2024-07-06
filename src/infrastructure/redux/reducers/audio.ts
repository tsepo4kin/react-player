import { T_INIT_AUDIO } from "../types";


export const audioReducer = (state = {}, action: any) => {
	switch (action.type) {
		case T_INIT_AUDIO: {
			return { ...state, ref: action.ref };
		}
		default: {
			return state;
		}
	}
};
