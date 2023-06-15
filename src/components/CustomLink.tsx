import twclsx from '@/utils/twclsx';
import Link, { LinkProps } from 'next/link';

type Props = {
  variant?: 'sublte';
  className?: string;
  children?: React.ReactNode;
} & LinkProps;

const CustomLink = ({ variant, className, ...rest }: Props) => {
  return (
    <Link
      className={twclsx(
        variant === 'sublte' &&
          'rounded-xl outline-none transition-[colors_shadow] hover:bg-nobleBlack-600 focus-visible:bg-nobleBlack-600 focus-visible:shadow-[0_0_0_4px_#84DCF53D]',
        className,
      )}
      {...rest}
    />
  );
};

export default CustomLink;
