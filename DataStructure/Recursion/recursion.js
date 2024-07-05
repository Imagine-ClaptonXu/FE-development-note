// -------- 递归 --------
// 递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身。

// 递归函数是像下面这样能够直接调用自身的方法或函数。
function recursiveFunction(someParam) {
    recursiveFunction(someParam)
}

// 能够像下面这样间接调用自身的函数，也是递归函数。
function recursiveFunction1(someParam) {
    recursiveFunction2(someParam)
}

function recursiveFunction2(someParam) {
    recursiveFunction1(someParam)
}

// 假设现在必须要执行 recursiveFunction，结果是什么？单就上述情况而言，它会一直执行下去。
// 因此，每个递归函数都必须有基线条件，即一个不再递归调用的条件（停止点），以防止无限递归。


// -------- JavaScript 调用栈大小的限制 --------
// 如果忘记加上用以停止函数递归调用的基线条件，递归并不会无限地执行下去，浏览器会抛出错误，也就是所谓的栈溢出错误（stack overflow error）。
// 每个浏览器都有自己的上限，可用以下代码测试。

function testMaxStackSize() {
    let i = 0;

    function recursiveFn() {
        i++;
        recursiveFn();
    }
    try {
        recursiveFn();
    } catch (ex) {
        console.log('i = ' + i + ' error: ' + ex);
    }
}
testMaxStackSize()

// 在 Chrome v65 中，该函数执行了 15 662 次，而后浏览器抛出错误 RangeError: Maximum call stack size exceeded（超限错误：超过最大调用栈大小）。
// 在 Firefox v59 中，该函数执行了 188 641 次，然后浏览器抛出错误 InternalError: too much recursion（内部错误：递归次数过多）。
// 在 Edge v41 中，该函数执行了 17 654 次。
