export default function createElement(node) {
  if (typeof (node) === 'string') {
    return document.createTextNode(node)
  }
  let {
    type,
    props,
    children
  } = node
  const el = document.createElement(type)
  setProps(el, props)
  children.map(createElement).forEach(el.appendChild.bind(el))
  return el

  function setProp(target, name, value) {
    if (name === 'className') {
      return target.setAttribute('class', value)
    }
    target.setAttribute(name, value)
  }

  function setProps(target, props) {
    Object.keys(props).forEach(key => {
      setProp(target, key, props[key])
    })
  }
}