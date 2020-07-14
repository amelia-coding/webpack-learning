/**
 * options - chain - loader.js;
 * console.log(obj.foo.bar?.baz) // 2
 * 被转成 obj && obj.foo && obj.foo.bar && obj.foo.bar.baz
 * @param {*} content
 */
module.exports = function (content) {
  return content.replace(new RegExp(/([\$_\w\.]+\?\.)/, 'g'), function (res) {
    let str = res.replace(/\?\./, '');
    let arrs = str.split('.');
    let strArr = [];
    for (let i = 1; i <= arrs.length; i++) {
      strArr.push(arrs.slice(0, i).join('.'));
    }
    let compile = strArr.join('&&');
    const done = compile + '&&' + str + '.';
    return done;
  });
};
