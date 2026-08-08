import { productAction, productsAction } from "@/actions/products"
import Image from "next/image"
import AddCart from "@/components/AddCart"

export async function generateStaticParams() {
  try {
    const result = await productsAction()
    return result.data.map(product => ({
      id: String(product.id),
    }))
  } catch {
    // 构建时连不上 Neon 时跳过预渲染，运行时再按需生成
    return []
  }
}

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params
  const res = await productAction(Number(id))
  const product = res.data
  return (
    <div className="container flex py-6">
      <div className="w-64">
        <h2 className="font-sans text-3xl leading-10 font-bold my-8">{product.name}</h2>
        <p className="leading-10">{product.description}</p>
      </div>
      <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
        <Image src={product.image} alt={product.name} fill priority sizes="300" style={{objectFit: 'cover'}} />
      </div>
      <AddCart product={product} />
    </div>
  )
}