import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  MutationTuple,
} from '@apollo/client';
import { UseMutationResponse, UseQueryArgs, UseQueryResponse } from 'urql';

export type Cache = ApolloCache<any>;

export type MutationHook<TData, TVariables> = (
  options?: MutationHookOptions<TData, TVariables, DefaultContext>,
) => MutationTuple<TData, TVariables, DefaultContext, Cache>;

export type UrqlMutationHook<
  TData = any,
  TVariables = Record<string, any>,
> = () => UseMutationResponse<TData, TVariables>;

export type UrqlQueryHook<TData = any, TVariables = Record<string, any>> = (
  args?: Omit<UseQueryArgs<TVariables, TData>, 'query'>,
) => UseQueryResponse<TData, TVariables>;
