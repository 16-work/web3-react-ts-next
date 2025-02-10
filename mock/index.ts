import common from './common.mock';
import token from './token.mock';

const mockAPI: Record<string, any> = {
  ...common,
  ...token,
};

export const getMockData = (url: string) => {
  return mockAPI[url];
};
