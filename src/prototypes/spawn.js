Spawn.prototype.execute_task = function (task) {

    // copy instance for lodash purposes
    spawn = this;

    // let the task know it was assigned to a creep
    task.received = true;

    // spawn action
    if (task.type == 'spawnCreep') {
        task.executed_return_value = spawn.spawnCreep(task.details.body, task.details.name);
    } else {
        task.executed_return_value = 99;
    }

}