import createElement from './createElement'
import update from './update'

class VDOM {
  h(type, props, ...children) {
    function flatten(arr) {
      return [].concat(...arr)
    }
    return {
      type,
      props: props || {},
      children: flatten(children)
    }
  }

  render(VNode, el) {
    this.oldNode = VNode
    el.appendChild(createElement(VNode))
  }

  update(newNode, el) {
    update(newNode, this.oldNode, el)
    this.oldNode = newNode
  }
}

export default VDOM