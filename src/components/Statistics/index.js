import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const Statistics = ({ title, data, loading }) => {
  const { t } = useTranslation('statistics')

  if (loading) {
    data = {
      urls:
        loading === 'urls' || loading === 'all'
          ? {
              today: '0',
              yesterday: '0',
              lastWeek: '0',
              lastMonth: '0',
              lastYear: '0',
              all: '0'
            }
          : false,
      visits:
        loading === 'visits' || loading === 'all'
          ? {
              today: '0',
              yesterday: '0',
              lastWeek: '0',
              lastMonth: '0',
              lastYear: '0',
              all: '0'
            }
          : false
    }
  }

  const readableNumber = (value) => {
    const length = value.toString().length
    let result = false
    let text = false

    switch (length) {
      case 6:
      case 4:
        result = (value / 1000).toString().slice(0, 3).replace('.', ',')
        text = 'B'
        break

      case 5:
        result = (value / 1000).toString().slice(0, 4).replace('.', ',')
        text = 'B'
        break

      case 9:
      case 7:
        result = (value / 1000000).toString().slice(0, 3).replace('.', ',')
        text = 'Mn'
        break

      case 8:
        result = (value / 1000000).toString().slice(0, 4).replace('.', ',')
        text = 'Mn'
        break

      case 12:
      case 10:
        result = (value / 1000000000).toString().slice(0, 3).replace('.', ',')
        text = 'Mr'
        break

      case 11:
        result = (value / 1000000000).toString().slice(0, 4).replace('.', ',')
        text = 'Mr'
        break

      case 15:
      case 13:
        result = (value / 1000000000000)
          .toString()
          .slice(0, 3)
          .replace('.', ',')
        text = 'Tn'
        break

      case 14:
        result = (value / 1000000000000)
          .toString()
          .slice(0, 4)
          .replace('.', ',')
        text = 'Tn'
        break

      default:
        result = value
        break
    }

    return {
      result,
      text
    }
  }

  return (
    <React.Fragment>
      {title.footer ? (
        <div className="col-start-2 col-span-10 grid grid-cols-12 gap-5">
          <div
            className={`${
              loading ? 'animate-pulse' : ''
            } col-span-12 sm:col-span-6 lg:col-span-3 flex justify-between items-center p-4 rounded border border-neutral-200 bg-neutral-200/25 dark:border-zinc-800 dark:bg-zinc-800/25`}
          >
            <span className="text-neutral-500 dark:text-zinc-500 w-20 h-20 flex justify-center items-center text-xs border rounded-full border-neutral-200 dark:border-zinc-700/75">
              {t('footer:today')}
            </span>
            <span className="text-2xl font-semibold">
              {readableNumber(data.urls.today).result}
              {readableNumber(data.urls.today).text && (
                <span className="text-base">
                  {readableNumber(data.urls.today).text}
                </span>
              )}
            </span>
          </div>

          <div
            className={`${
              loading ? 'animate-pulse' : ''
            } col-span-12 sm:col-span-6 lg:col-span-3 flex justify-between items-center p-4 rounded border border-neutral-200 bg-neutral-200/25 dark:border-zinc-800 dark:bg-zinc-800/25`}
          >
            <span className="text-neutral-500 dark:text-zinc-500 w-20 h-20 flex justify-center items-center text-xs border rounded-full border-neutral-200 dark:border-zinc-700/75">
              {t('footer:yesterday')}
            </span>
            <span className="text-2xl font-semibold">
              {readableNumber(data.urls.yesterday).result}
              {readableNumber(data.urls.yesterday).text && (
                <span className="text-base">
                  {readableNumber(data.urls.yesterday).text}
                </span>
              )}
            </span>
          </div>

          <div
            className={`${
              loading ? 'animate-pulse' : ''
            } col-span-12 sm:col-span-6 lg:col-span-3 flex justify-between items-center p-4 rounded border border-neutral-200 bg-neutral-200/25 dark:border-zinc-800 dark:bg-zinc-800/25`}
          >
            <span className="text-neutral-500 dark:text-zinc-500 w-20 h-20 flex justify-center items-center text-xs border rounded-full border-neutral-200 dark:border-zinc-700/75">
              {t('footer:last-week')}
            </span>
            <span className="text-2xl font-semibold">
              {readableNumber(data.urls.lastWeek).result}
              {readableNumber(data.urls.lastWeek).text && (
                <span className="text-base">
                  {readableNumber(data.urls.lastWeek).text}
                </span>
              )}
            </span>
          </div>

          <div
            className={`${
              loading ? 'animate-pulse' : ''
            } col-span-12 sm:col-span-6 lg:col-span-3 flex justify-between items-center p-4 rounded border border-neutral-200 bg-neutral-200/25 dark:border-zinc-800 dark:bg-zinc-800/25`}
          >
            <span className="text-neutral-500 dark:text-zinc-500 w-20 h-20 flex justify-center items-center text-xs border rounded-full border-neutral-200 dark:border-zinc-700/75">
              {t('footer:last-month')}
            </span>
            <span className="text-2xl font-semibold">
              {readableNumber(data.urls.lastMonth).result}
              {readableNumber(data.urls.lastMonth).text && (
                <span className="text-base">
                  {readableNumber(data.urls.lastMonth).text}
                </span>
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className="statistics">
          {data.urls && (
            <>
              {title.urls && <h5 className="statistics-title">{title.urls}</h5>}
              <div
                className={`statistics-card ${loading ? 'animate-pulse' : ''}`}
              >
                <div className="statistics-item">
                  <div className="statistics-icon">{t('today')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.urls.today).result}
                    {readableNumber(data.urls.today).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.urls.today).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('yesterday')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.urls.yesterday).result}
                    {readableNumber(data.urls.yesterday).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.urls.yesterday).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('last-week')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.urls.lastWeek).result}
                    {readableNumber(data.urls.lastWeek).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.urls.lastWeek).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('last-month')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.urls.lastMonth).result}
                    {readableNumber(data.urls.lastMonth).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.urls.lastMonth).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('last-year')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.urls.lastYear).result}
                    {readableNumber(data.urls.lastYear).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.urls.lastYear).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('all')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.urls.all).result}
                    {readableNumber(data.urls.all).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.urls.all).text}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {data.visits && (
            <>
              {title.visits && (
                <h5 className="statistics-title">{title.visits}</h5>
              )}
              <div
                className={`statistics-card ${loading ? 'animate-pulse' : ''}`}
              >
                <div className="statistics-item">
                  <div className="statistics-icon">{t('today')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.visits.today).result}
                    {readableNumber(data.visits.today).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.visits.today).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('yesterday')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.visits.yesterday).result}
                    {readableNumber(data.visits.yesterday).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.visits.yesterday).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('last-week')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.visits.lastWeek).result}
                    {readableNumber(data.visits.lastWeek).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.visits.lastWeek).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('last-month')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.visits.lastMonth).result}
                    {readableNumber(data.visits.lastMonth).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.visits.lastMonth).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('last-year')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.visits.lastYear).result}
                    {readableNumber(data.visits.lastYear).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.visits.lastYear).text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="statistics-item">
                  <div className="statistics-icon">{t('all')}</div>
                  <div className="statistics-text">
                    {readableNumber(data.visits.all).result}
                    {readableNumber(data.visits.all).text && (
                      <span className="statistics-text-small">
                        {readableNumber(data.visits.all).text}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default Statistics
