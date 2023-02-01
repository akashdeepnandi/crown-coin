export interface CampaignSummary {
  minimumAmount: number
  balance: number
  requestsCount: number
  approversCount: number
  manager: string
}

export interface CampaignRequest {
  description: string
  value: number
  recipient: string
  complete: boolean
  approvalCount: number
}
