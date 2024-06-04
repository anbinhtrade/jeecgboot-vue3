import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/etf/tbletf/list',
  save='/etf/tbletf/add',
  edit='/etf/tbletf/edit',
  deleteOne = '/etf/tbletf/delete',
  deleteBatch = '/etf/tbletf/deleteBatch',
  importExcel = '/etf/tbletf/importExcel',
  exportXls = '/etf/tbletf/exportXls',
}

/**
 * Export API
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
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * Delete a single
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
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
  createConfirm({
    iconType: 'warning',
    title: 'Confirm deleting',
    content: 'Are you sure want to delete the selected data',
    okText: 'Confirm',
    cancelText: 'Cancel',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}

/**
 * Save or update
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
