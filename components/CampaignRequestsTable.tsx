import React from 'react'
import { CampaignRequest } from '../types'
import CampaignRequestRow from './CampaignRequestRow'

const CampaignRequestsTable = ({
  requests,
  approversCount
}: {
  requests: CampaignRequest[]
  approversCount: number
}) => {
  return (
    <div className='mt-4'>
      <table className='table-auto'>
        <thead>
          <tr className='border-t'>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Recipient</th>
            <th>Approval Count</th>
            <th>Approve</th>
            <th>Finalize</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request ,index) => (
            <CampaignRequestRow key={index} index={index} request={request} approversCount={approversCount}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CampaignRequestsTable
