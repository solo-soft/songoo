import useSWR from "swr";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { STATUS } from "../recoil/atoms/atoms";
import { useSetState } from "react-use";
import { ERROR_INFO } from "../recoil/atoms/atoms";
import {initializeClient} from "../graphQl/client/apolloClients";



type TOptions = {
  keepPreviousData: boolean;
  runError?: boolean;
};


type TUseFetchSwr = {
  swrFetcher: <T>(
    key: Array<string | unknown> | string,
    fetcher: ((args: any) => Promise<T>) | null | (()=> Promise<T>),
    options: TOptions
  ) => {
    data: T | undefined ,
    mutate: Function
  };
};


const useFetchSwr =  () : TUseFetchSwr => {
  const [status, setStatus] = useRecoilState(STATUS);
  const [errorHandler, setErrorHandler] = useRecoilState(ERROR_INFO);

  return {
    swrFetcher: <T> (
      key: Array<string | unknown> | string,
      fetcher: ((args : any) => Promise<T>) | null ,
      options: TOptions
    ) : {
      data : T | undefined ,
      mutate: Function
    }  => {


      const { data, mutate } = useSWR(key, fetcher, {
        keepPreviousData: options.keepPreviousData,
        refreshWhenHidden: true,
        refreshWhenOffline: true,
        revalidateOnReconnect: true,
        revalidateOnFocus: options.runError ? undefined : true,
        onError: () => {
          setErrorHandler((prev) => ({
            ...prev,
            retry: true,
          }));
        },
        onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
          if (retryCount <= 3) {
            setTimeout(() => revalidate({ retryCount }), 4000);
            return  await initializeClient()
          } else {
            return setErrorHandler({
              isError: true,
              retry: false,
              code: error.code,
              reason: error.reason,
              message: error.message,
              status: error.status,
              swrMutate: mutate,
            });
          }
        },
        onSuccess: () => {
          setStatus("success");
          setErrorHandler((prev) => ({
            ...prev,
            retry: false,
          }));
        },
      });

      return {
        data,
        mutate
      };
    },
  };
};

export default useFetchSwr;
