import Head from 'next/head'
import ImmigrantsInflux from "./immigrantsInflux";

export default function Index() {
  return (
    <>
      <Head>
        <title>
          ImmigrantsInflux Data Visualization
        </title>
      </Head>
      <ImmigrantsInflux />
    </>
  )
}