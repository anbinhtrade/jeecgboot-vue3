import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fillRule/list',
  test = '/sys/fillRule/testFillRule',
  save = '/sys/fillRule/add',
  edit = '/sys/fillRule/edit',
  delete = '/sys/fillRule/delete',
  deleteBatch = '/sys/fillRule/deleteBatch',
  exportXls = '/sys/fillRule/exportXls',
  importExcel = '/sys/fillRule/importExcel',
}

/**
 * Export addresses
 */
export const exportUrl = Api.exportXls;
/**
 * Import addresses
 */
export const importUrl = Api.importExcel;

/**
 * List queries
 * @param params
 */
export const getFillRuleList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * DELETE
 * @param params
 * @param handleSuccess
 */
export const deleteFillRule = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * Delete in bulk
 * @param params
 */
export const batchDeleteFillRule = (params, handleSuccess) => {
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
 * Rule functional testing
 * @param params
 */
export const handleTest = (params) => {
  return defHttp.get({ url: Api.test, params }, { isTransformResponse: false });
};

/**
 * SAVE
 * @param params
 */
export const saveFillRule = (params) => {
  return defHttp.post({ url: Api.save, params });
};

/**
 * UPDATE
 * @param params
 */
export const updateFillRule = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
