document.addEventListener('DOMContentLoaded', () => {
    function setVarVH() {
        var vh = window.innerHeight;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    setVarVH();
    window.addEventListener('resize', setVarVH);
    window.addEventListener('orientationchange', setVarVH);
});
