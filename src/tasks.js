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
        }

        // load the queues in to a variable
        let tasks = Memory.tasks[Game.time];

        // loop through rooms I can see and run tasks for everything
        _.forEach(Game.rooms, function (room) {
            _.forEach(room.find(FIND_STRUCTURES), function (structure) {
                if (structure.hasOwnProperty('execute_task')) {
                    if (structure.id in tasks) {
                        structure.execute_task(tasks[structure.id]);
                    }
                }
            });
            _.forEach(room.find(FIND_CREEPS), function (creep) {
                if (creep.hasOwnProperty('execute_task')) {
                    if (creep.id in tasks) {
                        creep.execute_task(tasks[creep.id]);
                    }
                }
            });
        });
    },
};


// export the module scope functions

module.exports = task_logic;