import { settings } from '../../data/settings'
import { PrismaClient } from '@prisma/client'
import requestIp from 'request-ip'
import moment from 'moment'

const prisma = new PrismaClient()

export const IP = class {
  constructor(req) {
    const clientIp = requestIp.getClientIp(req)

    this.ipAddress =
      clientIp?.substring(0, 7) === '::ffff:' ? clientIp.substring(7) : clientIp
    this.userAgent = req?.headers['user-agent'] || navigator.userAgent
  }

  async ip() {
    const query = await prisma.ip.findFirst({
      where: {
        ipAddress: this.ipAddress,
        userAgent: this.userAgent
      }
    })

    if (query) {
      return query
    } else {
      const insert = await prisma.ip.create({
        data: {
          ipAddress: this.ipAddress,
          userAgent: this.userAgent
        }
      })

      return insert
    }
  }

  async autoBan() {
    if (settings.autoBan.active) {
      const ip = await this.ip()

      if (!settings.autoBan.whitelist.includes(ip.ipAddress)) {
        const urls = await prisma.urls.count({
          where: {
            ip: ip.id,
            createdAt: {
              lte: moment().endOf('minutes').format('YYYY-MM-DDTHH:mm:ssZ'),
              gte: moment().startOf('minutes').format('YYYY-MM-DDTHH:mm:ssZ')
            }
          }
        })
        const visits = await prisma.visits.count({
          where: {
            ip: ip.id,
            createdAt: {
              lte: moment().endOf('minutes').format('YYYY-MM-DDTHH:mm:ssZ'),
              gte: moment().startOf('minutes').format('YYYY-MM-DDTHH:mm:ssZ')
            }
          }
        })

        if (
          urls >= settings.autoBan.limit.url ||
          visits >= settings.autoBan.limit.visit
        ) {
          await prisma.ip.update({
            where: {
              id: ip.id
            },
            data: {
              ban: true
            }
          })
        }
      }
    }
  }
}
