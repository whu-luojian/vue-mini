import Dep from './dep'

export default class Watcher {
  constructor(vm, node, name, type) {
    Dep.target = this
    this.vm = vm
    this.node = node
    this.name = name
    this.type = type
    this.update()
    Dep.target = null
  }

  update() {
    this.get()
    this.node[this.type] = this.value
  }

  get () {
    this.value = this.vm[this.name]
  }
}