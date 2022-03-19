const eventEmitter = require('events');
const channel = new eventEmitter();

// addEventListener analog
void channel.on('alarm', e => console.log(`Произошло ${e.message}!`));
// dispatchEvent analog
channel.emit('alarm', { message: 'Новое Событие' });
