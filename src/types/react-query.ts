import type { UseQueryOptions } from '@tanstack/react-query'

export type CustomQueryOptions<TData, TError = Error> = Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
