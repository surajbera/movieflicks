// libraries
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

// types
import { useFetchReturn } from "../types/useFetchReturn";

export const useFetch = <T>(url: string): useFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const response = await axios.get<T>(url, {
          cancelToken: source.token,
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsPending(false);
        setData(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          const error = err as AxiosError;
          console.log("The fetch was aborted", error.message);
        } else {
          const error = err as AxiosError;
          setIsPending(false);
          setError(error.message);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel("The fetch was aborted");
    };
  }, [url]);

  return { data, isPending, error };
};
