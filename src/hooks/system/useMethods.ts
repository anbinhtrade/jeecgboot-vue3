import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { useGlobSetting } from '/@/hooks/setting';

const { createMessage, createWarningModal } = useMessage();
const glob = useGlobSetting();

/**
 * 导出文件xlsx的mime-type
 */
export const XLSX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
/**
 * 导出文件xlsx的文件后缀
 */
export const XLSX_FILE_SUFFIX = '.xlsx';

export function useMethods() {
  /**
   * 导出xls
   * @param name
   * @param url
   */
  async function exportXls(name, url, params, isXlsx = false) {
    const data = await defHttp.get({ url: url, params: params, responseType: 'blob' }, { isTransformResponse: false });
    if (!data) {
      createMessage.warning('File download failed');
      return;
    }
    if (!name || typeof name != 'string') {
      name = 'Export file';
    }
    let blobOptions = { type: 'application/vnd.ms-excel' };
    let fileSuffix = '.xls';
    if (isXlsx === true) {
      blobOptions['type'] = XLSX_MIME_TYPE;
      fileSuffix = XLSX_FILE_SUFFIX;
    }
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(new Blob([data], blobOptions), name + fileSuffix);
    } else {
      let url = window.URL.createObjectURL(new Blob([data], blobOptions));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', name + fileSuffix);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    }
  }

  /**
   * 导入xls
   * @param data 导入的数据
   * @param url
   * @param success 成功后的回调
   */
  async function importXls(data, url, success) {
    const isReturn = (fileInfo) => {
      try {
        if (fileInfo.code === 201) {
          let {
            message,
            result: { msg, fileUrl, fileName },
          } = fileInfo;
          let href = glob.uploadUrl + fileUrl;
          createWarningModal({
            title: message,
            centered: false,
            content: `<div>
                                <span>${msg}</span><br/> 
                                <span>For specific details please<a href = ${href} download = ${fileName}> click to download </a> </span> 
                              </div>`,
          });
          //update-begin---author:wangshuai ---date:20221121  for：[VUEN-2827]导入无权限，提示图标错误------------
        } else if (fileInfo.code === 500 || fileInfo.code === 510) {
          createMessage.error(fileInfo.message || `${data.file.name} Import failed`);
          //update-end---author:wangshuai ---date:20221121  for：[VUEN-2827]导入无权限，提示图标错误------------
        } else {
          createMessage.success(fileInfo.message || `${data.file.name} File uploaded successfully`);
        }
      } catch (error) {
        console.log('Imported data is abnormal', error);
      } finally {
        typeof success === 'function' ? success(fileInfo) : '';
      }
    };
    await defHttp.uploadFile({ url }, { file: data.file }, { success: isReturn });
  }

  return {
    handleExportXls: (name: string, url: string, params?: object) => exportXls(name, url, params),
    handleImportXls: (data, url, success) => importXls(data, url, success),
    handleExportXlsx: (name: string, url: string, params?: object) => exportXls(name, url, params, true),
  };
}
