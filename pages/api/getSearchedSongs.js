import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getSearchedSongs(req, res) {
  const { query } = req.query;
  res.json(query);
}
