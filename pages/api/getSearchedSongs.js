import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await prisma.$queryRaw`
      SELECT id, title, artist, duration, poster, "artistDescription", "artistPoster"
      FROM "songs"
      WHERE to_tsvector('english', title || ' ' || artist) @@ plainto_tsquery('english', ${query});
    `;
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
