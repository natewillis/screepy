let creepLogic = require('./creeps');
let roomLogic = require('./room');
let prototypes = require('./prototypes');


module.exports.loop = function () {

    // process new user flags
    _.forEach(Game.flags, function (flag, name) {
        flag.process();
    });

    // garbage collection - flags
    _.forEach(Game.flags, function (flag, name) {
        if (!('deleteMe' in flag.memory)) flag.memory.deleteMe = true;
        if (flag.memory.deleteMe) {
            flag.remove();
        }
    });
    _.forEach(Memory.flags, function (flag, name) {
        if (!Game.flags[name]) {
            delete Memory.flags[name];
            console.log('Clearing non-existing flag memory:', name);
        }
    });
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}