import React, { createContext, useContext, useState } from 'react';

interface ContextProps {
  lenguage: boolean;
  change: () => void;
}

//Context
export const LenguageContext = createContext<ContextProps>({
  lenguage: true,
  change: () => {}
});

//Provider
export const LenguageContextProvider = (props: React.PropsWithChildren) => {
  const [lenguage, setLenguage] = useState<boolean>(true);

  const change = () => {
    setLenguage(!lenguage);
  };

  return (
    <LenguageContext.Provider
      value={{
        lenguage,
        change,
      }}>
      {props.children}
    </LenguageContext.Provider>
  );
};

export default function useLenguageContext() {
  const context = useContext(LenguageContext);
  if (!context) {
    throw new Error('useLenguageContext must be used within a LenguageProvider');
  }
  return context;
}