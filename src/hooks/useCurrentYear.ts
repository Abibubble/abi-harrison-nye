import { useSyncExternalStore } from 'react';

const subscribe = () => () => undefined;
const getCurrentYear = () => new Date().getFullYear();
const getBuildYear = () => __BUILD_YEAR__;

export function useCurrentYear(): number {
  return useSyncExternalStore(subscribe, getCurrentYear, getBuildYear);
}
