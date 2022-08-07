import { twMerge } from 'tailwind-merge';

export interface BaseButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof variantClass;
}

const variantClass = {
  default: 'hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow',
  primary: 'bg-slate-700 hover:bg-slate-600 shadow',
};

function BaseButton({
  className,
  variant = 'default',
  ...rest
}: BaseButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(
        'rounded text-slate-400 transition-colors outline-none',
        variantClass[variant],
        className,
      )}
      {...rest}
    />
  );
}

export default BaseButton;
