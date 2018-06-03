import diff from './diff'
import patch from './patch'

export default function update(newNode, oldNode, el){
  const patches = diff(newNode, oldNode)
  patch(el, patches)
}