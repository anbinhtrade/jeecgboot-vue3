import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { setAuthCache } from '/@/utils/auth';
import { TOKEN_KEY } from '/@/enums/cacheEnum';
import { router } from '/@/router';
import { PageEnum } from '/@/enums/pageEnum';

const { createErrorModal } = useMessage();
enum Api {
  Login = '/sys/login',
  phoneLogin = '/sys/phoneLogin',
  Logout = '/sys/logout',
  GetUserInfo = '/sys/user/getUserInfo',
  // Get system permissions
  // 1、Query the button/form access rights that a user has
  // 2、All permissions
  // 3、System security mode
  GetPermCode = '/sys/permission/getPermCode',
  //A new API to get a graphical verification code
  getInputCode = '/sys/randomImage',
  //API for obtaining SMS verification code
  getCaptcha = '/sys/sms',
  //Register the interface
  registerApi = '/sys/user/register',
  //Verify the user interface
  checkOnlyUser = '/sys/user/checkOnlyUser',
  //SSO login verification
  validateCasLogin = '/sys/cas/client/validateLogin',
  //Verify the mobile phone number
  phoneVerify = '/sys/user/phoneVerification',
  //Change your password
  passwordChange = '/sys/user/passwordChange',
  //Third-party logins
  thirdLogin = '/sys/thirdLogin/getLoginUser',
  //Third-party logins
  getThirdCaptcha = '/sys/thirdSms',
  //Get QR code information
  getLoginQrcode = '/sys/getLoginQrcode',
  //Monitor QR code scanning status
  getQrcodeToken = '/sys/getQrcodeToken',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: user phoneLogin api
 */
export function phoneLoginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.phoneLogin,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, {}).catch((e) => {
    // update-begin--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
    if (e && (e.message.includes('timeout') || e.message.includes('401'))) {
      //接口不通时跳转到登录界面
      const userStore = useUserStoreWithOut();
      userStore.setToken('');
      setAuthCache(TOKEN_KEY, null);

      // update-begin-author:sunjianlei date:20230306 for: 修复登录成功后，没有正确重定向的问题
      router.push({
        path: PageEnum.BASE_LOGIN,
        query: {
          // 传入当前的路由，登录成功后跳转到当前路由
          redirect: router.currentRoute.value.fullPath,
        }
      });
      // update-end-author:sunjianlei date:20230306 for: 修复登录成功后，没有正确重定向的问题

    }
    // update-end--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
  });
}

export function getPermCode() {
  return defHttp.get({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function getCodeInfo(currdatetime) {
  let url = Api.getInputCode + `/${currdatetime}`;
  return defHttp.get({ url: url });
}
/**
 * @description: Get the SMS verification code
 */
export function getCaptcha(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.getCaptcha, params }, { isTransformResponse: false }).then((res) => {
      console.log(res);
      if (res.success) {
        resolve(true);
      } else {
        createErrorModal({ title: 'Error message', content: res.message || 'Unknown issue' });
        reject();
      }
    });
  });
}

/**
 * @description: Register the interface
 */
export function register(params) {
  return defHttp.post({ url: Api.registerApi, params }, { isReturnNativeResponse: true });
}

/**
 * Verify whether the user exists
 * @param params
 */
export const checkOnlyUser = (params) => defHttp.get({ url: Api.checkOnlyUser, params }, { isTransformResponse: false });
/**
 * Verify the mobile phone number
 * @param params
 */
export const phoneVerify = (params) => defHttp.post({ url: Api.phoneVerify, params }, { isTransformResponse: false });
/**
 * Change your password
 * @param params
 */
export const passwordChange = (params) => defHttp.get({ url: Api.passwordChange, params }, { isTransformResponse: false });
/**
 * @description: Third-party logins
 */
export function thirdLogin(params, mode: ErrorMessageMode = 'modal') {
  //==========begin 第三方登录/auth2登录需要传递租户id===========
  let tenantId = "0";
  if(!params.tenantId){
    tenantId = params.tenantId;
  }
  //==========end 第三方登录/auth2登录需要传递租户id===========
  return defHttp.get<LoginResultModel>(
    {
      url: `${Api.thirdLogin}/${params.token}/${params.thirdType}/${tenantId}`,
    },
    {
      errorMessageMode: mode,
    }
  );
}
/**
 * @description: Get a third-party SMS verification code
 */
export function setThirdCaptcha(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.getThirdCaptcha, params }, { isTransformResponse: false }).then((res) => {
      console.log(res);
      if (res.success) {
        resolve(true);
      } else {
        createErrorModal({ title: 'Error message', content: res.message || 'Unknown issue' });
        reject();
      }
    });
  });
}

/**
 * Get the login QR code information
 */
export function getLoginQrcode() {
  let url = Api.getLoginQrcode;
  return defHttp.get({ url: url });
}

/**
 * Monitor the status of code scanning
 */
export function getQrcodeToken(params) {
  let url = Api.getQrcodeToken;
  return defHttp.get({ url: url, params });
}

/**
 * SSO login verification
 */
export async function validateCasLogin(params) {
  let url = Api.validateCasLogin;
  return defHttp.get({ url: url, params });
}
