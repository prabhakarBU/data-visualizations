import Head from 'next/head'
import ImmigrantsInflux from "./immigrantsInflux";

export default function Root() {
  return (
    <>
      <Head>
        <title>SneakerHead</title>
      </Head>
      <ImmigrantsInflux />
    </>
  )
}