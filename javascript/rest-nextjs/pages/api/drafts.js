import prisma from '../../lib/prisma'

export function getDrafts() {
  return prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })
}

export default async function handle(req, res) {
  const posts = await getDrafts()
  res.json(posts)
}
