'use client'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Product } from "@/types/global"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCartStore } from "@/store"

export default function AddCart({ product }: { product: Product }) {
  const [value, setValue] = useState<string[]>([])
  const {cartList, addToCart, isItemInCart, updateQuantity} = useCartStore()
  const handleValueChange = (value: string[]) => {
    setValue(value)
  }
  const selectedVariant = value[0] ?? ''
  const handleClick = () => {
    const index = isItemInCart(product.name, selectedVariant)
    if (index < 0) {
      addToCart({
        product,
        quantity: 1,
        selectedVariant
      })
    } else {
      updateQuantity(index, cartList[index].quantity + 1)
    }
    setValue([])
  }
  return (
    <div className="w-80 py-12">
      <h3>Select</h3>
      <ToggleGroup value={value} className="justify-start py-6 border-b mb-6" variant="outline" onValueChange={handleValueChange}>
        { product.variant.map((item, i) => <ToggleGroupItem className="px-4 bg-slate-50 mr-3" key={i} value={item}>{item}</ToggleGroupItem>) }
      </ToggleGroup>
      <h3>Price</h3>
      <p className="text-2xl font-bold text-red-400 mb-6">${product.price}</p>
      <Button disabled={!selectedVariant} onClick={handleClick}>Add to cart</Button>
    </div>
  )
}