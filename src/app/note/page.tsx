'use client';
import Button from '@/components/Button';
import DropdownMenu from '@/components/DropdownMenu';
import IconChevronDown from '~/icon/IconChevronDown.svg';
import IconTriangle from '~/icon/IconTriangle.svg';

const page = () => {
  return (
    <main className="fixed inset-0 flex items-stretch p-3">
      <aside className="w-full max-w-xs divide-y divide-nobleBlack-700 rounded-[20px] bg-nobleBlack-800">
        <DropdownMenu
          trigger={
            <Button variant="subtle" className="w-full p-6 text-white">
              <div className="h-12 w-12 rounded-[20px] bg-nobleBlack-600"></div>
              <span>Royman</span>
              <IconChevronDown className="ml-auto" />
            </Button>
          }
        >
          <DropdownMenu.Item onSelect={() => console.log('rest')}>
            <IconTriangle className="scale-90 text-redPower-600" />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu>
        <div></div>
      </aside>
    </main>
  );
};

export default page;
