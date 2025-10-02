import { Suspense, type FC, type JSX } from "react";
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";

export const suspenseQuery = <TData = unknown,>(
  Comp: FC<UseSuspenseQueryResult<TData>>,
  Fallback: FC,
): FC<UseSuspenseQueryOptions<TData>> => {
  return suspense<UseSuspenseQueryOptions<TData>>((queryOptions) => {
    const query = useSuspenseQuery(queryOptions);
    return <Comp {...query} />;
  }, Fallback);
};

export const suspense = <T extends object = JSX.IntrinsicElements>(
  Comp: FC<T>,
  Fallback: FC,
): FC<T> => {
  return (props) => {
    return (
      <Suspense fallback={<Fallback />}>
        <Comp {...props} />
      </Suspense>
    );
  };
};
