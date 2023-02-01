import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getCampaign } from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { CampaignRequest } from '../types'
import { Loader } from './Loader'

const CampaignRequestRow = ({
  request,
  index,
  approversCount,
}: {
  request: CampaignRequest
  index: number
  approversCount: number
}) => {
  const { description, complete, value, approvalCount, recipient } = request
  const router = useRouter()
  const chash = router.query.chash as string
  const [aLoader, setALoader] = useState(false)
  const [fLoader, setFLoader] = useState(false)
  const approveRequest = async () => {
    const campaign = getCampaign(chash)
    setALoader(true)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.approveRequest(index).send({
        from: accounts[0],
      })
      router.reload()
    } catch (err) {
      console.log(err)
    }
    setALoader(false)
  }

  const finalizeRequest = async () => {
    const campaign = getCampaign(chash)
    setFLoader(true)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.finalizeRequest(index).send({
        from: accounts[0],
      })
      router.reload()
    } catch (err) {
      console.log(err)
    }
    setFLoader(false)
  }

  console.log({
    complete
  })
  return (
    <tr className={`border-t ${complete ? "bg-gray-400" : ""}`}>
      <td className='p-2'>{index + 1}</td>
      <td className='p-2'>{description}</td>
      <td className='p-2'>{value}</td>
      <td className='p-2'>{recipient}</td>
      <td className='p-2'>
        {approvalCount}/{approversCount}
      </td>
      <td className='p-2 relative'>
        {!complete ? (
          <>
            <button
              className={`${
                aLoader ? 'bg--blue-500' : 'bg-blue-700'
              } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type='button'
              onClick={approveRequest}
              disabled={aLoader}
            >
              Approve
            </button>
            {aLoader && (
              <div className='absolute top-0 left-0 w-full h-full grid place-items-center bg-gray-200 opacity-40'>
                <Loader />
              </div>
            )}
          </>
        ) : null}
      </td>
      <td className='p-2 relative'>
        {!complete ? (
          <>
            <button
              className={` ${
                fLoader ? 'bg-red-500' : 'bg-red-700'
              } hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type='button'
              onClick={finalizeRequest}
              disabled={fLoader}
            >
              Finalize
            </button>
            {fLoader && (
              <div className='absolute top-0 left-0 w-full h-full grid place-items-center bg-gray-200 opacity-40'>
                <Loader />
              </div>
            )}
          </>
        ) : null}
      </td>
    </tr>
  )
}

export default CampaignRequestRow
