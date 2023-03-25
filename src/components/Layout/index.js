import Header from '../Header'
import Footer from '../Footer'
import Link from 'next/link'
import { ads } from '../../data/ads'

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      {ads.layout.active &&
        (ads.layout.data.footer.desktop.src ||
          ads.layout.data.footer.mobile.src) && (
          <div className="mb-20 grid grid-cols-12">
            <div className="col-start-2 col-span-10 flex justify-center items-center">
              {ads.layout.data.footer.desktop.src && (
                <Link href={ads.layout.data.footer.desktop.href}>
                  <a
                    title={ads.layout.data.footer.desktop.title}
                    rel={ads.layout.data.footer.desktop.rel}
                    className="hidden sm:block"
                  >
                    <img
                      src={ads.layout.data.footer.desktop.src}
                      alt={ads.layout.data.footer.desktop.title}
                      width="100%"
                      height="100%"
                    />
                  </a>
                </Link>
              )}

              {ads.layout.data.footer.mobile.src && (
                <Link href={ads.layout.data.footer.mobile.href}>
                  <a
                    title={ads.layout.data.footer.mobile.title}
                    rel={ads.layout.data.footer.mobile.rel}
                    className="block sm:hidden"
                  >
                    <img
                      src={ads.layout.data.footer.mobile.src}
                      alt={ads.layout.data.footer.mobile.title}
                      width="100%"
                      height="100%"
                    />
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}

      <Footer />
    </>
  )
}

export default Layout
