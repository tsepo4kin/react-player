export interface IHttpClient {
  request<TQuery, TResult>(query: TQuery): Promise<TResult>;
}

// TODO: опписать типы для кверей
// export interface IRequest<TResult> {

// }
