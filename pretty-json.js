
class Tree {
  constructor ( key, value, parent = null ) {
    this.key = key
    this.value = value
    this.parent = parent

    this.type = Array.isArray(value) ? "array" : typeof value
    this.depth = parent ? parent.depth + 1 : 0
    this.children = []

    if (!(value instanceof Object))
      return

    for ( let [k, v] of Object.entries(value) ) {
      const child = new Tree(k, v, this)
      this.children.push(child)
    }
  }

  render ( container ) {
    const node = document.createElement("div")
    node.classList.add("node")
    node.style.paddingLeft = `${this.depth * 10}px`

    const key = document.createElement("div")
    key.classList.add("key")
    key.innerText = this.key
    node.appendChild(key)

    const divider = document.createElement("div")
    divider.classList.add("divider")

    const canCollapse = ["object", "array"].includes(this.type)
    if (canCollapse) {
      const collapse = document.createElement("div")
      collapse.classList.add("collapse")
      collapse.innerText = "-"
      collapse.addEventListener("click", (event) => {
        event.stopPropagation()
        console.log(`collapse ${this.key}`)
        collapse.classList.toggle("collapsed")
      })
      node.appendChild(collapse)

      for ( const child of this.children )
        child.render(collapse)
    } else {
      const value = document.createElement("div")
      value.classList.add("value")
      value.innerText = this.value
      node.appendChild(value)
    }

    container.appendChild(node)
  }
}
