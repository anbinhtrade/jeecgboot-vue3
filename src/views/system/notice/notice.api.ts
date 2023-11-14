import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/annountCement/list',
  save = '/sys/annountCement/add',
  edit = '/sys/annountCement/edit',
  delete = '/sys/annountCement/delete',
  deleteBatch = '/sys/annountCement/deleteBatch',
  exportXls = '/sys/annountCement/exportXls',
  importExcel = '/sys/annountCement/importExcel',
  releaseData = '/sys/annountCement/doReleaseData',
  reovkeData = '/sys/annountCement/doReovkeData',
}

/**
 * Export URLs
 */
export const getExportUrl = Api.exportXls;
/**
 * Import URLs
 */
export const getImportUrl = Api.importExcel;
/**
 * Query the list of tenants
 * @param params
 */
export const getList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * Save or update the announcement
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * Delete the announcement
 * @param params
 */
export const deleteNotice = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * Bulk message announcements
 * @param params
 */
export const batchDeleteNotice = (params) => defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true });

/**
 * PUBLISH
 * @param id
 */
export const doReleaseData = (params) => defHttp.get({ url: Api.releaseData, params });
/**
 * QUASH
 * @param id
 */
export const doReovkeData = (params) => defHttp.get({ url: Api.reovkeData, params });
