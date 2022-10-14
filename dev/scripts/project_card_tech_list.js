// Toggle between icons and text for the tech-used lists on project cards

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tech-icon-strip').forEach(ele => {
        ele.addEventListener('click', () => {
            toggleTechListMode();
        });
    });
});

function toggleTechListMode(){
    document.querySelectorAll('.as-text').forEach(ele => {
        toggleVisuallyHidden(ele);
    });
    
    document.querySelectorAll('.as-icons').forEach(ele => {
        toggleVisuallyHidden(ele);
    });
}

function toggleVisuallyHidden(ele){
    const CSS_CLASS = 'visually-hidden';

    if(ele.classList.contains(CSS_CLASS)){
        ele.classList.remove(CSS_CLASS);
    }
    else{
        ele.classList.add(CSS_CLASS);
    } 
}

