/*
in html-code button have data-popup="popup-name" and for modal window give class "popup-name" => the button will activate elements with this class
*/
;(function(){
    var body = document.querySelector('body');
    
    //function return "null" or element contains className (проходится по родителям)
    var closestItemByClass = function(item, className){
        var node = item;
        
        while(node){
            if(node.classList.contains(className)){
                return node;
            }
            node = node.parentElement;
        }
        return null;
    };
    
    
    //function return "null" or element contains attr (проходится по родителям)
    var closestAttr = function(item, attr){
        var node = item;
        
        while(node){
            var attrValue = node.getAttribute(attr);
            if(attrValue){
                return attrValue;
            }
            node = node.parentElement;
        }
        return null;
    };
    
    
    var showPopup = function(target){
        target.classList.add('is-active');
    };
    var closePopup = function(target){
        target.classList.remove('is-active');
    };
    var toggleScroll = function(){
        body.classList.toggle('no-scroll');
    }
    
    //if element that was clicked contains data-popup="popup-menu", then will open div.popup-menu
    body.addEventListener('click', function(e){
        var target = e.target; //эл-т по которому был клик
        var popupClass = closestAttr(target, 'data-popup'); //popup-menu
      
        if(popupClass === null) {
            return;
        }
        e.preventDefault();
        var popup = document.querySelector('.' + popupClass); //div.popup-menu
        if(popup){
            showPopup(popup); //покажет div.popup-menu
            toggleScroll();
        }
        
    });
    
    
    body.addEventListener('click', function(e){
        var target = e.target;
        
        //зclose popup if "X" or outside the popup
        if(target.classList.contains('popup__btn-close') ||
           target.classList.contains('popup__inner')){
            var popup = closestItemByClass(target, 'popup');  
            
            closePopup(popup);
            toggleScroll();
        }
        
    })
    
    
    //close popup if "esc"
    body.addEventListener('keydown', function(e){ //событие при нажатии клавиши
        if(e.keyCode !==27){ //27 - esc
            return;
        }
        var popup = document.querySelector('.popup.is-active');
        
        if(popup){
            closePopup(popup);
            toggleScroll();
        }
    })
})();
