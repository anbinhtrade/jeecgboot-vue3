import { dateUtil } from '/@/utils/dateUtil';
import { duplicateCheck } from '/@/views/system/user/user.api';

export const rules = {
  rule(type, required) {
    if (type === 'email') {
      return this.email(required);
    }
    if (type === 'phone') {
      return this.phone(required);
    }
  },
  email(required) {
    return [
      {
        required: required ? required : false,
        validator: async (_rule, value) => {
          if (required == true && !value) {
            return Promise.reject('Please enter your email address!');
          }
          if (
            value &&
            !new RegExp(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ).test(value)
          ) {
            return Promise.reject('Please enter the correct email format!');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ] as ArrayRule;
  },
  phone(required) {
    return [
      {
        required: required,
        validator: async (_, value) => {
          if (required && !value) {
            return Promise.reject('Please enter your mobile number1!');
          }
          if (!/^1[3456789]\d{9}$/.test(value)) {
            return Promise.reject('The format of the mobile phone number is incorrect');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ];
  },
  startTime(endTime, required) {
    return [
      {
        required: required ? required : false,
        validator: (_, value) => {
          if (required && !value) {
            return Promise.reject('Please select a start time');
          }
          if (endTime && value && dateUtil(endTime).isBefore(value)) {
            return Promise.reject('开始时间需小于结束时间The start time must be less than the end time');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ];
  },
  endTime(startTime, required) {
    return [
      {
        required: required ? required : false,
        validator: (_, value) => {
          if (required && !value) {
            return Promise.reject('Please select an end time');
          }
          if (startTime && value && dateUtil(value).isBefore(startTime)) {
            return Promise.reject('The end time must be greater than the start time');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ];
  },
  confirmPassword(values, required) {
    return [
      {
        required: required ? required : false,
        validator: (_, value) => {
          if (!value) {
            return Promise.reject('The password cannot be empty');
          }
          if (value !== values.password) {
            return Promise.reject('The password entered twice is inconsistent!');
          }
          return Promise.resolve();
        },
      },
    ];
  },
  duplicateCheckRule(tableName, fieldName, model, schema, required?) {
    return [
      {
        validator: (_, value) => {
          if (!value && required) {
            return Promise.reject(`请输入${schema.label}`);
          }
          return new Promise<void>((resolve, reject) => {
            duplicateCheck({
              tableName,
              fieldName,
              fieldVal: value,
              dataId: model.id,
            })
              .then((res) => {
                res.success ? resolve() : reject(res.message || 'The verification failed');
              })
              .catch((err) => {
                reject(err.message || 'Validation failed');
              });
          });
        },
      },
    ] as ArrayRule;
  },
};

//update-begin-author:taoyan date:2022-6-16 for: 代码生成-原生表单用
/**
 * 唯一校验函数，给原生<a-form>使用，vben的表单校验建议使用上述rules
 * @param tableName Table name
 * @param fieldName The name of the field
 * @param fieldVal Field values
 * @param dataId Data ID
 */
export async function duplicateValidate(tableName, fieldName, fieldVal, dataId) {
  try {
    let params = {
      tableName,
      fieldName,
      fieldVal,
      dataId: dataId,
    };
    const res = await duplicateCheck(params);
    if (res.success) {
      return Promise.resolve();
    } else {
      return Promise.reject(res.message || 'The verification failed');
    }
  } catch (e) {
    return Promise.reject('The verification failure may be caused by a network disconnection');
  }
}
//update-end-author:taoyan date:2022-6-16 for: 代码生成-原生表单用
