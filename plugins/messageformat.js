import MessageFormat from 'messageformat';

export default (context, inject) => {
    inject('messageFormat', new MessageFormat());
};
