class Typed{
	
	constructor(){
		this.selector;
		this.typeds = [];
		this.id = 0;
		this.char = 0;
		this.interval;
		this.lightActive = true;
		this.html;
		this.string;
		Typed.light = {fade: 250};
		return this;
	}

	create(selector, object, typingTime, timeBeforeClear, timeNextText, repeat){
		this.selector = selector ? selector : $("body");
		this.typingTime = typingTime ? typingTime : 0;
		this.timeBeforeClear = timeBeforeClear ? timeBeforeClear : 0;
		this.timeNextText = timeNextText ? timeNextText : 0;
		this.repeat = repeat ? repeat : 0;
		object.forEach((v) => {
			this.typeds.push(v);
		});
		return this;
	}

	add(object){
		object.forEach((v) => {this.typeds.push(v)});
	}

	start(){
		var self = this;
		if(!this.lightEffect){
			this.LightInterval = setInterval("Typed.lightFade()", 0);
			this.lightEffect = true;
		}
		if(this.typeds[this.id] != undefined){
			setTimeout(function(){
				self.read();
			}, this.typingTime);
		}else{
			if(this.repeat){
				this.resetTypping();
			}
		}
	}
	read(){
		this.removeLight();
		var self = this;
		if(this.char >= this.typeds[this.id].length){
			setTimeout(function(){
				self.delete();
			}, this.timeBeforeClear);
			this.addLight();
			return false;
		}
		$(this.selector.selector).append(this.typeds[this.id].charAt(this.char));
		this.addLight();
		this.char++;
		setTimeout(function(){
			self.read();
		}, this.typingTime);
	}
	delete(){
		var self = this;
		this.removeLight();
		this.html = $(this.selector.selector).html();
		if(this.char <= 0){
			this.id++;
			setTimeout(function(){
				self.start();
			}, this.timeNextText);
			this.addLight();
			return false;
		}
		this.string = this.html.substr(0, this.html.length-1);
		$(this.selector.selector).html(this.string);
		this.char--;
		this.addLight();
		setTimeout(function(){
			self.delete();
		}, this.typingTime);
	}
	addLight(){
		$(this.selector.selector).append("<span class='light'></span>");
	}
	removeLight(){
		$(`${this.selector.selector} .light`).remove();
	}
	static lightFade(){
		this.lightActive = !this.lightActive;
		if(this.lightActive){
			$(".light").fadeOut(Typed.light.fade);
			return false;	
		}
		$(".light").fadeIn(Typed.light.fade);
	}
	resetTypping(){
		this.id = 0;
		this.char = 0;
		this.start();
	}
	stop(){
		clearInterval(this.interval);
		clearInterval(this.LightInterval);
		this.id = 0;
		this.char = 0;
		this.html = null;
		this.string = null;
	}
}