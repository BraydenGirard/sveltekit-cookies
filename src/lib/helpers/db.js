import { Tedis } from "tedis";

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { client: null }
}

export default function getDbClient() {
  if (cached.client) {
    return cached.client
  }

  cached.client = new Tedis({host: "127.0.0.1", port: 6379})

  return cached.client
}