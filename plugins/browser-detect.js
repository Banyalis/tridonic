export default (context, inject) => {
    const isEdge = /Edge\/\d./i.test(navigator.userAgent);
    const isFirefox = navigator.userAgent.includes('Firefox');
    inject('isEdge', isEdge);
    inject('isFirefox', isFirefox);
    inject('isBrowsersDefined', true);
};
