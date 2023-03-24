import { settings } from '../../data/settings'
import Statistics from '../Statistics'
import Alert from '../Alert'
import axios from 'axios'
import useSWR from 'swr'
import useTranslation from 'next-translate/useTranslation'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Footer = () => {
  const { t } = useTranslation('footer')

  const { data, error } = useSWR(
    settings.api.statistics.all(),
    fetcher,
    settings.swr.statistics
  )

  return (
    <>
      <div className="py-4 grid grid-cols-12 border-t border-neutral-200 bg-neutral-100 dark:border-zinc-800 dark:bg-zinc-900">
        {!error ? (
          !data?.error ? (
            <Statistics
              title={{ footer: true }}
              data={data ? data : false}
              loading={data ? false : 'all'}
            />
          ) : (
            <Alert
              title={t('error')}
              text={t(`api:error.${data.error.key.replaceAll('_', '-')}`)}
              className="alert-danger"
            />
          )
        ) : (
          <Alert
            title={t('error')}
            text={t('unknown-error')}
            className="alert-danger"
          />
        )}
      </div>
      <div className="grid grid-cols-12 py-4 border-t border-neutral-200 bg-neutral-100 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="col-start-2 col-span-10 gap-4 grid grid-cols-12 text-sm font-extralight tracking-wide">
          <div className="col-span-12 md:col-span-6 flex justify-center md:justify-start items-center">
            {t(`left`)}
          </div>

          <div className="col-span-12 md:col-span-6 flex justify-center md:justify-end items-center">
            {t(`right`)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
