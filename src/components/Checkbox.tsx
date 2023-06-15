import * as RxCheckbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';

import { IconCheck } from '@tabler/icons-react';
import { useId } from 'react';

type Props = {
  children?: React.ReactNode;
} & RxCheckbox.CheckboxProps;

const Checkbox = ({ children, ...rest }: Props) => {
  const id = useId();

  return (
    <div className="flex items-center gap-4">
      <RxCheckbox.Root
        id={'checkbox' + id}
        className="group relative h-6 w-6 overflow-hidden rounded bg-nobleBlack-600 outline-none transition-shadow focus:shadow-[0_0_0_4px_#84DCF53D]"
        {...rest}
      >
        <div className="absolute inset-0 grid place-content-center rounded bg-[linear-gradient(45deg,#4D62E5_0%,#87DDEE_45.31%,#B6F09C_100%)] opacity-0 transition-opacity group-aria-checked:opacity-100">
          <IconCheck className="h-3 w-3 text-black" stroke={4} />
        </div>

        {/* Border */}
        <div className="pointer-events-none absolute inset-0 rounded border border-nobleBlack-500 transition-colors group-focus:border-transparent group-focus:bg-[linear-gradient(45deg,#82DBF7_0%,#B6F09C_100%)] group-focus:[-webkit-mask-composite:xor] group-focus:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] group-focus:[mask-composite:exclude] group-aria-checked:border-0" />
      </RxCheckbox.Root>
      {children && (
        <Label.Root className="text-nobleBlack-200" htmlFor={'checkbox' + id}>
          {children}
        </Label.Root>
      )}
    </div>
  );
};

export default Checkbox;
