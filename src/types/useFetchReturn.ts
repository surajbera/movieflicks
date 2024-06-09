export type useFetchReturn<T> = {
  data: T | null;
  isPending: boolean;
  error: string | null;
};
