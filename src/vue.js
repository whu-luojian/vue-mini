class Vue {
  constructor(options) {
    this.data = options.data
    // 将data里的属性使用 Object.defineProperty代理，重写get和set，使得属性变成响应式
    let data = this.data
    observe(data, this)
    // 编译阶段解析节点中的指令和占位符，创建watcher，读取data里的属性，触发get,收集对应的依赖（即订阅者watcher）
    let id = options.el
    let dom = new Compile(document.getElementById(id), this)
    // patch
    document.getElementById(id).appendChild(dom)
    // 更新阶段则触发set，发布更新，watchers一一执行更新
  }
}