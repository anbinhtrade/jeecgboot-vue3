import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/funddetails/fundDetails/list',
  save='/funddetails/fundDetails/add',
  edit='/funddetails/fundDetails/edit',
  deleteOne = '/funddetails/fundDetails/delete',
  deleteBatch = '/funddetails/fundDetails/deleteBatch',
  importExcel = '/funddetails/fundDetails/importExcel',
  exportXls = '/funddetails/fundDetails/exportXls',
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
