import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { regex } from '../utils/regex'
import { settings } from '../data/settings'
import { ads } from '../data/ads'
import Link from 'next/link'
import Subheader from '../components/Subheader'
import Alert from '../components/Alert'
import md5 from 'crypto-js/md5'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'

const SlugPage = ({ serverSide }) => {
  const { t } = useTranslation('home')

  const router = useRouter()

  const [countdown, setCountdown] = useState(settings.redirects.timer.countdown)

  useEffect(() => {
    if (serverSide.data) {
      let redirected = false

      const interval = setInterval(() => {
        if (document.hasFocus()) {
          if (countdown > 0) {
            setCountdown(--countdown)
          } else {
            if (
              !settings.redirects.timer.redirectButton &&
              !redirected &&
              router
            ) {
              redirected = true

              router.push(serverSide.data.long)
            }
          }
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [countdown, router, serverSide])

  return (
    <>
      <NextSeo
        title={t('title-slug', {
          siteTitle: t('all:site-title'),
          slug: serverSide.slug
        })}
        canonical={`${settings.main.URL}/${serverSide.slug}`}
        openGraph={{
          url: `${settings.main.URL}/${serverSide.slug}`,
          title: t('og-title-slug', {
            siteTitle: t('all:site-title'),
            slug: serverSide.slug
          }),
          description: t('all:og-description'),
          site_name: t('all:site-title')
        }}
        noindex={settings.noindex.home.slug}
      />

      {!serverSide.error ? (
        <>
          <Subheader data={serverSide.data} />

          {ads.timer.active &&
            (ads.timer.data.top.desktop.src ||
              ads.timer.data.top.mobile.src) && (
              <div className="mt-20 grid grid-cols-12">
                <div className="col-start-2 col-span-10 flex justify-center items-center">
                  {ads.timer.data.top.desktop.src && (
                    <Link href={ads.timer.data.top.desktop.href}>
                      <a
                        title={ads.timer.data.top.desktop.title}
                        rel={ads.timer.data.top.desktop.rel}
                        className="hidden sm:block"
                      >
                        <img
                          src={ads.timer.data.top.desktop.src}
                          alt={ads.timer.data.top.desktop.title}
                          width="100%"
                          height="100%"
                        />
                      </a>
                    </Link>
                  )}

                  {ads.timer.data.top.mobile.src && (
                    <Link href={ads.timer.data.top.mobile.href}>
                      <a
                        title={ads.timer.data.top.mobile.title}
                        rel={ads.timer.data.top.mobile.rel}
                        className="block sm:hidden"
                      >
                        <img
                          src={ads.timer.data.top.mobile.src}
                          alt={ads.timer.data.top.mobile.title}
                          width="100%"
                          height="100%"
                        />
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            )}

          <div className="main">
            <div
              className={
                ads.timer.active &&
                (ads.timer.data.left.desktop.src ||
                  ads.timer.data.right.desktop.src)
                  ? `timer justify-center md:justify-between md:gap-x-10`
                  : `timer justify-center`
              }
            >
              {ads.timer.active && ads.timer.data.left.desktop.src && (
                <div className="hidden md:flex justify-center items-center">
                  <Link href={ads.timer.data.left.desktop.href}>
                    <a
                      title={ads.timer.data.left.desktop.title}
                      rel={ads.timer.data.left.desktop.rel}
                    >
                      <img
                        src={ads.timer.data.left.desktop.src}
                        alt={ads.timer.data.left.desktop.title}
                        width="100%"
                        height="100%"
                      />
                    </a>
                  </Link>
                </div>
              )}

              <div className="timer-text flex justify-center items-center">
                {settings.redirects.timer.redirectButton && countdown <= 0 ? (
                  <button
                    type="button"
                    className="timer-redirect-button"
                    onClick={() => {
                      router.push(serverSide.data.long)
                    }}
                  >
                    {t('redirect-button')}
                  </button>
                ) : (
                  countdown
                )}
              </div>

              {ads.timer.active && ads.timer.data.right.desktop.src && (
                <div className="hidden md:flex justify-center items-center">
                  <Link href={ads.timer.data.right.desktop.href}>
                    <a
                      title={ads.timer.data.right.desktop.title}
                      rel={ads.timer.data.right.desktop.rel}
                    >
                      <img
                        src={ads.timer.data.right.desktop.src}
                        alt={ads.timer.data.right.desktop.title}
                        width="100%"
                        height="100%"
                      />
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {ads.timer.active &&
            (ads.timer.data.bottom.desktop.src ||
              ads.timer.data.bottom.mobile.src) && (
              <div className="mb-20 grid grid-cols-12">
                <div className="col-start-2 col-span-10 flex justify-center items-center">
                  {ads.timer.data.bottom.desktop.src && (
                    <Link href={ads.timer.data.bottom.desktop.href}>
                      <a
                        title={ads.timer.data.bottom.desktop.title}
                        rel={ads.timer.data.bottom.desktop.rel}
                        className="hidden sm:block"
                      >
                        <img
                          src={ads.timer.data.bottom.desktop.src}
                          alt={ads.timer.data.bottom.desktop.title}
                          width="100%"
                          height="100%"
                        />
                      </a>
                    </Link>
                  )}

                  {ads.timer.data.bottom.mobile.src && (
                    <Link href={ads.timer.data.bottom.mobile.href}>
                      <a
                        title={ads.timer.data.bottom.mobile.title}
                        rel={ads.timer.data.bottom.mobile.rel}
                        className="block sm:hidden"
                      >
                        <img
                          src={ads.timer.data.bottom.mobile.src}
                          alt={ads.timer.data.bottom.mobile.title}
                          width="100%"
                          height="100%"
                        />
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            )}
        </>
      ) : (
        <div className="main">
          <Alert
            title={t('error')}
            text={t(serverSide.error)}
            className="alert-danger"
          />
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug.replace(regex.replace.slug, '')
  let result = false

  if (slug.length > 0) {
    result = {
      props: {
        serverSide: {
          slug,
          data: false,
          error: false
        }
      }
    }

    if (!settings.slugs.disallow.includes(slug.toLocaleLowerCase('en-US'))) {
      const hash = md5(
        `${settings.keys.signature}:${settings.main.parse.hostname}:${slug}`
      ).toString()

      await axios
        .get(settings.api.urls.get({ hash: hash }))
        .then((res) => {
          if (!res.data.error) {
            if (res.data.redirect === 'direct') {
              result = {
                redirect: {
                  permanent: false,
                  destination: res.data.long
                }
              }
            } else {
              result.props.serverSide.data = res.data
            }
          } else {
            result.props.serverSide.error = `api:error.${res.data.error.key.replace(
              /_/g,
              '-'
            )}`
          }
        })
        .catch(() => {
          result.props.serverSide.error = 'unknown-error'
        })
    } else {
      result.props.serverSide.error = 'disallow-slug'
    }
  } else {
    result = {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return result
}

export default SlugPage
