import { settings } from '../../data/settings'
import { PrismaClient } from '@prisma/client'
import md5 from 'crypto-js/md5'
import moment from 'moment'

const prisma = new PrismaClient()

export const URLs = class {
  async slug(max, length, service, slug = false) {
    const chars = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9'
    ]

    if (!slug) {
      slug = ''
      for (let i = 0; i < length; i++) {
        slug += chars[Math.floor(Math.random() * (max + 1))]
      }
    }

    const keys = {
      hash: md5(`${settings.keys.signature}:${service}:${slug}`).toString(),
      delete: md5(
        `${settings.keys.signature}:${service}:${slug}:${new Date().getTime()}`
      ).toString()
    }

    const query = await prisma.urls.findFirst({
      where: {
        hash: keys.hash
      }
    })

    if (query) {
      await this.slug(max, length, service)
    } else {
      const short = `${settings.main.parse.protocol}//${service}/${slug}`

      this.createSlug = {
        slug: slug,
        short: short,
        service: service,
        hash: keys.hash,
        delete: keys.delete
      }
    }
  }

  async slugControl(service, slug) {
    const keys = {
      hash: md5(`${settings.keys.signature}:${service}:${slug}`).toString()
    }

    const query = await prisma.urls.findFirst({
      where: {
        hash: keys.hash
      }
    })

    return query ? true : false
  }

  async get(ip, hash, options = false) {
    const query = await prisma.urls.findFirst({
      select: {
        id: true,
        slug: true,
        short: true,
        long: true,
        service: true,
        redirect: true,
        hash: true,
        delete: options?.delete === false ? false : true,
        createdAt: true,
        updatedAt: true
      },
      where: {
        hash: hash
      }
    })

    if (query) {
      if (options?.visit) {
        await prisma.visits.create({
          data: {
            url: query.id,
            ip: ip.id
          }
        })
      }

      return {
        ...query,
        format: {
          createdAt: moment(query.createdAt).format('DD.MM.YYYY HH:mm:ss'),
          updatedAt: moment(query.updatedAt).format('DD.MM.YYYY HH:mm:ss')
        }
      }
    } else {
      return {
        error: {
          key: 'data_not_found'
        }
      }
    }
  }

  async delete(hash) {
    const query = await prisma.urls.findFirst({
      select: {
        id: true
      },
      where: {
        delete: hash
      }
    })

    if (query) {
      const urls = await prisma.urls.deleteMany({
        where: {
          delete: hash
        }
      })
      const visits = await prisma.visits.deleteMany({
        where: {
          url: query.id
        }
      })

      if (urls.count > 0 && visits.count > 0) {
        return {
          success: {
            key: 'data_deleted'
          }
        }
      } else if (urls.count > 0) {
        return {
          success: {
            key: 'url_deleted'
          }
        }
      } else if (visits.count > 0) {
        return {
          success: {
            key: 'statistics_deleted'
          }
        }
      } else {
        return {
          error: {
            key: 'data_not_deleted'
          }
        }
      }
    } else {
      return {
        error: {
          key: 'data_not_found'
        }
      }
    }
  }

  async add(ip, service, address, redirect, slug = false) {
    await this.slug(61, settings.slugs.length, service, slug)

    const create = await prisma.urls.create({
      data: {
        slug: this.createSlug.slug,
        short: this.createSlug.short,
        long: address,
        service: this.createSlug.service,
        redirect: redirect,
        hash: this.createSlug.hash,
        delete: this.createSlug.delete,
        ip: ip.id
      }
    })

    if (create) {
      return create
    } else {
      return {
        error: {
          key: 'data_not_inserted'
        }
      }
    }
  }
}
