import {
  FetchResult,
  MutationHookOptions,
  MutationResult,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
} from '@apollo/client';

export type QueryHook<TData = any, TVariables = OperationVariables> = (
  options?: QueryHookOptions<TData, TVariables>,
) => QueryResult<TData>;

export type WrappedMutationFunction<
  TData = any,
  TVariables = OperationVariables,
> = (variables: TVariables) => Promise<FetchResult<TData>>;

export type MutationHook<TData = any, TVariables = OperationVariables> = (
  options?: MutationHookOptions<TData, TVariables>,
) => [WrappedMutationFunction<TData, TVariables>, MutationResult<TData>];
