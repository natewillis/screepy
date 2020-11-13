Spawn.prototype.execute_task = function (task) {

    // copy instance for lodash purposes
    spawn = this;

    // let the task know it was assigned to a creep
    task.received = true;

    console.log(task);

    // spawn action
    if (task.type == 'spawnCreep') {
        console.log('spawn is producing creep on tick ' + task.tick);
        task.execution_output = 'creating body ' + task.details.body + ' with energy ' + spawn.store.getUsedCapacity(RESOURCE_ENERGY);
        task.executed_return_value = spawn.spawnCreep(task.details.body, task.details.name);
    } else if (task.type == 'wait') {
        console.log('spawn is waiting')
        task.executed_return_value = 99;
    } else {
        console.log('spawn is executing unknown task');
        task.executed_return_value = 99;
    }

}