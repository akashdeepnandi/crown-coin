import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Campaigns from '../components/pages/Campaigns'
import factory from '../ethereum/factory'

export const getServerSideProps: GetServerSideProps = async () => {
  const campaigns: any[] = await factory.methods.getDeployedCampaigns().call()
  return {
    props: {
      campaigns,
    },
  }
}

const Home = ({ campaigns }: { campaigns: any[] }) => (
  <Layout>
    <Head>
      <title>Crowd Coin</title>
      <meta name='description' content='Eth App for Crowd Campaigns' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Campaigns campaigns={campaigns} />
  </Layout>
)

export default Home
