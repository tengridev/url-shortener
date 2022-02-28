import { settings } from '../../../data/settings'
import getT from 'next-translate/getT'

const MainXSL = () => {}

export async function getServerSideProps(context) {
  const t = await getT(context.locale, 'sitemap')

  let content = `<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="2.0"
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:kml="http://www.opengis.net/kml/2.2"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <xsl:choose>
            <xsl:when test="kml:kml">
              <title>${t('xsl.locations-sitemap')} - ${t(
    'xsl.site-title'
  )}</title>
            </xsl:when>
            <xsl:otherwise>
              <title>${t('xsl.xml-sitemap')} - ${t('xsl.site-title')}</title>
            </xsl:otherwise>
          </xsl:choose>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <style type="text/css">
            body {
              font-size: 14px;
              font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
              margin: 0;
              background-color: #18181b;
              color: #d4d4d8;
            }
            a {
              color: #d4d4d8;
              text-decoration: none;
            }
            h1 {
              font-size: 24px;
              font-family: Verdana,Geneva,sans-serif;
              font-weight: normal;
              margin: 0;
            }
  
            #description {
              padding: 40px;
              border-bottom: 1px solid #27272a;
            }
            #description h1,
            #description p,
            #description a {
              margin: 0;
              font-size: 1.1em;
            }
            #description h1 {
              font-size: 2em;
              margin-bottom: 1em;
            }
            #description p {
              margin-top: 5px;
            }
            #description a {
              border-bottom: 1px dotted;
            }
  
            #content {
              padding: 40px;
              margin: 0 auto;
            }
  
            table {
              border: none;
              border-collapse: collapse;
              font-size: .9em;
              width: 100%;
            }
            th {
              border: 1px solid #27272a;
              text-align: left;
              padding: 15px;
              font-size: 14px;
              cursor: pointer;
            }
            td {
              border: 1px solid #27272a;
              padding: 15px;
            }
            table td a {
              display: block;
            }
            table td a img {
              max-height: 30px;
              margin: 6px 3px;
            }
          </style>
        </head>
        <body>
          <xsl:choose>
            <xsl:when test="kml:kml">
              <div id="description">
                <h1>${t('xsl.kml-title')}</h1>
                <p>${t('xsl.kml-text')}</p>
              </div>
              
              <div id="content">
                <p class="expl">
                  ${t('xsl.kml-count', {
                    count:
                      '<xsl:value-of select="count(kml:kml/kml:Document/kml:Folder/kml:Placemark)"/>'
                  })}
                </p>
                <p class="expl">
                  <a href="${settings.main.URL}/sitemap">&#8592; ${t(
    'xsl.sitemap-index'
  )}</a>
                </p>
                <table id="sitemap" cellpadding="3">
                  <thead>
                    <tr>
                      <th width="25%">${t('xsl.name')}</th>
                      <th width="40%">${t('xsl.address')}</th>
                      <th width="15%">${t('xsl.phone-number')}</th>
                      <th width="10%">${t('xsl.latitude')}</th>
                      <th width="10%">${t('xsl.longitude')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
                    <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                    <xsl:for-each select="kml:kml/kml:Document/kml:Folder/kml:Placemark">
                      <tr>
                        <td>
                          <xsl:variable name="itemURL">
                            <xsl:value-of select="atom:link/@href"/>
                          </xsl:variable>
                          <a href="{$itemURL}">
                            <xsl:value-of select="kml:name"/>
                          </a>
                        </td>
                        <td>
                          <xsl:value-of select="kml:address"/>
                        </td>
                        <td>
                          <xsl:value-of select="kml:phoneNumber"/>
                        </td>
                        <td>
                          <xsl:value-of select="kml:LookAt/kml:latitude"/>
                        </td>
                        <td>
                          <xsl:value-of select="kml:LookAt/kml:longitude"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </xsl:when>
            <xsl:otherwise>
              <div id="description">
                <h1>${t('xsl.xml-title')}</h1>
                <p>${t('xsl.xml-text')}</p>
              </div>

              <div id="content">
                <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
                  <p>
                    ${t('xsl.xml-index-count', {
                      count:
                        '<xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/>'
                    })}
                  </p>
                  <table id="sitemap" cellpadding="3">
                    <thead>
                      <tr>
                        <th width="75%">${t('xsl.sitemap')}</th>
                        <th width="25%">${t('xsl.last-modified')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                        <xsl:variable name="sitemapURL">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:variable>
                        <tr>
                          <td>
                            <a href="{$sitemapURL}"><xsl:value-of select="sitemap:loc"/></a>
                          </td>
                          <td>
                            <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                          </td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </xsl:if>
                <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
                  <p>
                    ${t('xsl.xml-count', {
                      count:
                        '<xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>'
                    })}
                  </p>
                  <p class="expl">
                    <a href="${settings.main.URL}/sitemap">&#8592; ${t(
    'xsl.sitemap-index'
  )}</a>
                  </p>
                  <table id="sitemap" cellpadding="3">
                    <thead>
                      <tr>
                        <th width="80%">${t('xsl.url')}</th>
                        <th width="5%">${t('xsl.images')}</th>
                        <th title="${t(
                          'xsl.last-modification-time'
                        )}" width="15%">${t('xsl.last-modification-time')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
                      <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                      <xsl:for-each select="sitemap:urlset/sitemap:url">
                        <tr>
                          <td>
                            <xsl:variable name="itemURL">
                              <xsl:value-of select="sitemap:loc"/>
                            </xsl:variable>
                            <a href="{$itemURL}">
                              <xsl:value-of select="sitemap:loc"/>
                            </a>
                          </td>
                          <td>
                            <xsl:value-of select="count(image:image)"/>
                          </td>
                          <td>
                            <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                          </td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </xsl:if>
              </div>
            </xsl:otherwise>
          </xsl:choose>
        </body>
      </html>
    </xsl:template>
  </xsl:stylesheet>`

  context.res.setHeader('Content-Type', 'text/xml; charset=UTF-8')
  context.res.write(content)
  context.res.end()

  return {
    props: {}
  }
}

export default MainXSL
