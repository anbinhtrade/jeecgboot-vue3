import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
enum Api {
  list = '/sys/dict/list',
  save = '/sys/dict/add',
  edit = '/sys/dict/edit',
  duplicateCheck = '/sys/duplicate/check',
  deleteDict = '/sys/dict/delete',
  deleteBatch = '/sys/dict/deleteBatch',
  importExcel = '/sys/dict/importExcel',
  exportXls = '/sys/dict/exportXls',
  recycleBinList = '/sys/dict/deleteList',
  putRecycleBin = '/sys/dict/back',
  deleteRecycleBin = '/sys/dict/deletePhysic',
  itemList = '/sys/dictItem/list',
  deleteItem = '/sys/dictItem/delete',
  itemSave = '/sys/dictItem/add',
  itemEdit = '/sys/dictItem/edit',
  dictItemCheck = '/sys/dictItem/dictItemCheck',
  refreshCache = '/sys/dict/refleshCache',
  queryAllDictItems = '/sys/dict/queryAllDictItems',
}
/**
 * Export API
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * Import APIs
 * @param params
 */
export const getImportUrl = Api.importExcel;
/**
 * Dictionary list interface
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * Delete the dictionary
 */
export const deleteDict = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteDict, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * Delete dictionaries in bulk
 * @param params
 */
export const batchDeleteDict = (params, handleSuccess) => {
  Modal.confirm({
    title: 'Confirm the deletion',
    content: 'Specifies whether to delete the selected data',
    okText: 'CONFIRM',
    cancelText: 'CANCEL',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * Save or update the dictionary
 * @param params
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * Unique checksum
 * @param params
 */
export const duplicateCheck = (params) => defHttp.get({ url: Api.duplicateCheck, params }, { isTransformResponse: false });
/**
 * Dictionary recycle bin list
 * @param params
 */
export const getRecycleBinList = (params) => defHttp.get({ url: Api.recycleBinList, params });
/**
 * Recycle Bin Restore
 * @param params
 */
export const putRecycleBin = (id, handleSuccess) => {
  return defHttp.put({ url: Api.putRecycleBin + `/${id}` }).then(() => {
    handleSuccess();
  });
};
/**
 * Recycle bin deletion
 * @param params
 */
export const deleteRecycleBin = (id, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteRecycleBin + `/${id}` }).then(() => {
    handleSuccess();
  });
};
/**
 * Dictionary configuration list
 * @param params
 */
export const itemList = (params) => defHttp.get({ url: Api.itemList, params });
/**
 * Dictionary configuration deletion
 * @param params
 */
export const deleteItem = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteItem, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * Save or update the dictionary configuration
 * @param params
 */
export const saveOrUpdateDictItem = (params, isUpdate) => {
  let url = isUpdate ? Api.itemEdit : Api.itemSave;
  return defHttp.post({ url: url, params });
};
/**
 * Verify the dictionary data value
 * @param params
 */
export const dictItemCheck = (params) => defHttp.get({ url: Api.dictItemCheck, params }, { isTransformResponse: false });
/**
 * Refresh the dictionary
 * @param params
 */
export const refreshCache = () => defHttp.get({ url: Api.refreshCache }, { isTransformResponse: false });
/**
 * Get all dictionary items
 * @param params
 */
export const queryAllDictItems = () => defHttp.get({ url: Api.queryAllDictItems }, { isTransformResponse: false });
