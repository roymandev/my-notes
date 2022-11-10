import Loading, { LoadingProps } from '@/components/Fallback/Loading';

const LoadingFullscreen = (props: LoadingProps) => (
  <div className="fixed inset-0 flex">
    <Loading {...props} />
  </div>
);

export default LoadingFullscreen;
