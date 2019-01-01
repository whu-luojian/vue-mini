function Compile(node, vm) {
  return _nodeToFragment(node, vm)
}

function _nodeToFragment(node, vm) {
  let fragment = document.createDocumentFragment()
  let child = ''
  // 使用 append 插入节点，如果被插入的节点已经存在于当前文档的文档数中，则节点会首先从原先的位置移除，然后再插入到新的位置
  // 因此使用node.firstChild + append 可以依次获取node中的所有节点
  while(child = node.firstChild) {
    _compileElement(child, vm)
    fragment.append(child)
  }
  return fragment
}

function _compileElement(node, vm) {
  let reg = /\{\{(.*)\}\}/

  // 节点类型为元素
  if (node.nodeType === 1) {
    let attr = node.attributes
    let i = 0
    let len = attr.length
    // 寻找指令并解析
    for (i; i < len; i++) {
      if (attr[i].nodeName === 'v-model') {
        let name = attr[i].nodeValue
        node.addEventListener('input', e => {
          console.log(e.target.value)
          vm[name] = e.target.value
          node.value = vm[name]
        })
        new Watcher(vm, node, name, 'value')
      }
    }
  }

  // 节点类型为text
  if(node.nodeType === 3) {
    if (reg.test(node.nodeValue)) {
      let name = RegExp.$1.trim()
      new Watcher(vm, node, name, 'nodeValue')
    }
  }
}