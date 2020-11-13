let utilities = require('./utilities');
let task_logic = {
    execute_tasks: function () {

        // verify tasks variable exists
        if (!('tasks' in Memory)) {
            Memory['tasks'] = {};
        }

        // check if theres a task queue for this tick
        if (!(Game.time in Memory.tasks)) {
            console.log('No tasks for tick ' + Game.time);
            return;
        } else {
            console.log('tasks for ' + Game.time);
        }

        // load the queues in to a variable
        let tasks = Memory.tasks[Game.time];

        // loop through rooms I can see and run tasks for everything
        _.forEach(Game.rooms, function (room) {
            _.forEach(room.find(FIND_STRUCTURES), function (structure) {
                if ('execute_task' in structure) {
                    if (utilities.universal_id(structure) in tasks) {
                        _.forEach(tasks[utilities.universal_id(structure)], function(task) {
                            structure.execute_task(task);
                        });
                    }
                }
            });
            _.forEach(room.find(FIND_CREEPS), function (creep) {
                if ('execute_task' in creep) {
                    if (utilities.universal_id(creep) in tasks) {
                        _.forEach(tasks[utilities.universal_id(creep)], function(task) {
                            creep.execute_task(task);
                        });
                    }
                }
            });
        });
    },
};


// export the module scope functions

module.exports = task_logic;