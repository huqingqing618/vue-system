module.exports = {
  title: "Vue Element Admin",

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  whiteList: ["/login", "/auth-redirect"], // no redirect whitelist
  errorLog: "production",
  proxyUrl: "http://10.132.19.62:8888/sqsd_srm",
  menuBg: "#1f2d3d",
  menuText: "#e2322c",
  menuActiveText: "#409EFF"
}
