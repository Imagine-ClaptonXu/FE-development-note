// -------- 实现一个 new 方法 --------

function new2(Func, ...args) {
    // 1.创建⼀个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.say = function () {
    console.log(this.name)
}

var p = new2(Person, "a", 123)
console.log(p) // Person {name: "a", age: 123}
p.say() // a
