//游戏状态
define(["jquery"],function($){
	/**
	 * 记录游戏状态
	 */
	function BoardModule () {
		this._level = 0;//等级
		this._score = 0;//分数
		this._time = 0;//游戏时间
		this._index = 0;//目标色块
		this._status = BoardModule.LOADING;
		this._dom = this._init_dom();
		this._interval = null;//定时器
	}

	/**
	 * 游戏状态
	 * @type {Number}
	 */
	BoardModule.LOADING = 0;//加载中
	BoardModule.START = 1;//开始游戏
	BoardModule.PLAYING = 2;//游戏中
	BoardModule.PAUSE = 3;//暂停游戏
	BoardModule.END = 4;//游戏结束

	//列等级
	BoardModule.levels = [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9];//等级
	BoardModule.overText = ["瞎子", "色盲", "色郎", "色狼", "色鬼", "色魔", "超级色魔", "变态色魔", "孤独求色"];//结束文本
	var _p = BoardModule.prototype;
	/**
	 * 初始化html dom
	 * @return {[type]} [dom 对象]
	 */
	_p._init_dom = function(){
		var elem = {};
		//页面对象
		elem.pages = {
			loading_page:$(".loading_page"),//加载中
			begin_page:$(".begin_page"),//开始页面
			game_page:$(".game_page"),//游戏界面
			pause_page:$(".pause_page"),//暂停界面
			end_page:$(".end_page"),//结束页面
			all:$(".main>div")
		}
		//按钮
		elem.btns = {
			start_btn:$(".start_btn"),//开始按钮
			exit_btn:$(".exit_btn"),//结束
			pause_btn:$(".pause_btn"),//暂停按钮
			continue_btn:$(".continue_btn"),//继续游戏
			restart_btn:$(".restart_btn"),//重新开始
			end_btn:$(".end_btn")//结束游戏
		}
		//其他
		elem.other = {
			score:$(".score"),//分数
			time:$(".time"),//时间
			panel:$("#panel"),//游戏框
			span:$(".panel span"),//小方块
			endTxt:$(".over_text")//结束文本
		}
		return elem;
	}
	/**
	 * 获取当前的列
	 * @return {[type]} [description]
	 */
	_p.getCells = function (){
		return this._cells;
	}
	/**
	 * 获取当前游戏等级
	 * @return {[type]} [description]
	 */
	_p.getLevel = function (){
		return this._level;
	}
	/**
	 * 设置当前游戏状态
	 * @param {[type]} level [description]
	 */
	_p.setLevel = function (level){
		this._level = level;
	}
	/**
	 * 设置当前游戏状态
	 * @param {[type]} status [description]
	 */
	_p.setStuats = function (status){
		this._status = status;
	}
	/**
	 * 获取当前状态
	 * @return {[type]} [description]
	 */
	_p.getStatus = function (){
		return this._status;
	}
	/**
	 * 获取dom对象
	 * @return {[type]} [description]
	 */
	_p.getDom = function(){
		return this._dom;
	}
	/**
	 * 获取当前分数
	 * @return {[type]} [description]
	 */
	_p.getScore = function(){
		return this._score;
	}
	/**
	 * 设置不同颜色的项
	 */
	_p.setIndex = function(index){
		this._index = index;
	}
	/**
	 * 获取结束的文本
	 * @param  {[type]} score [description]
	 * @return {[type]}       [description]
	 */
	_p.getOverText = function(score){
		var index = parseInt(score / 10);
		return (BoardModule.overText[index] ? BoardModule.overText[index] : BoardModule.overText[BoardModule.overText.length])+"  "+"lv"+score;;
	}
	/**
	 * 设置开始
	 */
	_p.reset = function(){
		this._status = BoardModule.START;
		this._level = 0;
		this._score = 0;
		this._time = 60;//60秒
		this._interval = null;
	}
	/**
	 * 开始计时
	 * @return {[type]} [description]
	 */
	_p.Time_Down = function(callback,g){
		var dom_time = this._dom.other.time;
		var that = this;
		this._interval = setInterval(function(){
			that._time --;
			if(that._time < 0){
				clearInterval(this._interval);
				callback(BoardModule.END,that._score,g);//结束调用
				that.reset();
			}
			dom_time.text(that._time);
		},1000);
	}
	/**
	 * 清除定时器
	 * @return {[type]} [description]
	 */
	_p.time_pause = function(){
		clearInterval(this._interval);
	}
	/**
	 * 判断是否成功
	 * @return {[type]} [description]
	 */
	_p.checkStatus = function(span){
		var index = $(span).index();
		if(index == this._index){
			//成功
			this._score ++;//加分数
			this._level ++;//加等级
			return true;
		}
		else {
			return false;
		}
	}
	return BoardModule;
})