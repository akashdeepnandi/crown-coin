import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Campaign from '../../components/pages/Campaign'
import { getCampaign } from '../../ethereum/campaign'
import { CampaignSummary } from '../../types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chash = context.query.chash as string
  const campaign = getCampaign(chash)
  const summary = await campaign.methods.getSummary().call()
  const [minimumAmount, balance, requestsCount, approversCount, manager] =
    Object.values(summary)

  return {
    props: {
      summary: {
        minimumAmount,
        balance,
        requestsCount,
        approversCount,
        manager,
      },
      chash,
    },
  }
}

const CampaignPage = ({
  summary,
  chash,
}: {
  summary: CampaignSummary
  chash: string
}) => {
  return (
    <Layout>
      <Head>
        <title>Crowd Coin | Campaign</title>
        <meta name='description' content='Eth App for Crowd Campaigns' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Campaign chash={chash || ''} summary={summary} />
    </Layout>
  )
}
export default CampaignPage
