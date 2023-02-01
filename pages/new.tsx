import Head from 'next/head'
import Layout from '../components/Layout'
import { NewCampaign } from '../components/pages/NewCampaign'

const NewCampaignPage = () => {
  return (
    <Layout>
      <Head>
        <title>Crowd Coin | New</title>
        <meta name='description' content='Eth App for Crowd Campaigns' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NewCampaign />
    </Layout>
  )

}

export default NewCampaignPage;
