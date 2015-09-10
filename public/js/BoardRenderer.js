//图形操作	
define(["BoardModule"],function(BoardModule){
	function BoardRender (module){
		this._width = 0;//游戏宽度
		this._height = 0;//游戏屏高度
		this._model = module;//游戏状态
		this._cols = module.getCells();//
	}
	var _p = BoardRender.prototype;//原型
	/**
	 * 改变状态
	 * @param  {[type]} staus [状态]
	 * @return {[type]}       [description]
	 */
	_p.changeStatus = function(status){
		var page = this._model._dom.pages;
		page.all.addClass('hide');
		switch(status){
			case BoardModule.START:
				page.begin_page.removeClass('hide');
				break;
			case BoardModule.PLAYING:
				page.game_page.removeClass('hide');
				break;
			case BoardModule.END:
				//game over
				page.end_page.removeClass('hide');
				break;
			case BoardModule.PAUSE:
				//pause
				page.pause_page.removeClass('hide');
				break;
		}
	}
	/**
	 * 页面加载前 设置panel的宽高
	 */
	_p.setPanel = function(){
		var width = document.width || document.body.clientWidth;
	  	var height = document.height || document.body.clientHeight;
		var panel = this._model._dom.other.panel;
		var edge = width > height ? height : width;
		edge = (edge - 20) > 460 ? 460 : (edge - 20);
		panel.width(edge).height(edge);
	}
	/**
	 * 设置game over 页面
	 */
	_p.setGameOverPage = function (score){
		var text = this._model.getOverText(score);
		this._model.getDom().other.endTxt.text(text);
	}
	/**
	 * 根据不同的等级重绘页面
	 * @return {[type]} [description]
	 */
	_p.renderLevel = function(color1,color2,index){
		var doms = this._model._dom;
		var panel = doms.other.panel;//panel
		var score = doms.other.score;
		var level = this._model.getLevel();
		var cells = BoardModule.levels[level] ? BoardModule.levels[level] : 9;//个数
		//清空panel
		panel.empty();
		panel.attr("class","lv_0"+cells);
		for(var i = 0; i < cells * cells ; i++){
			if(i != index){
				panel.append($("<span/>").css("background-color",color1[1]));
			}
			else{
				panel.append($("<span/>").css("background-color",color2[1]))
			}
		}
		score.text(this._model.getScore());
	}
	return BoardRender;
})