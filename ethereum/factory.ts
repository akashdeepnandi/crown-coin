import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5D900Ce1f78DEBd938b138c337A7DA1BCeEDDF0B'
)

export default factory;
