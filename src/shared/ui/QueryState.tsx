import { type ReactNode } from 'react';
import { EmptyState, ErrorState } from './StateViews';

interface QueryStateProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  onRetry?: () => void;
  skeleton: ReactNode;
  children: () => ReactNode;
  emptyTitle?: string;
  emptyBody?: string;
}

/** Renders skeleton / error / empty / content states for RTK Query results. */
export function QueryState({ isLoading, isError, isEmpty, onRetry, skeleton, children, emptyTitle, emptyBody }: QueryStateProps) {
  if (isLoading) return <>{skeleton}</>;
  if (isError) return <ErrorState onRetry={onRetry} />;
  if (isEmpty) return <EmptyState title={emptyTitle} body={emptyBody} />;
  return <>{children()}</>;
}