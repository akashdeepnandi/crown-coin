import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import CampaignRequestsTable from '../../../components/CampaignRequestsTable'
import Layout from '../../../components/Layout'
import { getCampaign } from '../../../ethereum/campaign'
import { CampaignRequest } from '../../../types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chash = context.query.chash as string
  const campaign = getCampaign(chash)
  const rCount: number = await campaign.methods.getRequestsCount().call()
  const requests = (
    await Promise.all(
      Array(rCount)
        .fill(0)
        .map((_, index) => campaign.methods.requests(index).call())
    )
  ).map((r) => {
    const { description, value, recipient, complete, approvalCount } = r
    return {
      description,
      value,
      recipient,
      complete,
      approvalCount,
    }
  });

  const approversCount = await campaign.methods.approversCount().call();
  return {
    props: {
      requests,
      chash,
      approversCount
    },
  }
}

const CampaignRequestsPage = ({
  requests,
  chash,
  approversCount,
}: {
  requests: CampaignRequest[]
  chash: string
  approversCount: number
}) => {
  return (
    <Layout>
      <Head>
        <title>Crowd Coin | Requests</title>
        <meta name='description' content='Eth App for Crowd Campaigns' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='mt-4'>
        <Link
          href={`/${chash}/requests/new`}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create a request here!
        </Link>
      </div>
      <CampaignRequestsTable requests={requests} approversCount={approversCount}/>
    </Layout>
  )
}
export default CampaignRequestsPage;
