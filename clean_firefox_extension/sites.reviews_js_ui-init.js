/*
Vertical Layout / Left Hand
*/
function RVF_GetHighestZIndex() {
    var allElems = document.getElementsByTagName?
        document.getElementsByTagName("*"):
        document.all; // or test for that too
    var maxZIndex = 0;
    for(var i=0;i<allElems.length;i++) {
        var elem = allElems[i];
        var cStyle = null;
        if (elem.currentStyle) {
            cStyle = elem.currentStyle;
        } else if (document.defaultView && document.defaultView.getComputedStyle) {
            cStyle = document.defaultView.getComputedStyle(elem,"");
        }
        var sNum;
        if (cStyle) {
            sNum = Number(cStyle.zIndex);
        } else {
            sNum = Number(elem.style.zIndex);
        }
        if (!isNaN(sNum)) {
            maxZIndex = Math.max(maxZIndex,sNum);
        }
    }
    return maxZIndex;
}
function RVF_DetectIE6() {
	var browser = navigator.appName;
	if (browser == "Microsoft Internet Explorer"){
		  var b_version = navigator.appVersion;
	    var re = /\MSIE\s+(\d\.\d\b)/;
	    var res = b_version.match(re);
	    if (res[1] <= 6){
	    	return true;
	    }
	}
	return false;
}
function RVF_InitUI() {
	if ( RVF_DetectIE6() ) {
		alert('Microsoft Internet Explorer 6 is not supported');
		return false;
	}
	
    var RVsrc='https://sites.reviews/ui/';
    var RVimages='https://sites.reviews/images/ui/';
    var RVparams = [];
    var RVFrameWidth = 342;
    var RVFrameId = 'RV_UI_FRAME';
    var RVFrameCloseButtonId = RVFrameId + '_CLOSE';
    var RVFrameHideButtonId = RVFrameId + '_HIDE';
    var RVFrameShowButtonId = RVFrameId + '_SHOW';
    var D = document.getElementsByTagName('body').item(0);
    RVF_FixDocumentLayout = function() {
        RVFBodyStyleBackup['marginLeft'] = D.style.marginLeft;
//        D.style.marginLeft = RVFrameWidth + 'px';
        D.style.marginLeft = 0 + 'px';
    }
    RVF_RestoreDocumentLayout = function() {
        D.style.marginLeft = RVFBodyStyleBackup['marginLeft'];
    }

    /* Multple toolbar click Hack */
    if (typeof(RVFBodyStyleBackup) != "undefined") {
        RVF_RestoreDocumentLayout();
    }

    RVFBodyStyleBackup = {};
    RVF_CloseUI = function() {
        var currentUI = document.getElementById(RVFrameId);
        if (currentUI) {
            currentUI.parentNode.removeChild(currentUI);
            var el = document.getElementById(RVFrameCloseButtonId);
            if (el) {el.parentNode.removeChild(el);}
            var el = document.getElementById(RVFrameHideButtonId);
            if (el) {el.parentNode.removeChild(el);}
            var el = document.getElementById(RVFrameShowButtonId);
            if (el) {el.parentNode.removeChild(el);}
            RVF_RestoreDocumentLayout();
        }
    }
    RVF_HideUI = function() {
        var currentUI = document.getElementById(RVFrameId);
        if (currentUI) {
            currentUI.style.display = 'none';
            var el = document.getElementById(RVFrameCloseButtonId);
            if (el) {el.style.display = 'none';}
            var el = document.getElementById(RVFrameHideButtonId);
            if (el) {el.style.display = 'none';}
            var el = document.getElementById(RVFrameShowButtonId);
            if (el) {el.style.display = 'block';}
            RVF_RestoreDocumentLayout();
        }
    }
    RVF_ShowUI = function() {
        var currentUI = document.getElementById(RVFrameId);
        if (currentUI) {
            currentUI.style.display = 'block';
            var el = document.getElementById(RVFrameCloseButtonId);
            if (el) {el.style.display = 'block';}
            var el = document.getElementById(RVFrameHideButtonId);
            if (el) {el.style.display = 'block';}
            var el = document.getElementById(RVFrameShowButtonId);
            if (el) {el.style.display = 'none';}
            RVF_FixDocumentLayout();
        }
    }
    RVF_CloseUI();
    highestZIndex = RVF_GetHighestZIndex();
    RVparams.push('_u=' + escape(document.location.href));
    RVparams.push('_r=' + escape(document.referrer));
    var fr=document.createElement('iframe');
    // adding an iframe
    fr.setAttribute('id', RVFrameId);
    fr.setAttribute('frameborder', '0');
    fr.setAttribute('width', RVFrameWidth);
    fr.setAttribute('height', '100%');
    fr.setAttribute('scrolling', 'no');
    fr.style['position'] = 'fixed';
    fr.style['top'] = '0';
    fr.style['left'] = '0';
    fr.style.zIndex = (highestZIndex+1);
    fr.style.overflow = 'hidden';
    fr.setAttribute('src', RVsrc + '?' + RVparams.join('&') );
    document.getElementsByTagName('body').item(0).appendChild(fr);
    // adding "close button"
    var frClose=document.createElement('div');
    frClose.setAttribute('id', RVFrameCloseButtonId);
    frClose.style.position = 'fixed';
    frClose.style.top = '0';
    frClose.style.left = (RVFrameWidth-37) + 'px';
    frClose.style.zIndex = (highestZIndex+2);
    frClose.style.width = '28px';
    frClose.style.height = '17px';
    frClose.style.border = 'none';
    frClose.style.cursor = 'pointer';
    frClose.style.textAlign = 'center';
    frClose.style.background = 'none';
    frClose.style.backgroundImage = 'url(' + RVimages + 'pclose.png)';
    frClose.onclick = RVF_CloseUI;
    frClose.setAttribute('title', "Close Discussion Board");
    D.appendChild(frClose);
    // adding "hide button"
    var frHide=document.createElement('div');
    frHide.setAttribute('id', RVFrameHideButtonId);
    frHide.style.position = 'fixed';
    frHide.style.top = '0';
    frHide.style.left = (RVFrameWidth-65) + 'px';
    frHide.style.zIndex = (highestZIndex+2);
    frHide.style.width = '27px';
    frHide.style.height = '17px';
    frHide.style.border = 'none';
    frHide.style.cursor = 'pointer';
    frHide.style.background = 'none';
    frHide.style.backgroundImage = 'url(' + RVimages + 'pminimize.png)';
    frHide.onclick = RVF_HideUI;
    frHide.setAttribute('title', "Hide Discussion Board");
    D.appendChild(frHide);
    // adding "show button"
    var frShow=document.createElement('div');
    frShow.setAttribute('id', RVFrameShowButtonId);
    frShow.style.position = 'fixed';
    frShow.style.top = '0';
    frShow.style.left = '0';
    frShow.style.zIndex = (highestZIndex+2);
    frShow.style.width = '27px';
    frShow.style.height = '17px';
    frShow.style.background = 'none';
    frShow.style.backgroundImage = 'url(' + RVimages + 'pmaximize.png)';
    frShow.style.cursor = 'pointer';
    frShow.style.display = 'none';
    frShow.style.textAlign = 'center';
    frShow.innerHTML = '';
    frShow.onclick = RVF_ShowUI;
    frShow.setAttribute('title', "Show Discussion Board");
    D.appendChild(frShow);
    // try to shift document on the right
    RVF_FixDocumentLayout();

}
RVF_InitUI();
RVF_InitUI = null;
RVF_GetHighestZIndex = null;