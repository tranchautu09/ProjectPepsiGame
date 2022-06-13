export interface GetRewardResult {
    success: boolean;
    note?: string;
    reward?: any;
  }
  
  export interface UpdateUserPayload {
    user: any;
  }
  
  export interface UpdateUserResult {
    success: boolean;
    user: any;
    note?: string;
  }
  
  export interface ExchangeComboResult {
    combo_rewards?: any;
    success: boolean;
    note?: string;
  }
  
  export interface GetGiftStoreResult {
    gifts?: any;
    success: boolean;
    note?: string;
  }
  
  export interface SaveGiftDataInput {
    gift: any;
    receiver: any;
    purchaser: any;
  }
  
  export interface SaveGiftDataResult {
    gift: any;
    receiver: any;
    purchaser: any;
    success: boolean;
    note?: string;
  }
  