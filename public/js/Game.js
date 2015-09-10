//游戏控制
define(["BoardRenderer","BoardModule"],function(Render,Module){
	//游戏类
	function Game(){
		this._model = new Module();
		this._render = new Render(this._model);
	}
	var _p = Game.prototype;//原型
	/**
	 * 游戏开始
	 * @return {[type]} [description]
	 */
	_p.game_satrt = function(){
		//开始游戏
		this._model.reset();
		this._render.setPanel();
		this._render.changeStatus(Module.START);
	}
	/**
	 * 开始游戏
	 * @return {[type]} [description]
	 */
	_p.handleStart = function(g){
		var state = this._getStates(this._model.getLevel(),this._model.getScore());
		this._model.setIndex(state.index);//记录index
		this._render.renderLevel(state.color1,state.color2,state.index);//重绘
		this._model.Time_Down(this.gameOver,g);//开始计时
		this._render.changeStatus(Module.PLAYING);//开始游戏
	}
	/**
	 * 游戏结束
	 * @return {[type]} [description]
	 */
	_p.gameOver = function (status,score,g){
		g._render.changeStatus(status);//改变状态
		g._render.setGameOverPage(score);
	}
	/**
	 * 点击色块
	 * @return {[type]} [description]
	 */
	_p.hanlerColor = function(span){
		if(this._model.checkStatus(span)){
			//点击正确
			var state = this._getStates(this._model.getLevel(),this._model.getScore());
			this._model.setIndex(state.index);//记录index
			this._render.renderLevel(state.color1,state.color2,state.index);//重绘
		}	
		else{
			//点击错误
		}
	}
	/**
	 * 重启游戏
	 * @return {[type]} [description]
	 */
	_p.handleRestart = function (g){
		this._model.reset();
		this._render.changeStatus(Module.PLAYING);
		var state = this._getStates(this._model.getLevel(),this._model.getScore());
		this._model.setIndex(state.index);//记录index
		this._render.renderLevel(state.color1,state.color2,state.index);//重绘
		this._model.Time_Down(this.gameOver,g);//开始计时
	}
	/**
	 * 暂停游戏
	 * @return {[type]} [description]
	 */
	_p.handlePause = function(){
		this._model.time_pause();//清除定时器
		this._render.changeStatus(Module.PAUSE);
	}
	/**
	 * 继续游戏
	 * @return {[type]} [description]
	 */
	_p.handleContinue = function(g){
		this._render.changeStatus(Module.PLAYING);
		this._model.Time_Down(this.gameOver,g);//开始计时
	}
	/**
	 * 结束游戏
	 * @return {[type]} [description]
	 */
	_p.handleEnd = function(){
		this._model.reset();
		this._render.changeStatus(Module.START);
	}
	/**
	 * 获取颜色已经
	 * @param  {[type]} level [description]
	 * @return {[type]}       [description]
	 */
	_p._getStates = function(level,score){
		var c =level % 8;
		var d = 15 * Math.max(9 - c, 1); 
		var e = score > 20 ? 10 : 30; //混淆色
		e = score > 40 ? 8 : e; 
		e = score > 50 ? 5 : e;

		var index = this._getIndex(level);
		var color1 = this._getColor(d);
		var color2 = this._getLvColor(color1[0],e);
		return {
			index:index,
			color1:color1,
			color2:color2
		}
	}
	/**
	 * 获取颜色
	 * @param  {[type]} a [description]
	 * @return {[type]}   [description]
	 */
	_p._getColor = function(a) {
        var b = [   
                    Math.round(Math.random() * a), 
                    Math.round(Math.random() * a), 
                    Math.round(Math.random() * a)
                ], 
            c = "rgb(" + b.join(",") + ")";
        return [b, c]
    }
    /**
     * 获取不一样的颜色
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    _p._getLvColor = function(a,e) {
        a = $.map(a,function(item,index){
        	return item + e;
        })
        d = "rgb(" + a.join(",") + ")";
        return [a, d]
    }
    /**
     * 随机生成不一样的位置
     * @param  {[type]} level [description]
     * @return {[type]}       [description]
     */
    _p._getIndex = function(level){
    	var nums =  Module.levels[level] ? Module.levels[level] : Module.levels[16];//总个数
    	var index = Math.floor(Math.random() * nums * nums);
    	return index;
    }
	return Game;
})