import { CREATE, REMOVE, REPLACE, UPDATE, SET_PROP, REMOVE_PROP } from './type'

function diffProps(newNode, oldNode) {
  let patches = []

  let props = Object.assign({}, newNode.props, oldNode.props)
  Object.keys(props).forEach(key => {
    const newVal = newNode.props[key]
    const oldVal = oldNode.props[key]
    if (!newVal) {
      patches.push({type: REMOVE_PROP, key, value: oldVal})
    }

    if (!oldVal || newVal !== oldVal) {
      patches.push({ type: SET_PROP, key, value: newVal})
    }
  })

  return patches
}

function diffChildren(newNode, oldNode) {
  let patches = []

  const maximumLength = Math.max(
    newNode.children.length,
    oldNode.children.length
  )
  for(let i = 0; i < maximumLength; i++) {
    patches[i] = diff(
      newNode.children[i],
      oldNode.children[i]
    )
  }

  return patches
}

function changed(node1, node2) {
  return typeof(node1) !== typeof(node2) ||
         typeof(node1) === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}

export default function diff(newNode, oldNode) {
  if (!oldNode) {
    return { type: CREATE, newNode }
  }

  if (!newNode) {
    return { type: REMOVE }
  }

  if (changed(newNode, oldNode)) {
    return { type: REPLACE, newNode }
  }

  if (newNode.type) {
    return {
      type: UPDATE,
      props: diffProps(newNode, oldNode),
      children: diffChildren(newNode, oldNode)
    }
  }
}
