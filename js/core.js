export default function html ([first, ...strings], ...values) {
  return values.reduce((acc, cur) =>
    acc.concat(cur, strings.shift()),[first])
    .filter(x => x && x !== true || x === 0)
    //filter de tra ve gia tri truthy hop le
    .join('')}
//join tu mang (array) => chuoi (string)

export function createStore(reducer) {
  let state = reducer()
  const roots = new Map() //tu khoa Map dung de lay object moi thay cho key

  function render() {
    for (const [root, component] of roots) {
      //Dung destructuring de lay gia tri tu array/object
      const output = component()
      //component la function dung de return ra html
      root.innerHTML = output
    }
  }

  return {
    attach(component, root) {
      //function attach dung de lay gia tri o view truyen vao root
      roots.set(root, component)
      render()
    },

    connect(selector = state => state) {
      //lien ket du lieu tu store ra view
      return component => (props, ...args) =>
        //props la cong cu, du lieu dc lay de truyen vao component
        //...args: toan tu REST
        component(Object.assign({}, props, selector(state), ...args))
      //Vi props, state, ...args la object, nen dung phuong thuc OBJECT.assign
    },

    dispatch(action, ...args) {
      state = reducer(state, action, args)
      render()
    }
  }
}
