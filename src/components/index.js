// const components = require.context("../components", true, /\.vue$/)
// console.log(components.keys().map(item => components(item).default))
import myTable from "../components/table"
export default {
  install(vue) {
    vue.component("myTable", myTable)
  }
}
