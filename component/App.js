import html from '../js/core.js'
import { connect } from "../js/store.js";
import Header from "../component/Header.js";
import TodoList from "../component/ToDoList.js";
import Footer from "../component/Footer.js";



function App({ todos }) {
  return html `
    <section class="todoapp">
      ${Header()}
      ${todos.length > 0 && TodoList()}
      ${ todos.length > 0 && Footer()}
    </section>
  `
}

export default connect()(App)
