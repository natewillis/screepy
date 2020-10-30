Spawn.prototype.execute_task = function (task) {

    // copy instance for lodash purposes
    spawn = this;

    // let the task know it was assigned to a creep
    task.received = true;

    console.log(task);

    // spawn action
    if (task.type == 'spawnCreep') {
        console.log('spawn is producing creep on tick ' + task.tick);
        task.executed_return_value = spawn.spawnCreep(task.details.body, task.details.name);
    } else {
        console.log('spawn is executing unknown task');
        task.executed_return_value = 99;
    }

}