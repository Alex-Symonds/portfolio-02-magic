//  > Menu opens when:
//      > User focuses on the menu icon (via keyboard or click) while the menu is closed
//  > Menu closes when:
//      > User focuses on any element outside of the menu
//      > User clicks on any element outside of the menu 
//          >> except the menu icon sometimes needs a second click (see bottom for details)

// Note: this code makes a point of avoiding use of e.stopPropagation() to prevent blocking
// anything else from taking an interest in menu icon events.

const CSS_CLASS_VISUALLY_HIDDEN = 'visually-hidden';

document.addEventListener('DOMContentLoaded', () => {
    let menu = {
        ele: document.querySelector('.menu-items-container'),
        opener: document.querySelector('.menu-icon'),
        lockedOpen: false,
        lockOnNextClick: false,

        open: () => {
            menu.ele.classList.remove(CSS_CLASS_VISUALLY_HIDDEN);
            document.addEventListener('click', menu.closeOnInteractionOutside);
            document.addEventListener('focusin', menu.closeOnInteractionOutside);
            menu.lockedOpen = true;
        },
        close: () => {
            menu.ele.classList.add(CSS_CLASS_VISUALLY_HIDDEN);
            document.removeEventListener('click', menu.closeOnInteractionOutside);
            document.removeEventListener('focusin', menu.closeOnInteractionOutside);
            menu.lockedOpen = false;
            menu.lockOnNextClick = false;
        },
        closeOnInteractionOutside: (e) => {
            // If this event was involved in opening the menu, prevent it from closing the menu
            // even if it IS outside.
            // This allows the menu to stay open for a useful amount of time.
            if(menu.lockedOpen && e.composedPath().includes(menu.opener)){
                menu.lockedOpen = false;
                return;
            }
            closeOnInteractionOutside(e, menu.ele, menu.close);
        },
        handleOpenerClick: () => {
            // Case: user wants to open menu, but "sibling" focusin event somehow failed to cause menu.open().
            if(!menu.isOpen()){
                menu.open();
            }
            // Case: user wants to open menu and "sibling" focusin has successfully caused menu.open() and set the flag.
            else if(menu.lockOnNextClick){
                menu.lockedOpen = true;
                menu.lockOnNextClick = false;
            }
            // Case: user wants to close menu.
            else{
                // "Tidy up" in ways appreciated by mouse/touch users, but not keyboard users.
                document.activeElement.blur();
            } 
        },
        handleOpenerFocus: () => {
            if(!menu.isOpen()){
                menu.open();

                // If the user focused via click, there's a "sibling" click event coming up next, which will 
                // prematurely close the menu we just opened. To prevent this, set a flag asking the click 
                // handler to lock the menu.
                menu.lockOnNextClick = true;
            }
        },
        isOpen: () => {
            return !menu.ele.classList.contains(CSS_CLASS_VISUALLY_HIDDEN);
        },
        setEventListeners: function(){
            menu.opener.addEventListener('focusin', () => {
                menu.handleOpenerFocus();
            });
            menu.opener.addEventListener('click', () => {
                menu.handleOpenerClick();
            });
        }
    }

    menu.setEventListeners();
});


// Run closeFunction if a click occurred outside the target element
function closeOnInteractionOutside(e, target_element, closeFunction){
    let clickWasInside = e.composedPath().includes(target_element);
    if(!clickWasInside) closeFunction();
}

/* 
--------------------------------------------------------------------------------------------
Explanation: why menu toggle sometimes needs two clicks
--------------------------------------------------------------------------------------------
Background:
The menu icon is outside of the menu, so clicking/focusing it will run openMenu() at the icon, 
bubble up to document, then closeMenu() via closeOnInteractionOutside(). Result = menu that can't 
be opened.

To prevent this -- without using e.stopPropagation() -- event handlers on the icon set a lock when 
they're opening the menu. menu.closeOnInteractionOutside() responds to a lock by unlocking it, but 
leaving the menu open. Result = functioning menu.

This solution requires the handlers on the menu icon to be able to tell when they're opening the 
menu. This is simple for the focusin handler: it checks the current open status of the menu and 
assumes it's supposed to reverse it. It's not so easy for the click handler. Clicking on the menu 
icon, ofc, causes both a focusin event and a click event, with the focusin event handled first. 
Since the focusin handler runs openMenu(), the click handler will see an already open menu in both 
cases.

To resolve this the focusin handler sets a "lockOnNextClick" flag when it opens the menu, so then
the click handler can use the flag to determine when it needs to set a lock.

This (mostly) results in the intended behaviour.

Problem:
The menu will fail to close under this specific set of circumstances:
    > User opened the menu with a keyboard
    > User subsequently tries to close the menu with a mouse/touch click on the menu icon

Oopening the menu with a keyboard means the focusin handler sets the flag, but there's no click 
event, so the "lockOnNextClick" flag remains set to true.

A subsequent click on the menu icon will respond to the lingering true flag by locking the menu, 
preventing it from closing. Clicking a second time will work correctly, since the flag has now 
been consumed.

Reasons it's not fixed:
    >> Most users will stick to one input method rather than switching
    >> Of those who switch inputs, those who click anywhere else outside the menu will be fine
       (only clicks on the menu icon consult the flag)
    >> For those who switch inputs AND like toggles, clicking a second time is a pretty low-effort 
       workaround

Ideas for fixing it:
    >> Timer on the flag to reset it after $TIME passes
    >> Get rid of locks, instead put a timer on the menu such that it ignores all attempts to close it 
       within $TIME of opening.
    
    The challenge here being to balance enough time for slow computers vs. not blocking fast users 
    with fast computers.
*/