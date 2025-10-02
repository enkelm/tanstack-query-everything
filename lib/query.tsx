import { Suspense, type ComponentType, type JSX } from "react";
import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  ErrorBoundary,
  type FallbackProps as ErrorFallbackProps,
} from "react-error-boundary";

export const suspenseQuery = <TData = unknown,>(
  Comp: ComponentType<UseSuspenseQueryResult<TData>>,
  Fallback: ComponentType,
  ErrorFallback: ComponentType<ErrorFallbackProps>,
): ComponentType<UseSuspenseQueryOptions<TData>> => {
  return queryErrorBoundary(
    suspense<UseSuspenseQueryOptions<TData>>((queryOptions) => {
      const query = useSuspenseQuery(queryOptions);
      return <Comp {...query} />;
    }, Fallback),
    ErrorFallback,
  );
};

export const suspense = <T extends object = JSX.IntrinsicElements>(
  Comp: ComponentType<T>,
  Fallback: ComponentType,
): ComponentType<T> => {
  return (props) => {
    return (
      <Suspense fallback={<Fallback />}>
        <Comp {...props} />
      </Suspense>
    );
  };
};

export const queryErrorBoundary = <TData = unknown,>(
  Comp: ComponentType<UseSuspenseQueryOptions<TData>>,
  FallbackComponent: ComponentType<ErrorFallbackProps>,
): ComponentType<UseSuspenseQueryOptions<TData>> => {
  return (queryOptions) => (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
          <Comp {...queryOptions} />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
