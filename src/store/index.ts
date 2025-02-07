import { storeGlobal } from './global';
import { transactionStore } from './transaction';
import { userStore } from './user';

export const store = { global: storeGlobal, transaction: transactionStore, user: userStore };
