import Link from 'next/link'
import React from 'react'
import { CampaignSummary } from '../../types'
import ContributeForm from '../ContributeForm'

export default function Campaign({
  chash,
  summary,
}: {
  chash: string
  summary: CampaignSummary
}) {
  return (
    <div>
      <h2 className='text-blue-500 text-lg font-bold text-center'>
        Campaign: {chash}
      </h2>
      <p className='my-2 text-sm text-center'>
        The Campaign was created by{' '}
        <span className='bg-yellow-300'>{summary.manager}</span> and all
        requests are managed by him.
      </p>
      <hr className='my-2' />
      <div className='flex justify-between mt-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='shadow-lg rounded p-4 border text-center'>
            <h3 className='mb-1 font-bold'>Campaign Balance</h3>
            <p className='font-bold text-lg text-green-600'>
              {summary.balance} Wei
            </p>
          </div>
          <div className='shadow-lg rounded p-4 border text-center'>
            <h3 className='mb-1 font-bold'>Minimum Contribution</h3>
            <p className='font-bold text-lg text-green-600'>
              {summary.minimumAmount} Wei
            </p>
          </div>
          <div className='shadow-lg rounded p-4 border text-center'>
            <h3 className='mb-1 font-bold'>Requests</h3>
            <p className='font-bold text-lg text-green-600'>
              {summary.requestsCount}
            </p>
          </div>
          <div className='shadow-lg rounded p-4 border text-center'>
            <h3 className='mb-1 font-bold'>Contributors</h3>
            <p className='font-bold text-lg text-green-600'>
              {summary.approversCount}
            </p>
          </div>
        </div>
        <div>
          <ContributeForm summary={summary} chash={chash} />
        </div>
      </div>
      <div className='mt-4'>
        <Link href={`/${chash}/requests`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          View Requests
        </Link>
      </div>
    </div>
  )
}
