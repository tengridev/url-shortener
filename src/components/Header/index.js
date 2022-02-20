import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { links } from '../../data/links'
import useTranslation from 'next-translate/useTranslation'
import ThemeSwitcher from '../ThemeSwitcher'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('links')

  return (
    <div className="header">
      <div className="logo">
        <Link href={`/`}>
          <a className="text-2xl">
            <span className="font-semibold">URL</span>
            <span className="font-extralight">Shortener</span>
          </a>
        </Link>
      </div>

      <div className="nav">
        <div className={`navbar-nav ${open ? 'active' : ''}`}>
          {links.header.map((item, index) => (
            <Link href={item.href} key={index}>
              <a title={t(item.title)} className="navbar-item">
                {t(item.title)}
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
