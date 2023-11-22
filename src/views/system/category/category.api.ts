import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/category/rootList',
  save = '/sys/category/add',
  edit = '/sys/category/edit',
  deleteCategory = '/sys/category/delete',
  deleteBatch = '/sys/category/deleteBatch',
  importExcel = '/sys/category/importExcel',
  exportXls = '/sys/category/exportXls',
  loadTreeData = '/sys/category/loadTreeRoot',
  getChildList = '/sys/category/childList',
  getChildListBatch = '/sys/category/getChildListBatch',
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
 * List interface
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * Delete
 */
export const deleteCategory = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteCategory, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * Delete in bulk
 * @param params
 */
export const batchDeleteCategory = (params, handleSuccess) => {
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
 * Save or update
 * @param params
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * Query all tree node data
 * @param params
 */
export const loadTreeData = (params) => defHttp.get({ url: Api.loadTreeData, params });
/**
 * Query the data of a child node
 * @param params
 */
export const getChildList = (params) => defHttp.get({ url: Api.getChildList, params });
/**
 * Query child node data in batches
 * @param params
 */
export const getChildListBatch = (params) => defHttp.get({ url: Api.getChildListBatch, params }, { isTransformResponse: false });
