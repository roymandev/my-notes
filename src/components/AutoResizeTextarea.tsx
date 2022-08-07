import { twMerge } from 'tailwind-merge';

interface AutoResizeTextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  parentClass?: string;
}

const AutoResizeTextarea = ({
  value,
  className,
  parentClass,
  ...rest
}: AutoResizeTextareaProps) => {
  return (
    <div
      className={twMerge(
        parentClass,
        'relative overflow-hidden whitespace-pre-line break-words',
      )}
    >
      <textarea
        className={twMerge(
          className,
          'absolute inset-0 w-full h-full resize-none overflow-hidden',
        )}
        value={value}
        spellCheck="false"
        {...rest}
      />
      <div className={twMerge(className, 'invisible')} aria-hidden>
        {value}
      </div>
    </div>
  );
};

export default AutoResizeTextarea;
