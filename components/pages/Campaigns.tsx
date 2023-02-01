import Link from 'next/link'
import CampaignCard from '../CampaignCard'

interface Props {
  campaigns: string[]
}

const Campaigns = ({ campaigns }: Props) => {
  return (
    <section>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-blue-500'>All Campaigns</h2>
        <Link
          href='/new'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Campaign
        </Link>
      </div>

      <hr className='my-2' />
      <div className='grid grid-cols-2 gap-5'>
        {campaigns.map((c) => (
          <CampaignCard key={c} campaign={c} />
        ))}
      </div>
    </section>
  )
}

export default Campaigns
