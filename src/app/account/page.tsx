import NotAccount from "@/components/NotAccount"
import Account from "@/components/Account"
import { authAction } from "@/actions/users"
import { addressesAction } from "@/actions/addresses"

export default async function Page() {
  const auth = await authAction()

  if (auth.status !== 200 || !auth.data) {
    return <NotAccount />
  }

  const addresses = await addressesAction(auth.data.userid)

  return (
    <Account
      authData={auth.data}
      addressesData={addresses.data ?? []}
    />
  )
}
