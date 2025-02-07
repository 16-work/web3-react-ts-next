import { http } from '@/api/axios';
import { DTOVerify, RDVerify } from './types';

const user = {
  verify: (dto: DTOVerify)=> {
    return http.post<RDVerify>('/user/verify', dto);
  },
};

export default user;
