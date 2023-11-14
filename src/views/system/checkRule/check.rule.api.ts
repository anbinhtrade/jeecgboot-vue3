import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/checkRule/list',
  delete = '/sys/checkRule/delete',
  deleteBatch = '/sys/checkRule/deleteBatch',
  exportXls = 'sys/checkRule/exportXls',
  importXls = 'sys/checkRule/importExcel',
  checkByCode = '/sys/checkRule/checkByCode',
  save = '/sys/checkRule/add',
  edit = '/sys/checkRule/edit',
}

/**
 * Export addresses
 */
export const exportUrl = Api.exportXls;
/**
 * Import addresses
 */
export const importUrl = Api.importXls;

/**
 * List queries
 * @param params
 */
export const getCheckRuleList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * DELETE
 * @param params
 * @param handleSuccess
 */
export const deleteCheckRule = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * Delete in bulk
 * @param params
 */
export const batchDeleteCheckRule = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
* According to the code check rule, check whether the incoming value is valid * @param ruleCode
 * @param value
 */
export const validateCheckRule = (ruleCode, value) => {
  value = encodeURIComponent(value);
  let params = { ruleCode, value };
  return defHttp.get({ url: Api.checkByCode, params }, { isTransformResponse: false });
};

/**
 * SAVE
 * @param params
 */
export const saveCheckRule = (params) => {
  return defHttp.post({ url: Api.save, params });
};

/**
 * UPDATE
 * @param params
 */
export const updateCheckRule = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
