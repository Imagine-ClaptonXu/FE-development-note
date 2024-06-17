// -------- 柯里化 --------

var log = console.log.bind(console)

const curing = (fn, pre = []) => {
    const argsLen = fn.length
    
    return function (...args) {
        log('args', ...args)
        pre = pre.concat(args)
        log('pre', pre)
        if (pre.length === argsLen) {
            return fn.call(this, ...pre)
        } else {
            return curing(fn, pre)
        }
    }
}

function add(x, y, z) {
    return x + y + z
}

const f = curing(add)
log(f(1)(2)(5)) // 8


/**
 * 将函数柯里化
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数，默认为原函数的形参个数
 */
function curry(fn, len=fn.length) {
    return _curry.call(this, fn, len)
}

/**
 * 中转函数
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数
 * @param args  已接收的参数列表
 */
function _curry(fn, len, ...args) {
    return function (...params) {
        let _args = [...args,...params];
        if (_args.length >= len) {
            return fn.apply(this, _args);
        } else {
            return _curry.call(this, fn, len, ..._args)
        }
    }
}

let _fn = curry(function(a, b, c, d, e) {
    return a + b + c + d + e
});

_fn(1, 2, 3, 4, 5);
_fn(1)(2)(3, 4, 5);
_fn(1, 2)(3, 4)(5);
_fn(1)(2)(3)(4)(5);

console.log(_fn(1)(2)(3)(4)(5)) // 15
