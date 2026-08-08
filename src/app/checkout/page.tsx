import { authAction } from "@/actions/users"
import Checkout from "@/components/Checkout"
import { redirect } from "next/navigation"
import { addressesAction } from "@/actions/addresses"

export default async function Page() {
  const auth = await authAction()

  if (auth.status !== 200 || !auth.data) {
    redirect("/account")
  }

  const addresses = await addressesAction(auth.data.userid)

  return (
    <div className="container2">
      <Checkout addressesData={addresses.data ?? []} />
    </div>
  )
}
