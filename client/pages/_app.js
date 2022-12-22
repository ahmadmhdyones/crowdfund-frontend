import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
//thats what makes tailwind work (importing the globals.css which imports tailwind things)
import "../styles/globals.css";
import Layout from "../src/components/Layout";
import { StateContextProvider } from "../src/context";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <StateContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
