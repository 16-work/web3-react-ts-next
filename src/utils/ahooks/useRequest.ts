import { useReactive, useRequest as useAhookRequest } from 'ahooks';
import { Options, Service, Result } from 'ahooks/lib/useRequest/src/types';

/* loading -> isLoading & 调整onError位置 */
export function useCusRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  onError: Options<TData, TParams> | ((e: Error, params: any) => void) = {},
  options: Options<TData, TParams> = {}
): Omit<Result<TData, TParams> & { isLoading: boolean; isInit: boolean }, 'loading'> {
  /** Params */
  const state = useReactive({
    isInit: false,
  });

  /** Actions */
  if (typeof onError === 'function') {
    options = {
      ...options,
      onError: (e, params) => {
        console.log(e);
        onError(e, params);
      },
    };
  } else {
    options = onError;
  }

  const { loading, ...res } = useAhookRequest(service, {
    ...options,
    onFinally: (params) => {
      state.isInit = true;
      options.onFinally && options.onFinally(params);
    },
  });

  /** Return */
  return { ...res, isLoading: loading, isInit: state.isInit };
}
