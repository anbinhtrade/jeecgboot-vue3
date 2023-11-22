import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/position/list',
  save = '/sys/position/add',
  edit = '/sys/position/edit',
  get = '/sys/position/queryById',
  delete = '/sys/position/delete',
  importExcel = '/sys/position/importExcel',
  exportXls = '/sys/position/exportXls',
  deleteBatch = '/sys/position/deleteBatch',
}
/**
 * Export API
 */
export const getExportUrl = Api.exportXls;

export const getImportUrl = Api.importExcel;
/**
 * Query the list
 * @param params
 */
export const getPositionList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * Save or update
 * @param params
 */
export const saveOrUpdatePosition = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * Find out more
 * @param params
 */
export const getPositionById = (params) => {
  return defHttp.get({ url: Api.get, params });
};

/**
 * Delete a single entry
 * @param params
 */
export const deletePosition = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * Delete in bulk
 * @param params
 */
export const batchDeletePosition = (params, handleSuccess) => {
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
 * Custom uploads
 * @param customUpload
 */
export const customUpload = (params) => {
  defHttp.uploadFile({ url: Api.importExcel }, params);
};
