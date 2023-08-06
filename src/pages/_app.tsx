import { type AppType } from "next/app"
import { api } from "@rithik/chunitools/utils/api"
import "@rithik/chunitools/styles/globals.css"
import Head from "next/head"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Chunithm Gaming</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default api.withTRPC(MyApp)
