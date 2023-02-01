import { useRouter } from 'next/router'
import React, { useState, MouseEvent } from 'react'
import { getCampaign } from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { CampaignSummary } from '../types'
import { Loader } from './Loader'

const ContributeForm = ({
  chash,
  summary,
}: {
  chash: string
  summary: CampaignSummary
}) => {
  const [amount, setAmount] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    let success = false;
    const num = Number(amount)
    if (isNaN(num) || num == 0) {
      setError('Please input a valid number greater than 0')
      setLoading(false)
      return
    }

    if (num <= summary.minimumAmount) {
      setError('Please enter value greater than minimum amount: ' + summary.minimumAmount)
      setLoading(false)
      return
    }
    const campaign = getCampaign(chash);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: num,
      });
      success = true;
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false);
    if(success) router.reload();
  }
  return (
    <div className='relative'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='minimum'
          >
            Contribute to this Campaign! (Amount in Wei)
          </label>
          <input
            className={`shadow appearance-none border ${
              error && 'border-red-500'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id='minimum'
            type='text'
            placeholder='200'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <p className='text-red-500 text-xs italic mt-2'>{error}</p>}
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
            Contribute!
          </button>
        </div>
      </form>
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full grid place-items-center bg-gray-200 opacity-40'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default ContributeForm
