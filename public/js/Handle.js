/**
 * 绑定事件
 * @param  {[type]} module){} [description]
 * @return {[type]}             [description]
 */
define(["BoardModule","Game"],function(module,game){
	var g = new game();
	var m = new module();
	g.game_satrt();
	var doms = m.getDom();
	var handle = {
		//开始游戏
		start_click:function(){
			doms.btns.start_btn.click(function(){
				g.handleStart(g);//开始游戏
			})
		},
		//点击色块
		color_click:function(){
			if(isTouchDevice()){
				doms.other.panel.on("touchstart","span",function(e){
					g.hanlerColor(this);//点击色块
				});
			}
			else{
				doms.other.panel.on("click","span",function(e){
					g.hanlerColor(this);//点击色块
				})
			}
		},
		//重新启动
		restart_click:function(){
			doms.btns.restart_btn.click(function(){
				g.handleRestart(g);
			})	
		},
		//暂停按钮
		pause_click:function(){
			doms.btns.pause_btn.click(function(){
				g.handlePause();
			})
		},
		//继续游戏
		continue_click:function(){
			doms.btns.continue_btn.click(function(){
				g.handleContinue(g);
			})
		},
		//结束游戏
		end_click:function(){
			doms.btns.end_btn.click(function(){
				g.handleEnd();
			})
		},
		init:function(){
			this.start_click();
			this.color_click();
			this.restart_click();
			this.pause_click();
			this.continue_click();
			this.end_click();
		}
	}
	  /**
      * 判断是否是移动网页
      * @return {Boolean} [description]
      */
     function isTouchDevice(){
          return ('ontouchstart' in document.documentElement);
     }

	return handle;
})