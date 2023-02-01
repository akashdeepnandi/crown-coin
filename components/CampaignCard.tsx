import Link from "next/link";

const CampaignCard:React.FC<any> = ({ campaign }) => {
  return (
    <div className="rounded shadow-lg mb-1 p-4">
      <Link href={"/" + campaign}>
        <h3 className="truncate border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3">Address: @{campaign}</h3>
      </Link>
    </div>
  )
}

export default CampaignCard;
