import { http } from '../axios';
import { RDList } from '../types';
import { DTOFetchList, TokenInfo } from './types';

const token = {
  fetchList: async (dto: DTOFetchList) => {
    const res = await http.post<RDList<TokenInfo>>('/token/list', dto);
    return res;
  },
};

export default token;
