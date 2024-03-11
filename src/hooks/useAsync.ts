/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'

import { useCallbackRef } from '@chakra-ui/react'

export type UseAsyncStatus = 'idle' | 'pending' | 'success' | 'error'

export interface UseAsyncOptions<D, P extends any[], E> {
  enabled?: boolean
  callbackParams?: P
  onSuccess?: (data: D, ...params: P) => void
  onError?: (error: E, ...params: P) => void
}

export function useAsync<D, P extends any[], E = any> (
  callback: Fn<P, Promise<D>>,
  options?: UseAsyncOptions<D, P, E>
) {
  const [data, setData] = useState<D | null>(null)
  const [error, setError] = useState<E | null>(null)
  const [status, setStatus] = useState<UseAsyncStatus>('idle')
  const cancelRequest = useRef<boolean>(false)

  const enabled = options?.enabled
  const callbackParams = options?.callbackParams
  const onError = options?.onError
  const onSuccess = options?.onSuccess

  const onErrorProp = useCallbackRef(onError)
  const onSuccessProp = useCallbackRef(onSuccess)
  const callbackProp = useCallbackRef(callback)

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setStatus('idle')
  }, [])

  const run = useCallback(
    async (...params: P) => {
      setStatus('pending')

      try {
        const response = await callbackProp(...params)

        if (cancelRequest.current) return

        setData(response || null)
        setError(null)
        setStatus('success')
        onSuccessProp?.(response, ...params)
      } catch (err: E | any) {
        if (cancelRequest.current) return

        setError(err)
        setStatus('error')
        onErrorProp?.(err, ...params)
      }
    },
    [callbackProp, onErrorProp, onSuccessProp]
  )

  useEffect(() => {
    if (enabled && status === 'idle') {
      const params = (callbackParams || []) as P
      run(...params)
    }
  }, [callbackParams, enabled, run, status])

  useEffect(() => {
    cancelRequest.current = false

    return () => {
      cancelRequest.current = true
    }
  }, [])

  return { data, error, status, reset, run }
}
