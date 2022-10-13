//  > Menu opens when:
//      > User clicks on the menu icon while the menu is closed
//  > Menu closes when:
//      > User clicks on any element outside of the menu 

// Note: this code makes a point of avoiding use of e.stopPropagation() to prevent blocking
// anything else from taking an interest in menu icon events.

// ---
// Run closeFunction if a click occurred outside the target element
function closeOnClickOutside(e, target_element, closeFunction){
    let clickWasInside = e.composedPath().includes(target_element);
    if(!clickWasInside) closeFunction();
}

document.addEventListener('DOMContentLoaded', () => {

    let menu = {
        ele: document.querySelector('.menu-items-container'),
        opener: document.querySelector('.menu-icon'),
        lockedOpen: false,
        selectedId: -1,

        open: () => {
            menu.ele.hidden = false;
            menu.ele.addEventListener('keydown', menu.handleKeydown);
            
            menu.ele.querySelector(':not(\[disabled])').focus();
            menu.selectedId = 0;

            menu.opener.setAttribute('aria-expanded', true);
            document.addEventListener('click', menu.closeOnClickOutside);
        },
        close: () => {
            menu.ele.hidden = true;
            menu.ele.removeEventListener('keydown', menu.handleKeydown);
            
            menu.opener.focus();
            menu.selectedId = -1;

            menu.opener.setAttribute('aria-expanded', false);
            document.removeEventListener('click', menu.closeOnClickOutside);
            menu.lockedOpen = false;
        },
        closeOnClickOutside: (e) => {
            // If this click was involved in opening the menu, prevent it from closing the menu now
            // even if it IS outside. This allows the menu to stay open for a useful amount of time.
            if(menu.lockedOpen && e.composedPath().includes(menu.opener)){
                menu.lockedOpen = false;
                return;
            }
            closeOnClickOutside(e, menu.ele, menu.close);
        },
        handleKeydown: (e) => {
            // Tab and escape
            if(e.keyCode === 9 || e.keyCode === 27) {
                menu.close();
            }
            // Enter and space
            else if(e.keyCode === 13 || e.keyCode === 32){
                e.preventDefault(); // Prevent the enter from "clicking" the icon and reopening the menu
                document.activeElement.getElementsByTagName('a')[0].click();
                menu.close();
            }
            // Up/down arrows
            else if(e.keyCode === 38 || e.keyCode === 40){
                e.preventDefault(); // Prevent the website from scrolling distractingly in the background

                var menuLis = menu.ele.getElementsByTagName('li');
                var lastLiIndex = menuLis.length - 1;

                // Up arrow
                if(e.keyCode === 38) {  
                    menu.selectedId--;
                    if(menu.selectedId < 0){
                        menu.selectedId = lastLiIndex;
                    }
                }
                // Down arrow
                else if(e.keyCode === 40) {
                    menu.selectedId++;
                    if(menu.selectedId > lastLiIndex){
                        menu.selectedId = 0;
                    }
                }

                menuLis[menu.selectedId].focus();
            }
        },
        handleOpenerClick: () => {
            if(menu.ele.hidden){
                // Open menu and, instead of e.stopPropagation(), set a lock.
                // The lock will prevent the same click from closing the menu again when it bubbles to document.
                menu.open();
                menu.lockedOpen = true;
            }
        },
        setEventListeners: function(){
            menu.opener.addEventListener('click', () => {
                menu.handleOpenerClick();
            });
            menu.opener.addEventListener('keydown', (e) => {
                if(e.keyCode === 40) {
                    menu.open();
                }
            });
        }
    }

    menu.setEventListeners();
});



