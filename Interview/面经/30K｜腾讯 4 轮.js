/*
一面
1、普通函数和箭头函数的this指向问题

const obj = {
  fn1: () => console.log(this),
  fn2: function() {console.log(this)}
}

obj.fn1();
obj.fn2();

const x = new obj.fn1();
const y = new obj.fn2();

2、promise相关的特性

3、vue父子组件, 生命周期执行顺序 created mounted

4、vue3添加了哪些新特性?

5、xss 的特点以及如何防范?

6、Http 2.0和http3.0对比之前的版本, 分别做了哪些改进?

7、HTTP 3.0基于udp的话, 如何保证可靠的传输?

8、TCP和UDP最大的区别是什么?

9、CSP除了能防止加载外域脚本, 还能做什么?

10、typescript is这个关键字是做什么呢?

11、【代码题】 多叉树, 获取每一层的节点之和

function layerSum(root) {
    
}

const res = layerSum({
    value: 2,
    children: [
        { value: 6, children: [ { value: 1 } ] },
        { value: 3, children: [ { value: 2 }, { value: 3 }, { value: 4 } ] },
        { value: 5, children: [ { value: 7 }, { value: 8 } ] }
    ]
});

console.log(res);


二面
没记录, 应该是和前面遇到的面试题重复了

1、【代码题】 虚拟dom转真实dom

const vnode = {
    tag: 'DIV',
    attrs: {
        id: 'app'
    },
    children: [{
            tag: 'SPAN',
            children: [{
                tag: 'A',
                children: []
            }]
        },
        {
            tag: 'SPAN',
            children: [{
                    tag: 'A',
                    children: []
                },
                {
                    tag: 'A',
                    children: []
                }
            ]
        }
    ]
}

function render(vnode) {

}


三面
1、前端安全 xss之类的

2、Https中间人攻击

3、前端History路由配置 nginx

4、【代码题】 有序数组原地去重


四面(gm?忘记了)
1、如何估算一个城市中的井盖数量
*/