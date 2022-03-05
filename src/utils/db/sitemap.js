import { sitemap } from '../../data/sitemap'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Sitemap = class {
  async pagination(data) {
    const query = await prisma.urls.findMany({
      select: {
        slug: true,
        short: true,
        createdAt: true
      },
      where: {
        service: {
          contains: data.service
        }
      },
      skip: data.page <= 0 ? 0 : data.page * sitemap.limit - sitemap.limit,
      take: sitemap.limit
    })

    if (query.length > 0) {
      const total = await prisma.urls.count({
        where: {
          service: {
            contains: data.service
          }
        }
      })

      return {
        sitemap: {
          total: total,
          limit: sitemap.limit,
          page: {
            total: Math.ceil(total / sitemap.limit),
            current: data.page <= 0 ? 1 : data.page
          },
          data: query
        }
      }
    } else {
      return {
        sitemap: {
          total: 0
        }
      }
    }
  }
}
