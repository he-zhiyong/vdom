import { CREATE, REMOVE, REPLACE, UPDATE, SET_PROP, REMOVE_PROP } from './type'
import createElement from '../createElement'

function patchProps(parent, patches) {
  patches.forEach(patch => {
    const { type, key, value } = patch
    if (type === SET_PROP) {
      setProp(parent, key, value)
    }
    if (type === REMOVE_PROP) {
      removeProp(parent, key, value)
    }
  })
}

function removeProp(target, name, value) {
  if (name === 'className') {
    return target.removeAttribute('class')
  }

  target.removeAttribute(name)
}

export default function patch(parent, patches, index = 0) {
  if (!patches) {
    return
  }

  const el = parent.childNodes[index]
  switch (patches.type) {
    case CREATE: {
      const { newNode } = patches
      const newEl = createElement(newNode)
      parent.appendChild(newEl)
      break
    }
    case REMOVE: {
      parent.removeChild(el)
      break
    }
    case REPLACE: {
      const { newNode } = patches
      const newEl = createElement(newNode)
      return parent.replaceChild(newEl, el)
      break
    }
    case UPDATE: {
      const { props, children } = patches
      patchProps(el, props)
      for(let i = 0; i < children.length; i++) {
        patch(el, children[i], i)
      }
    }
  }
}
