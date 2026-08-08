"use server"

import db from "@/lib/db"
import { Address } from "@/types/global"
import { revalidatePath } from "next/cache"

export async function addAddressAction(
  name: string,
  city: string,
  address: string,
  phone: string,
  userid: number
) {
  await db`INSERT INTO addresses (name, city, address, phone, userid) VALUES (${name}, ${city}, ${address}, ${phone}, ${userid})`
  revalidatePath("/account")
  return {
    status: 200,
    body: "add address success",
  }
}

export async function addressesAction(userid: number) {
  const result = (await db`SELECT * FROM addresses WHERE userid = ${userid}`) as Address[]
  return {
    status: 200,
    body: "addresses success",
    data: result,
  }
}

export async function removeAddressAction(id: number) {
  await db`DELETE FROM addresses WHERE id = ${id}`
  revalidatePath("/account")
  return {
    status: 200,
    body: "remove address success",
  }
}
