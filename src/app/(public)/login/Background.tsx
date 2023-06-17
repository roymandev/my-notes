'use client';

import twclsx from '@/utils/twclsx';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Background = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 747px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && !isMobile && (
        <Image
          alt=""
          src="/illustration/abstract-1.png"
          fill
          sizes="80vw"
          quality={100}
        />
      )}
      <div
        className={twclsx(
          'absolute inset-0 bg-nobleBlack-700 opacity-100 transition-opacity delay-1000 ease-in',
          mounted && 'opacity-0',
        )}
      />
    </>
  );
};

export default Background;
