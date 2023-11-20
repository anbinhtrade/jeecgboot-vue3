import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/sysAnnouncementSend/getMyAnnouncementSend',
  editCementSend = '/sys/sysAnnouncementSend/editByAnntIdAndUserId',
  readAllMsg = '/sys/sysAnnouncementSend/readAll',
  syncNotic = '/sys/annountCement/syncNotic',
  getOne = '/sys/sysAnnouncementSend/getOne',
}

/**
 * Query the list of messages
 * @param params
 */
export const getMyNewsList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * Update the reading status of the user's system messages
 * @param params
 */
export const editCementSend = (params) => {
  return defHttp.put({ url: Api.editCementSend, params });
};

/**
 * One click has been read
 * @param params
 */
export const readAllMsg = (params, handleSuccess) => {
  Modal.confirm({
    title: 'Confirm the action',
    content: 'Whether all of them are marked as read?',
    okText: 'CONFIRM',
    cancelText: 'CANCEL',
    onOk: () => {
      return defHttp.put({ url: Api.readAllMsg, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * Synchronize messages
 * @param params
 */
export const syncNotic = (params) => {
  return defHttp.get({ url: Api.syncNotic, params });
};

/**
 * Obtain the message content based on the ID of the message sending record
 * @param sendId
 */
export const getOne = (sendId) => {
  return defHttp.get({ url: Api.getOne, params:{sendId} });
};

