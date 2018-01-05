seajs.config({
	// 别名配置
	  alias: {
	    //'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
	    //'json': 'gallery/json/1.0.2/json',
		//'preload': 'sea-modules/seajs-preload'
	  },

	  // 路径配置
	  paths: {
	    //'gallery': 'https://a.alipayobjects.com/gallery'
		  'js': 'static/venus/js',
		  'tpl': 'static/venus/tpl'
	  },

	  // 变量配置
	  vars: {
	    'locale': 'zh-cn'
	  },

	  // 映射配置
	  map: [
	    //['http://example.com/js/app/', 'http://localhost/js/app/']
	  ],

	  // 预加载项
	  preload: [
	    //Function.prototype.bind ? '' : 'es5-safe',
	    //this.JSON ? '' : 'json'
	    //"zepto"
	  ],

	  // 调试模式
	  debug: true,

	  // Sea.js 的基础路径
	  base: baseUrl,

	  // 文件编码
	  charset: 'utf-8'
});