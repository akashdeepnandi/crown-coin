import { useRouter } from 'next/router'
import React, { useState, MouseEvent } from 'react'
import { getCampaign } from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { CampaignRequest } from '../types'
import { Loader } from './Loader'

type OmitRequestInput = 'complete' | 'approvalCount'
type RequestInput = Omit<CampaignRequest, OmitRequestInput>
type InputKey = keyof RequestInput

export default function CreateRequestForm() {
  const [formData, setFormData] = useState<RequestInput>({
    value: 0,
    description: '',
    recipient: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const chash = router.query.chash as string

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true);
    let success = false;

    const { description, value, recipient } = formData
    /* const num = Number(amount) */
    /* if (isNaN(num) || num == 0) { */
    /*   setError('Please input a valid number greater than 0') */
    /*   setLoading(false) */
    /*   return */
    /* } */
    /**/
    /* if (num <= summary.minimumAmount) { */
    /*   setError('Please enter value greater than minimum amount: ' + summary.minimumAmount) */
    /*   setLoading(false) */
    /*   return */
    /* } */
    const campaign = getCampaign(chash)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.createRequest(description, value, recipient).send({
        from: accounts[0],
      });
      success = true;
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false);
    if(success) router.push(`/${chash}/requests`)
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: InputKey
  ) => {
    const val = e.target.value
    setFormData({
      ...formData,
      [key]: val,
    })
  }

  return (
    <div className='relative'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8'
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className='mb-3 font-bold'>Create a Request</h2>
        <div className='mb-3'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='minimum'
          >
            Description
          </label>
          <input
            className={`shadow appearance-none border ${
              error && 'border-red-500'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id='minimum'
            type='text'
            placeholder='200'
            value={formData.description}
            onChange={(e) => handleOnChange(e, 'description')}
          />
        </div>
        <div className='mb-3'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='minimum'
          >
            Value
          </label>
          <input
            className={`shadow appearance-none border ${
              error && 'border-red-500'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id='minimum'
            type='text'
            placeholder='200'
            value={formData.value}
            onChange={(e) => handleOnChange(e, 'value')}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='minimum'
          >
            Recipient
          </label>
          <input
            className={`shadow appearance-none border ${
              error && 'border-red-500'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id='minimum'
            type='text'
            placeholder='200'
            value={formData.recipient}
            onChange={(e) => handleOnChange(e, 'recipient')}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className={`${
              loading ? 'bg-blue-200' : 'bg-blue-500'
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type='button'
            onClick={handleSubmit}
            disabled={loading}
          >
            Create!
          </button>
        </div>
        {error && <p className='text-red-500 text-xs italic mt-2'>{error}</p>}
      </form>
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full grid place-items-center bg-gray-200 opacity-40'>
          <Loader />
        </div>
      )}
    </div>
  )
}
