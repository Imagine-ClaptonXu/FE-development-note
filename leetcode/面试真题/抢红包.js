// 提供了⼀个 RedPackage 的类，初始化时传⼊红包⾦额和个数，
// 需要实现⼀个 openRedPackage ⽅法，每调⼀次都进⾏⼀次“抢红包”，
// 并以 console.log 的形式输出抢到的红包⾦额。

var log = console.log.bind(console)

class RedPackage {
    constructor(money, number) {
        this.money = money // 红包⾦额
        this.number = number // 红包个数
        this.residueMoney = money // 剩余红包金额
        this.residueNumber = number // 剩余红包个数

        this.checkResidue(money, number, 'init')
    }

    // 检测红包还够不够分，是否能创建成功
    // 新建红包是要考虑 0.01 是常用最小金额，如果 0.01 分两个包，就无法创建红包，抛出异常
    // 不是新建红包
    //      剩余红包够分就 return true
    //      不够分则 return false
    checkResidue(money, number, type) {
        let res = true
        if (money * 100 < number) {
            if (type === 'init') {
                throw {
                    err: '创建红包失败，金额不够分配',
                    money: this.money,
                    number: this.number,
                }
            } else {
                return false
            }
        }
        return res
    }

    // 要保留两位小数
    formatMoney(money) {
        return Number((money * 100).toFixed(0)) / 100
    }

    // 计算这个钱能不能发出去，不能就重新计算
    creatOneRedPackage() {
        let currentMoney = this.formatMoney(this.residueMoney * Math.random())
        let residueNumber = this.formatMoney(this.residueMoney - currentMoney)
        if (this.checkResidue(residueNumber, this.residueNumber - 1)) {
            return currentMoney
        } else {
            this.creatOneRedPackage()
        }
    }

    // “抢红包”
    openRedPackage() {
        // 抢完了报错
        if (this.residueNumber <= 0) {
            throw {
                err: '红包抢完了',
            }
        } else if (this.residueNumber === 1) {
            // 只能一个包就不用算了
            log('money', this.residueMoney)
            this.residueMoney = 0
            this.residueNumber = 0
        } else {
            // 计算能不能发出去
            let money = this.creatOneRedPackage()
            // 更新金额和包
            this.residueMoney = this.formatMoney(this.residueMoney - money)
            this.residueNumber = this.residueNumber - 1
            log('money', money)
            // log('剩下的钱', this.residueMoney)
            // log('剩下的包', this.residueNumber)
        }
    }
}

let redPackage = new RedPackage(30, 5)
log('新建', redPackage)
redPackage.openRedPackage()
redPackage.openRedPackage()
redPackage.openRedPackage()
redPackage.openRedPackage()
redPackage.openRedPackage()
redPackage.openRedPackage()
