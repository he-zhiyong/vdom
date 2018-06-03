import VDOM from '../../src'
const h = VDOM.h

function list_demo(list) {
  return (
    <ul className="list">
      {list.map((item, index) => 
        <li>{index.toString()} {item}</li>
      )}
    </ul>
  )
}

const el = document.getElementById('list_demo')
const list = []
VDOM.render(list_demo(list), el)

const index = document.getElementById('index')
const item = document.getElementById('item')
const addBtn = document.getElementById('add')
const removeBtn = document.getElementById('remove')
const updateBtn = document.getElementById('update')

addBtn.onclick = function () {
  list.splice(index.value, 0, item.value)
  VDOM.update(list_demo(list), el)
}
removeBtn.onclick = function () {
  list.splice(index.value, 1)
  VDOM.update(list_demo(list), el)
}
updateBtn.onclick = function () {
  list.splice(index.value, 1, item.value)
  VDOM.update(list_demo(list), el)
}