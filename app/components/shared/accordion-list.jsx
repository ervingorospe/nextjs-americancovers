'use client'

import React, { useState } from "react";
import Image from 'next/image'
import { Collapse } from "react-collapse";
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
import { Motion, MotionVariant } from '@/app/layouts';
 
export function AccordionList({ subCollection }) {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

 
  return (
    <Motion className="mt-6">
      {
        subCollection?.map((item, i) => (
           <MotionVariant
            variants={fadeInFromBottom} 
            key={item.id}
          >
            <div className="py-4 border-b border-b-gray-200">
              <div className="cursor-pointer flex justify-between w-full items-center" onClick={() => handleOpen(i + 1)}>
                <ul className="flex items-center space-x-4">
                  <li className="flex-none h-7 w-7">
                    <Image
                      src={_.get(item, 'fields.image.imageUrl')}
                      alt="Values"
                      height={1000}
                      width={1000}
                      priority={true}
                      className="h-full w-full"
                    />
                  </li>
                  <li>
                    <h3 className="text-xl text-bold">{_.get(item, 'fields.subtitle')}</h3>
                  </li>
                </ul>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`${open === i + 1 ? "rotate-180" : ""} h-5 w-5 transition-transform`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <Collapse isOpened={open === i + 1}>
                <p className="text-lg prose max-w-full mt-4" dangerouslySetInnerHTML={{__html: _.get(item, 'fields.body')}}/>
              </Collapse>
            </div>
          </MotionVariant>
        ))
      }
    </Motion>
  );
}