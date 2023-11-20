import { defHttp } from "/@/utils/http/axios";

enum Api {
  userEdit='/sys/user/login/setting/userEdit',
  getUserData='/sys/user/login/setting/getUserData',
  queryNameByCodes='/sys/position/queryByCodes',
  updateMobile='/sys/user/updateMobile',
  updateUserPassword='/sys/user/updatePassword',
  getTenantListByUserId = '/sys/tenant/getTenantListByUserId',
  cancelApplyTenant = '/sys/tenant/cancelApplyTenant',
  exitUserTenant = '/sys/tenant/exitUserTenant',
  changeOwenUserTenant = '/sys/tenant/changeOwenUserTenant',
  getThirdAccountByUserId = '/sys/thirdApp/getThirdAccountByUserId',
  bindThirdAppAccount = '/sys/thirdApp/bindThirdAppAccount',
  deleteThirdAccount = '/sys/thirdApp/deleteThirdAccount',
  agreeOrRefuseJoinTenant = '/sys/tenant/agreeOrRefuseJoinTenant',
}

/**
 * User editing
 * @param params
 */
export const userEdit = (params) => {
  return defHttp.post({ url: Api.userEdit, params },{ isTransformResponse:false });
}

/**
 * Obtain user information
 * @param params
 */
export const getUserData = () => {
  return defHttp.get({ url: Api.getUserData },{ isTransformResponse:false });
}

/**
 * Get information about multiple job titles
 * @param params
 */
export const queryNameByCodes = (params) => {
  return defHttp.get({ url: Api.queryNameByCodes, params },{isTransformResponse:false});
}

/**
 * Modify the mobile phone number
 * @param params
 */
export const updateMobile = (params) => {
  return defHttp.put({ url: Api.updateMobile, params },{isTransformResponse:false});
}

/**
 * Change your password
 * @param params
 */
export const updateUserPassword = (params) => {
  return defHttp.put({ url: Api.updateUserPassword, params },{isTransformResponse:false});
}

/**
 * Obtain the tenant list by user ID
 * @param params
 */
export const getTenantListByUserId = (params) => {
  return defHttp.get({ url: Api.getTenantListByUserId, params }, { isTransformResponse: false });
};

/**
 * Cancel your application
 * @param params
 */
export const cancelApplyTenant = (params) => {
  return defHttp.put({ url: Api.cancelApplyTenant, data: params }, { joinParamsToUrl: true, isTransformResponse: false });
};

/**
 * The user exits the tenant
 * @param params
 */
export const exitUserTenant = (params)=>{
  return defHttp.delete({ url: Api.exitUserTenant, params },{ isTransformResponse: false, joinParamsToUrl: true });
}

/**
 * Change the tenant owner
 * @param params
 */
export const changeOwenUserTenant = (params)=>{
  return defHttp.post({ url: Api.changeOwenUserTenant, params },{ isTransformResponse: false, joinParamsToUrl: true });
}

/**
 * Obtain account number third-party information through third-party type
 * @param params
 */
export const getThirdAccountByUserId = (params) => {
  return defHttp.get({ url: Api.getThirdAccountByUserId, params }, { isTransformResponse: false });
};

/**
 * Bind the account based on the third-party UUID
 * @param params
 */
export const bindThirdAppAccount = (params) => {
  return defHttp.post({ url: Api.bindThirdAppAccount, params }, { isTransformResponse: false, joinParamsToUrl: true });
};

/**
 * Bind the account based on the third-party UUID
 * @param params
 */
export const deleteThirdAccount = (params) => {
  return defHttp.delete({ url: Api.deleteThirdAccount, params }, { isTransformResponse:false, joinParamsToUrl: true });
};

/**
 * Agree and refuse to join tenants
 * @param params
 */
export const agreeOrRefuseJoinTenant = (params) => {
  return defHttp.put({ url: Api.agreeOrRefuseJoinTenant, params },{ joinParamsToUrl: true });
};
