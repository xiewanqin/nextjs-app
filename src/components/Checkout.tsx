'use client'
import { Address, CartItem } from '@/types/global'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/ui/table'
import { Button } from './ui/button'
import Image from 'next/image'
import { useCartStore } from '@/store'
import { useState } from 'react'

export default function Checkout({
  addressesData,
}: {
  addressesData: Address[]
}) {
  const { cartList } = useCartStore()
  const [selectAddress, setSelectAddress] = useState('')
  return (
    <>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Address</h2>
        {addressesData.length === 0 ? (
          <div className="my-2">
            <p>Don&#39;t have a shipping address yet?</p>
            <div className="flex text-sm items-center underline text-orange-400">
              <Link href="/account">Add address</Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <div>
            <Select
              value={selectAddress || null}
              onValueChange={(value: string | null) => {
                if (value !== null) setSelectAddress(value)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a address">
                  {(value: string | null) => {
                    const address = addressesData.find(
                      (item) => item.id.toString() === value
                    )
                    if (!address) return null
                    return `${address.name} · ${address.city} · ${address.address}`
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Address</SelectLabel>
                  {addressesData.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                      label={`${item.name} ${item.city} ${item.address}`}
                    >
                      <div className="py-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.city} · {item.address} · {item.phone}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Cart</h2>
        {cartList.length === 0 ? (
          <div className="my-2">
            <p>
              You don&#39;t have anything in your cart. Let&#39;s change that,
              use the link below to start browsing our products.
            </p>
            <div className="flex text-sm items-center underline text-orange-400">
              <Link href="/">Start Shopping</Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((cartItem: CartItem, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Image
                          src={cartItem.product.image}
                          alt={cartItem.product.name}
                          width={64}
                          height={64}
                          priority
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'cover',
                          }}
                        />
                        <div className="ml-4 space-y-3">
                          <p className="text-sm font-medium">
                            {cartItem.product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {cartItem.selectedVariant}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{cartItem.quantity}</TableCell>
                    <TableCell>${cartItem.product.price}</TableCell>
                    <TableCell className="text-right">
                      ${cartItem.product.price * cartItem.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    $
                    {cartList
                      .reduce(
                        (acc: number, cartItem: CartItem) =>
                          acc + cartItem.product.price * cartItem.quantity,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}

      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Payment</h2>
        <p>In the process of functional construction ...</p>
      </div>
      <div className="mt-4">
        <Button disabled={!selectAddress || !cartList.length}>Create order</Button>
      </div>
    </>
  )
}
