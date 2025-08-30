"use client";

import { config } from "@/config";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

function App({ children }) {
  const queryClient = new QueryClient();    
  return (

      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
   
  );
}

export default App;