module.exports = {
	devServer:{
		
		proxy:{
			
			'/api':{
				
				target:'http://tests.com',
				changeOrigin:true,
				ws:true,
				pathRewrite:{
					'^/api':''
				}
				
				
			}
			
		}
		
	}
}