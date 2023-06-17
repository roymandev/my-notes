import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import CustomLink from '@/components/CustomLink';
import Input from '@/components/Input';
import { IconLock, IconMail } from '@tabler/icons-react';

const Form = () => {
  return (
    <form className="flex max-w-[500px] flex-col gap-6">
      <Input
        placeholder="Email"
        type="email"
        icon={
          <IconMail className="ml-4 w-5 text-nobleBlack-400" stroke={1.5} />
        }
      />
      <Input
        placeholder="Password"
        type="password"
        icon={
          <IconLock className="ml-4 w-5 text-nobleBlack-400" stroke={1.5} />
        }
      />

      <div className="mt-6 flex items-center justify-between">
        <Checkbox>Remember me</Checkbox>
        <CustomLink href="/reset-password">
          <span className="transition-opacity text-green-blue-500 hover:opacity-80">
            Forgot Password?
          </span>
        </CustomLink>
      </div>

      <Button variant="primary" size="large" className="mt-6">
        Log in
      </Button>
    </form>
  );
};

export default Form;
