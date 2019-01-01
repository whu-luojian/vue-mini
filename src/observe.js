import Dep from './dep'

function defineReactive(vm, key, value) {
  let dep = new Dep()
  /**
   * 使用 Object.defineProperty 代理 data 的属性
   * 1. 将 vm.data.xx 代理给 vm.xx,使得可以通过 vm.xx 或 this.xx 访问 vm.data.xx
   * 2. 模板 compile 时, 找到 使用的 vue 指令，新建一个watcher, watcher 初始化时设置 Dep.target 为watcher本身, 之后执行一次update
   * 触发 get ，收集依赖。因此模板complie之后 vm.xx.dep里都有了对应的watcher，之后更新触发set即可通知dep里的watcher进行更新
   */
  Object.defineProperty(vm, key, {
    get() {
      // 收集依赖(订阅者watcher)
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set(newVal) {
      if (newVal === value) {
        return
      }
      value = newVal
      // 通知依赖(watcher)更新
      dep.notify()
    }
  })
}

 export function observe(data, vm) {
  Object.keys(data).forEach(key => {
    defineReactive(vm, key, data[key])
  })
}