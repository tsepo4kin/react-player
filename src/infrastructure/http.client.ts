import { IHttpClient } from '../application/httpClient';

export class HttpClient implements IHttpClient {
	public request<TQuery, TResult>(query: TQuery): Promise<TResult> {
		return this._request(query!.constructor!.name, query);
	}

	private _request<TQuery, TResult>(
		name: string,
		query: TQuery
	): Promise<TResult> {
		const action: Function = Reflect.get(container, name);
		return action(query);
	}
}

// TODO: вынести в di контейнер
const container = {};

export function Queryable(query: any) {
	// namespace?: string
	return (target: any, propertyKey: string) => {
		// const value = namespace ? `${namespace}/${propertyKey}` : propertyKey;
		Reflect.set(container, query.name, target[propertyKey]);
	};
}
