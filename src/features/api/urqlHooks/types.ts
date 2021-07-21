import { UseQueryArgs, UseQueryResponse } from 'urql';

export type QueryHook<TData = any, TVariables = Record<string, any>> = (
  args: Omit<UseQueryArgs<TVariables, TData>, 'query'>,
) => UseQueryResponse<TData, TVariables>;
