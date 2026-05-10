import { createContext, useContext } from 'react';

export const LenisScrollContext = createContext(null);

export function useLenisScroll() {
  return useContext(LenisScrollContext);
}
