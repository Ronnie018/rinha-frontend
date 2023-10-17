import { createContext } from 'react';

export const ConfigContext = createContext({});

export default function Contexts({ children }) {
  return <>{children}</>;
}
