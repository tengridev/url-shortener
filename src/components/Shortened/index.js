import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faChartPie,
  faCopy,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { settings } from '../../data/settings'
import { ads } from '../../data/ads'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

const Shortened = ({ title, data, advertising }) => {
  const { t } = useTranslation('ads')
  const [copied, setCopied] = useState(false)

  const AdsComponent = (order) => {
    if (ads.shortened.active && ads.shortened.data?.length > 0) {
      const find = ads.shortened.data.find((item) => item.order === order.order)

      if (find) {
        return (
          <div className="shortened-item">
            <div className="shortened-ads">{t('shortened-ads')}</div>
            <div className="shortened-urls">
              <p className="shortened-short">
                <Link href={find.short.href}>
                  <a title={find.short.title} rel={find.short.rel}>
                    {find.short.text}
                  </a>
                </Link>
              </p>

              <p className="shortened-long whitespace-nowrap overflow-hidden text-ellipsis">
                <Link href={find.long.href}>
                  <a title={find.long.title} rel={find.long.rel}>
                    {find.long.text}
                  </a>
                </Link>
              </p>
            </div>
            <div className="shortened-button-group">
              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>

              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" />
              </button>

              <CopyToClipboard
                text={find.short.href}
                onCopy={() => {
                  setCopied(find.short.href)

                  setTimeout(() => {
                    setCopied(false)
                  }, 1000)
                }}
              >
                <button type="button" className="shortened-button">
                  <FontAwesomeIcon
                    icon={
                      copied && copied === find.short.href ? faCheck : faCopy
                    }
                    className={`w-4 h-4 ${
                      copied && copied === find.short.href
                        ? 'animate-pulse'
                        : ''
                    }`}
                  />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        )
      }
    }

    return false
  }

  return (
    <div className="shortened">
      {title && <h5 className="shortened-title">{title}</h5>}
      <div className="shortened-card">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {advertising && <AdsComponent order={index} />}

            <div className="shortened-item">
              <div className="shortened-urls">
                <p className="shortened-short">
                  <Link
                    href={
                      item.service === settings.main.parse.hostname
                        ? {
                            pathname: '/[slug]',
                            query: { slug: item.slug }
                          }
                        : item.short
                    }
                  >
                    <a>
                      {item.service}/{item.slug}
                    </a>
                  </Link>
                </p>

                <p className="shortened-long whitespace-nowrap overflow-hidden text-ellipsis">
                  <Link href={item.long}>
                    <a rel="nofollow">{item.long}</a>
                  </Link>
                </p>
              </div>
              <div className="shortened-button-group">
                <Link
                  href={{
                    pathname: '/delete/[delete]',
                    query: { delete: item.delete }
                  }}
                >
                  <a className="shortened-button">
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                  </a>
                </Link>

                <Link
                  href={
                    item.service === settings.main.parse.hostname
                      ? {
                          pathname: '/statistics/[slug]',
                          query: { slug: item.slug }
                        }
                      : `https://${item.service}/statistics/${item.slug}`
                  }
                >
                  <a className="shortened-button">
                    <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" />
                  </a>
                </Link>

                <CopyToClipboard
                  text={item.short}
                  onCopy={() => {
                    setCopied(item.short)

                    setTimeout(() => {
                      setCopied(false)
                    }, 1000)
                  }}
                >
                  <button type="button" className="shortened-button">
                    <FontAwesomeIcon
                      icon={copied && copied === item.short ? faCheck : faCopy}
                      className={`w-4 h-4 ${
                        copied && copied === item.short ? 'animate-pulse' : ''
                      }`}
                    />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Shortened
