import { PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

export const Statistics = class {
  async urls() {
    const today = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment.utc().endOf('days').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('days').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const yesterday = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment
            .utc()
            .subtract(1, 'days')
            .endOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment
            .utc()
            .subtract(1, 'days')
            .startOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastWeek = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment.utc().endOf('W').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('W').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastMonth = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment.utc().endOf('months').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('months').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastYear = await prisma.urls.count({
      where: {
        createdAt: {
          lte: moment.utc().endOf('years').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('years').format('YYYY-MM-DDTHH:mm:ssZ')
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
          lte: moment.utc().endOf('days').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('days').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const yesterday = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment
            .utc()
            .subtract(1, 'days')
            .endOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment
            .utc()
            .subtract(1, 'days')
            .startOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastWeek = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment.utc().endOf('W').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('W').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastMonth = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment.utc().endOf('months').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('months').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastYear = await prisma.visits.count({
      where: {
        createdAt: {
          lte: moment.utc().endOf('years').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('years').format('YYYY-MM-DDTHH:mm:ssZ')
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
          lte: moment.utc().endOf('days').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('days').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const yesterday = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment
            .utc()
            .subtract(1, 'days')
            .endOf('days')
            .format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment
            .utc()
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
          lte: moment.utc().endOf('W').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('W').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastMonth = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment.utc().endOf('months').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('months').format('YYYY-MM-DDTHH:mm:ssZ')
        }
      }
    })
    const lastYear = await prisma.visits.count({
      where: {
        url: data.urlId,
        createdAt: {
          lte: moment.utc().endOf('years').format('YYYY-MM-DDTHH:mm:ssZ'),
          gte: moment.utc().startOf('years').format('YYYY-MM-DDTHH:mm:ssZ')
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
