import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/sys/tableWhiteList/list',
  save = '/sys/tableWhiteList/add',
  edit = '/sys/tableWhiteList/edit',
  deleteOne = '/sys/tableWhiteList/delete',
  deleteBatch = '/sys/tableWhiteList/deleteBatch',
  importExcel = '/sys/tableWhiteList/importExcel',
  exportXls = '/sys/tableWhiteList/exportXls',
}

/**
 * Export api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * Import APIs
 */
export const getImportUrl = Api.importExcel;
/**
 * List interface
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * Delete a single
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * Delete in bulk
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: 'Confirm the deletion',
    content: 'Specifies whether to delete the selected data',
    okText: 'Confirm',
    cancelText: 'Cancel',
    onOk: () => {
      return defHttp.delete({
        url: Api.deleteBatch,
        data: params
      }, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * Save or update
 * @param params
 * @param isUpdate Whether it is an update data
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
