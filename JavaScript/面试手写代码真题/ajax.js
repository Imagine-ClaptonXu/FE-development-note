
// -------- 实现 ajax 请求 --------
const ajax = function(url, method) {
    let p = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest()
        // 创建 Http 请求
        xhr.open(method, url, true)
        // 设置状态监听函数
        xhr.onreadystatechange = function () {
            // 当 readyState 变为 4 的时候，代表服务器返回的数据接收完成
            if (this.readyState !== 4) {
                return
            }
            // 判断请求的状态码来判断请求是否成功
            if ((this.status >= 200 && this.status < 300) || (this.status === 304)) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        // 设置请求失败时的监听函数
        xhr.onerror = function () {reject(new Error(this.statusText))}
        // 设置请求头信息
        xhr.responseType = "json"
        xhr.setRequestHeader("Accept", "application/json")
        // 发送 Http 请求
        xhr.send(null)
    })
    return p
}
