/*
 *
 * Fill in the user-defined expression here
 * Can be used in default expressions for online forms
 * Variables or methods that need to be used externally must be export, otherwise it is not recognized
 * 示例：
 *   export const name = zhangSan // const is the constant IS A CONSTANT
 *   export let age = 17; // It depends export const Still is let , both of which work fine
 *   export function content(arg) { // export Method, can be passed parameters, use to add parentheses, value must be returned back, can return Promise
 *     return 'content' + arg;
 *   }
 *   export const address = (arg) => content(arg) + ' | Beijing City'; // export Arrow functions are also available
 *
 */

/** Official example of field default: Get address */
export function demoFieldDefVal_getAddress(arg) {
  if (!arg) {
    arg = '朝阳区';
  }
  return `北京市 ${arg}`;
}

/** 自定义JS函数示例 */
export function sayHi(name) {
  if (!name) {
    name = '张三';
  }
  return `您好，我叫： ${name}`;
}
