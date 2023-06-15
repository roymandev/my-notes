import twclsx from '@/utils/twclsx';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Separator = ({ className, children }: Props) => {
  const lineClass = twclsx('my-6 h-px flex-1 bg-nobleBlack-500', className);

  return (
    <div className={twclsx('flex items-center gap-4 text-nobleBlack-400')}>
      <div className={lineClass} />
      {children && (
        <>
          <span className="mb-px">{children}</span>
          <div className={lineClass} />
        </>
      )}
    </div>
  );
};

export default Separator;
