'use client'

import React from 'react'
import Link from 'next/link'
import { formatPhone } from '@/function/formatting'

export function Telephones({ data, location, styles }) {

  return (
    <div>
      <p className={styles.title}>{data.name}</p>
      {
        _.get(location, 'fields.telephone') && (
          <p className={styles.contentText}><b>Telephone:</b> &nbsp;
            <Link href={`tel:${() => formatPhone(_.get(location, 'fields.telephone'))}`} className={styles.link}>{_.get(location, 'fields.telephone')}</Link>
          </p>
        )
      }
      
      {
        _.get(location, 'fields.tollFree') && (
          <p className={styles.contentText}><b>Toll Free:</b> &nbsp;
            <Link href={`tel:${() => formatPhone(_.get(location, 'fields.tollFee'))}`} className={styles.link}>{_.get(location, 'fields.tollFree')}</Link>
          </p>
        )
      }

      {
        _.get(location, 'fields.fax') && (
          <p className={styles.contentText}><b>Fax:</b> &nbsp;
            <Link href={`tel:${() => formatPhone(_.get(location, 'fields.fax'))}`} className={styles.link}>{_.get(location, 'fields.fax')}</Link>
          </p>
        )
      }
    </div>
  )
}