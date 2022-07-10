import "styles/index.css";
import Head from "next/head";
import Router from "next/router";
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import React, { Fragment } from "react";
import { AuthContextProvider } from "contexts/AuthContext";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

nProgress.configure({ showSpinner: false });

const App = (props: any) => {
  const { Component, pageProps } = props;
  const Layout = Component?.Layout || Fragment;

  return (
    <>
      <Head>
        <title>Trackem</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
      ;
    </>
  );
};

export default App;
