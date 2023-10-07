import useSWR from "swr";
import {useRecoilState, useSetRecoilState} from "recoil";
import { STATUS } from "../recoil/atoms/atoms";
import { ERROR_INFO } from "../recoil/atoms/atoms";


type TOptions = {
  keepPreviousData: boolean
  onFocus? : boolean
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

  const  setStatus = useSetRecoilState(STATUS);
  const  setErrorHandler = useSetRecoilState(ERROR_INFO);

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
        revalidateOnFocus: options.onFocus ,
        onError: () => {
          setErrorHandler((prev) => ({
            ...prev,
            retry: true,
          }));
        },
        onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
          if (retryCount <= 3) {
            setTimeout(() => revalidate({ retryCount }), 2500);
          } else {

            return setErrorHandler({
              isError: true,
              retry: false,
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
