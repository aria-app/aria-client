import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  MutationTuple,
  MutationUpdaterFunction,
  QueryHookOptions,
  QueryResult,
} from '@apollo/client';
import { UseMutationResponse, UseQueryArgs, UseQueryResponse } from 'urql';

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

export type QueryHook<TData, TVariables> = (
  options?: QueryHookOptions<TData, TVariables>,
) => QueryResult<TData, TVariables>;

export type UrqlMutationHook<
  TData = any,
  TVariables = Record<string, any>,
> = () => UseMutationResponse<TData, TVariables>;

export type UrqlQueryHook<TData = any, TVariables = Record<string, any>> = (
  args?: Omit<UseQueryArgs<TVariables, TData>, 'query'>,
) => UseQueryResponse<TData, TVariables>;
