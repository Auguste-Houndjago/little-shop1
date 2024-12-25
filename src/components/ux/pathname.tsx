import { useRouter } from 'next/router';

const isActive = (pathname: string): boolean => {
  const router = useRouter();
  return router.pathname === pathname;
};

export default isActive;
