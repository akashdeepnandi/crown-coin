import Head from 'next/head'
import Layout from '../../../components/Layout'
import CampaignRequestNew from '../../../components/pages/CampaignRequestNew'

const CampaignRequestNewPage = () => {
  return (
    <Layout>
      <Head>
        <title>Crowd Coin | Campaign</title>
        <meta name='description' content='Eth App for Crowd Campaigns' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <CampaignRequestNew />
    </Layout>
  )
}
export default CampaignRequestNewPage;
