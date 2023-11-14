import { defHttp } from '/@/utils/http/axios';
import { message } from 'ant-design-vue';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();
const baseUploadUrl = globSetting.uploadUrl;
enum Api {
  positionList = '/sys/position/list',
  userList = '/sys/user/list',
  roleList = '/sys/role/list',
  queryDepartTreeSync = '/sys/sysDepart/queryDepartTreeSync',
  queryTreeList = '/sys/sysDepart/queryTreeList',
  loadTreeData = '/sys/category/loadTreeData',
  loadDictItem = '/sys/category/loadDictItem/',
  getDictItems = '/sys/dict/getDictItems/',
  getTableList = '/sys/user/queryUserComponentData',
  getCategoryData = '/sys/category/loadAllData',
}

/**
 * Upload the parent path
 */
export const uploadUrl = `${baseUploadUrl}/sys/common/upload`;

/**
 * Job Title
 * @param params
 */
export const getPositionList = (params) => {
  return defHttp.get({ url: Api.positionList, params });
};

/**
 * List of users
 * @param params
 */
export const getUserList = (params) => {
  return defHttp.get({ url: Api.userList, params });
};

/**
 * List of roles
 * @param params
 */
export const getRoleList = (params) => {
  return defHttp.get({ url: Api.roleList, params });
};

/**
 * Get the list of department trees asynchronously
 */
export const queryDepartTreeSync = (params?) => {
  return defHttp.get({ url: Api.queryDepartTreeSync, params });
};
/**
 * Get a list of department trees
 */
export const queryTreeList = (params?) => {
  return defHttp.get({ url: Api.queryTreeList, params });
};

/**
 * Classification Dictionary Tree Control Load node
 */
export const loadTreeData = (params?) => {
  return defHttp.get({ url: Api.loadTreeData, params });
};

/**
 * Load the dictionary text based on the dictionary code
 */
export const loadDictItem = (params?) => {
  return defHttp.get({ url: Api.loadDictItem, params });
};

/**
 * Load the dictionary text based on the dictionary code
 */
export const getDictItems = (dictCode) => {
  return defHttp.get({ url: Api.getDictItems + dictCode }, { joinTime: false });
};
/**
 * The department user modal picklist loads the list
 */
export const getTableList = (params) => {
  return defHttp.get({ url: Api.getTableList, params });
};
/**
 * Load all categorical dictionary data
 */
export const loadCategoryData = (params) => {
  return defHttp.get({ url: Api.getCategoryData, params });
};
/**
 * File upload
 */
export const uploadFile = (params, success) => {
  return defHttp.uploadFile({ url: uploadUrl }, params, { success });
};
/**
 * Download the file
 * @param url File path
 * @param fileName FILENAME
 * @param parameter
 * @returns {*}
 */
export const downloadFile = (url, fileName?, parameter?) => {
  return getFileblob(url, parameter).then((data) => {
    if (!data || data.size === 0) {
      message.warning('File download failed');
      return;
    }
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(new Blob([data]), fileName);
    } else {
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    }
  });
};

/**
 * Download the file for excel export
 * @param url
 * @param parameter
 * @returns {*}
 */
export const getFileblob = (url, parameter) => {
  return defHttp.get(
    {
      url: url,
      params: parameter,
      responseType: 'blob',
    },
    { isTransformResponse: false }
  );
};

/**
 * 【For commenting function] Custom file upload-method
 */
export const uploadMyFile = (url, data) => {
  return defHttp.uploadMyFile(url, data);
};
