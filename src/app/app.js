let hybrid = {
  install: function (Vue) {
    Vue.prototype.$app = this
  }
}
window.hybrid = hybrid

export default hybrid
