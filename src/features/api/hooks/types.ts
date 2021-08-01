import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  MutationTuple,
  MutationUpdaterFunction,
  QueryHookOptions,
  QueryResult,
} from '@apollo/client';

export type Cache = ApolloCache<any>;

export type MutationHook<TData, TVariables> = (
  options?: MutationHookOptions<TData, TVariables, DefaultContext>,
) => MutationTuple<TData, TVariables, DefaultContext, Cache>;

export type MutationUpdater<TData, TVariables> = MutationUpdaterFunction<
  TData,
  TVariables,
  DefaultContext,
  Cache
>;

export type MutationOptimisticResponseCreator<TData, TExtras> = (
  extras: TExtras,
) => TData;

export type MutationUpdaterFunctionCreator<
  TData,
  TVariables,
  TExtras = void,
> = TExtras extends void
  ? () => MutationUpdaterFunction<TData, TVariables, DefaultContext, Cache>
  : (
      extras: TExtras,
    ) => MutationUpdaterFunction<TData, TVariables, DefaultContext, Cache>;

export type QueryHook<TData, TVariables> = (
  options?: QueryHookOptions<TData, TVariables>,
) => QueryResult<TData, TVariables>;
