import prisma from '../../lib/prisma'

export function getFeed() {
  return prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
}

export default async function handle(req, res) {
  const posts = await getFeed();
  res.json(posts)
}
