import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { links } from '../../data/links'
import useTranslation from 'next-translate/useTranslation'
import ThemeSwitcher from '../ThemeSwitcher'
import Link from 'next/link'

const Header = () => {
  const { t } = useTranslation('links')

  const [open, setOpen] = useState(false)

  const logoText = t('all:logo-text').split(' ')

  return (
    <div className="header">
      <div className="logo">
        <Link href={`/`}>
          <a className="text-2xl">
            {logoText.map((item, index) => (
              <span
                className={index === 0 ? 'font-semibold' : 'font-extralight'}
                key={index}
              >
                {item}
              </span>
            ))}
          </a>
        </Link>
      </div>

      <div className="nav">
        <div className={`navbar-nav ${open ? 'active' : ''}`}>
          {links.navigation.header.map((item, index) => (
            <Link href={item.href} key={index}>
              <a
                title={t(`navigation.header.${item.title}`)}
                className="navbar-item"
                onClick={() => setOpen(!open)}
              >
                {t(`navigation.header.${item.title}`)}
              </a>
            </Link>
          ))}

          <ThemeSwitcher />
        </div>

        <div className="nav-action">
          <button
            type="button"
            className="nav-menu"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
