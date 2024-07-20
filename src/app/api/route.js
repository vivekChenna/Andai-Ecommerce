import client from "@/lib/graphql-client";

export default async function handler(req, res) {
    try {
      const data = await client.request(query);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }