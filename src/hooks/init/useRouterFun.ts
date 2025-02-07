import { Params } from 'next/dist/server/request/params';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export const router = {} as {
  pathname: string;
  push: AppRouterInstance['push'];
  params: Params;
  query: ReadonlyURLSearchParams;
};

/** Hook */
export const useRouterFun = () => {
  const params = useParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  router.push = push;
  router.pathname = pathname;
  router.params = params;
  router.query = query;
};
