/**
 * Created by wd on 2017/10/10.
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
};
/**
 *根据正则判断是否有该样式
 * 以空格或者该样式名称开头，以空格或者数字结尾
 * */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
};
