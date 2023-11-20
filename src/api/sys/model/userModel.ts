/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface ThirdLoginParams {
  token: string;
  thirdType: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
  userInfo?: any
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // User ID
  userId: string | number;
  // USERNAME
  username: string;
  // Real name
  realname: string;
  // AVATAR
  avatar: string;
  // INTRODUCE
  desc?: string;
  // User Information
  userInfo?: any;
  // Cache dictionary entries
  sysAllDictItems?: any;
}

/**
 * @description: Get user information return value
 */
export interface GetResultModel {
  code: number;
  message: string;
  result: object;
  success: Boolean;
}
