/*
Copyright 2008-2016 sites.reviews
All Rights Reserved.
Do not copy without permission!

Sites.Reviews - Отзывы о сайтах
http://sites.reviews/
*/

if ( typeof window.size == 'undefined' ) {
	window.size = function()
	{
		var w = 0;
		var h = 0;

		if(!window.innerWidth) {
			//IE
			if(!(document.documentElement.clientWidth == 0)) {
				//strict mode
				w = document.documentElement.clientWidth;
				h = document.documentElement.clientHeight;
			} else {
				//quirks mode
				w = document.body.clientWidth;
				h = document.body.clientHeight;
			}
		} else {
			//w3c
			w = window.innerWidth;
			h = window.innerHeight;
		}
		return {width:w,height:h};
	};
}
function init_feedbackButton(hPos) {
	if ( hPos != 'left' ) hPos = 'right';

	var wsize = window.size();
	var sr_feedbackButton_width = '30';
	var sr_feedbackButton_height = '120';
	var sr_link_url = "javascript:(function(){var%20jssrc='//sites.reviews/js/ui-init.js';var%20js=document.createElement('script');js.setAttribute('language','javascript');js.setAttribute('type','text/javascript');js.setAttribute('src',jssrc);document.getElementsByTagName('head').item(0).appendChild(js);void(0);})()";
	var sr_feedbackButton_src = "//sites.reviews/images/feedback_button_02.png";
	if ( hPos == 'right' ) {
		sr_feedbackButton_src = "//sites.reviews/images/feedback_button_03.png";
	}

	if (typeof document.compatMode!='undefined' && document.compatMode!='BackCompat') {
		sr_feedbackButton_css2 = "_top:expression(document.documentElement.scrollTop+"+Math.round(wsize.height/2-sr_feedbackButton_height/2)+"-this.clientHeight+this.clientHeight);_left:expression(document.documentElement.scrollLeft" + ( hPos == 'left' ? "" : " + document.documentElement.clientWidth - offsetWidth" ) + ");";
	} else {
		sr_feedbackButton_css2 = "_top:expression(document.body.scrollTop+"+Math.round(wsize.height/2-sr_feedbackButton_height/2)+"-this.clientHeight+this.clientHeight);_left:expression(document.body.scrollLeft" + ( hPos == 'left' ? "" : " + document.body.clientWidth - offsetWidth" ) + ");";
	}

	var sr_feedbackButton_css;
	sr_feedbackButton_css  = '#sr_feedbackButton {position:fixed;';
	sr_feedbackButton_css += '_position:absolute;';
	sr_feedbackButton_css += 'top:'+Math.round(wsize.height/2-sr_feedbackButton_height/2)+'px;';
	sr_feedbackButton_css += ( hPos == 'left' ? 'left:0px;' : 'right:0px;' );
	sr_feedbackButton_css += sr_feedbackButton_css2;
	sr_feedbackButton_css += '}';

	var div = document.createElement("div");
	div.setAttribute('id', 'sr_feedbackButton');
	div.innerHTML = '<a href="'+sr_link_url+'"><img border="0" width="'+sr_feedbackButton_width+'" height="'+sr_feedbackButton_height+'" src="'+sr_feedbackButton_src+'"></a>';
	document.getElementsByTagName('body')[0].appendChild(div);

	var style = document.createElement("style");
	style.setAttribute('id', 'sr_feedbackButton_style');
	style.setAttribute('type', 'text/css');
	style.innerHTML = sr_feedbackButton_css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

if ( typeof SaiterFeedbackButton == 'object' ) {
	init_feedbackButton(SaiterFeedbackButton.side || '');
}