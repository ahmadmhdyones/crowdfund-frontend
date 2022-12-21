import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
//thats what makes tailwind work (importing the globals.css which imports tailwind things)
import "../styles/globals.css";
import Layout from "../src/components/Layout";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  );
}

export default MyApp;
