'use client';
import twclsx from '@/utils/twclsx';
import * as RxDropdownMenu from '@radix-ui/react-dropdown-menu';

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

const DropdownMenu = ({ trigger, children }: Props) => {
  return (
    <RxDropdownMenu.Root>
      <RxDropdownMenu.Trigger asChild>{trigger}</RxDropdownMenu.Trigger>

      <RxDropdownMenu.Portal>
        <RxDropdownMenu.Content
          align="end"
          className="flex w-60 flex-col rounded-md bg-nobleBlack-600 p-2"
        >
          {children}
        </RxDropdownMenu.Content>
      </RxDropdownMenu.Portal>
    </RxDropdownMenu.Root>
  );
};

const DropdownMenuItem = ({
  className,
  ...rest
}: RxDropdownMenu.DropdownMenuItemProps) => {
  return (
    <RxDropdownMenu.Item
      className={twclsx(
        'relative flex cursor-pointer gap-4 rounded-lg bg-transparent px-4 py-[14px] text-sm outline-none',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg',
        'after:transition-opacity after:[border-top:1px_solid_#FFFFFF14]',
        'after:bg-glass after:opacity-0 hover:after:opacity-100',
        className,
      )}
      {...rest}
    />
  );
};
DropdownMenuItem.displayName = 'DropdownMenuItem';

DropdownMenu.Item = DropdownMenuItem;

export default DropdownMenu;
