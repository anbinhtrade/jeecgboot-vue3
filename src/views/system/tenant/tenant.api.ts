import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
import { getTenantId } from "/@/utils/auth";

enum Api {
  list = '/sys/tenant/list',
  save = '/sys/tenant/add',
  edit = '/sys/tenant/edit',
  get = '/sys/tenant/queryById',
  delete = '/sys/tenant/delete',
  deleteBatch = '/sys/tenant/deleteBatch',
  getCurrentUserTenants = '/sys/tenant/getCurrentUserTenant',
  invitationUserJoin = '/sys/tenant/invitationUserJoin',
  getTenantUserList = '/sys/tenant/getTenantUserList',
  leaveTenant = '/sys/tenant/leaveTenant',
  packList = '/sys/tenant/packList',
  addPackPermission = '/sys/tenant/addPackPermission',
  editPackPermission = '/sys/tenant/editPackPermission',
  deletePackPermissions = '/sys/tenant/deletePackPermissions',
  recycleBinPageList = '/sys/tenant/recycleBinPageList',
  deleteLogicDeleted = '/sys/tenant/deleteLogicDeleted',
  revertTenantLogic = '/sys/tenant/revertTenantLogic',
  //用户产品包关系api
  queryTenantPackUserList = '/sys/tenant/queryTenantPackUserList',
  deleteTenantPackUser = '/sys/tenant/deleteTenantPackUser',
  addTenantPackUser = '/sys/tenant/addTenantPackUser',
  //获取用户租户列表
  getTenantPageListByUserId = '/sys/tenant/getTenantPageListByUserId',
  
  //Add or edit user tenants
  saveUser = '/sys/user/add',
  editUser = '/sys/user/editTenantUser',
}

/**
 * Query the list of tenants
 * @param params
 */
export const getTenantList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * Save or update the tenant
 * @param params
 */
export const saveOrUpdateTenant = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * Query tenant details
 * @param params
 */
export const getTenantById = (params) => {
  return defHttp.get({ url: Api.get, params });
};

/**
 * Delete the tenant
 * @param params
 */
export const deleteTenant = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * Delete tenants in bulk
 * @param params
 */
export const batchDeleteTenant = (params, handleSuccess) => {
  Modal.confirm({
    title: 'Confirm the deletion',
    content: 'Specifies whether to delete the selected data',
    okText: 'Confirm',
    cancelText: 'Cancel',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * Obtain the department information of the logged-in user
 */
export const getUserTenants = (params?) => defHttp.get({ url: Api.getCurrentUserTenants, params });

/**
 * Invite users to join the tenant
 * @param params
 */
export const invitationUserJoin = (params) => defHttp.put({ url: Api.invitationUserJoin, params }, { joinParamsToUrl: true });

/**
 * Get the data by tenant ID
 * @param params
 */
export const getTenantUserList = (params) => {
  return defHttp.get({ url: Api.getTenantUserList, params });
};

/**
 * The user leaves the tenant
 * @param params
 */
export const leaveTenant = (params, handleSuccess) => {
  Modal.confirm({
    title: 'Please leave',
    content: 'Whether to leave the user',
    okText: 'Confirm',
    cancelText: 'Cancel',
    onOk: () => {
      return defHttp.put({ url: Api.leaveTenant, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * Get a list of packages
 * @param params
 */
export const packList = (params) => {
  return defHttp.get({ url: Api.packList, params });
};

/**
 * Add a menu
 * @param params
 */
export const addPackPermission = (params) => {
  return defHttp.post({ url: Api.addPackPermission, params });
};

/**
 * Add a menu
 * @param params
 */
export const editPackPermission = (params) => {
  return defHttp.put({ url: Api.editPackPermission, params });
};

/**
 * Delete the menu
 * @param params
 */
export const deletePackPermissions = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deletePackPermissions, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * Get a list of tenant recycle bins
 * @param params
 */
export const recycleBinPageList = (params) => {
  return defHttp.get({ url: Api.recycleBinPageList, params });
};

/**
 * The tenant is completely deleted
 * @param params
 */
export const deleteLogicDeleted = (params,handleSuccess) => {
  return defHttp.delete({ url: Api.deleteLogicDeleted, params },{ joinParamsToUrl: true }).then(() => {
    handleSuccess();
  }).catch(()=>{
    handleSuccess();
  });
};

/**
 * Tenant restoration
 * @param params
 */
export const revertTenantLogic = (params,handleSuccess) => {
  return defHttp.put({ url: Api.revertTenantLogic, params },{ joinParamsToUrl: true }).then(() => {
    handleSuccess();
  })
};

/**
 * Get the users below the tenant package
 * @param params
 */
export const queryTenantPackUserList = (params) => {
  return defHttp.get({ url: Api.queryTenantPackUserList, params });
};

/**
 * Remove user-package relationship data
 * @param params
 */
export const deleteTenantPackUser = (params)=>{
  return defHttp.put({ url: Api.deleteTenantPackUser, params });
}

/**
 * Add relational data for users and packages
 * @param params
 */
export const addTenantPackUser = (params)=>{
  return defHttp.post({ url: Api.addTenantPackUser, params });
}

/**
 * Query the list of user tenants
 * @param params
 */
export const getTenantPageListByUserId = (params) => {
  return defHttp.get({ url: Api.getTenantPageListByUserId, params });
};


/**
 * Obtain the name of the current logged-in tenant
 */
export async function getLoginTenantName() {
  let tenantId = getTenantId();
  if(tenantId){
    let result = await getTenantById({ id:tenantId });
    if(result){
      return result.name;
    }
  }
  return "SKY";
}

/**
 * Save or update users
 * @param params
 */
export const saveOrUpdateTenantUser = (params, isUpdate) => {
  let url = isUpdate ? Api.editUser : Api.saveUser;
  return defHttp.post({ url: url, params },{ joinParamsToUrl: true });
};
