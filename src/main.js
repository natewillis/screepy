let prototypes = require('./prototypes');
let memory = require('./memory');
let tasks = require('./tasks');

module.exports.loop = function () {

    // update the memory
    memory.snapshot();

    // execute tasks
    tasks.execute_tasks();

}