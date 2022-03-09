import { PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

export const Statistics = class {
  async urls() {
    const today = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const yesterday = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment()
            .subtract(1, 'days')
            .endOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment()
            .subtract(1, 'days')
            .startOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastWeek = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment().endOf('W').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('W').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastMonth = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment().endOf('months').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('months').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastYear = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment().endOf('years').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('years').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const all = await prisma.urls.count()

    return {
      today,
      yesterday,
      lastWeek,
      lastMonth,
      lastYear,
      all
    }
  }

  async visits() {
    const today = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const yesterday = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment()
            .subtract(1, 'days')
            .endOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment()
            .subtract(1, 'days')
            .startOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastWeek = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment().endOf('W').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('W').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastMonth = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment().endOf('months').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('months').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastYear = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment().endOf('years').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('years').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const all = await prisma.visits.count()

    return {
      today,
      yesterday,
      lastWeek,
      lastMonth,
      lastYear,
      all
    }
  }

  async visit(data) {
    const today = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const yesterday = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment()
            .subtract(1, 'days')
            .endOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment()
            .subtract(1, 'days')
            .startOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastWeek = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment().endOf('W').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('W').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastMonth = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment().endOf('months').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('months').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastYear = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment().endOf('years').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment().startOf('years').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const all = await prisma.visits.count({
      where: {
        url: data.urlId
      }
    })

    return {
      today,
      yesterday,
      lastWeek,
      lastMonth,
      lastYear,
      all
    }
  }
}
