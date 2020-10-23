Creep.prototype.execute_task = function (task) {

    // copy instance for lodash purposes
    let creep = this;

    // let the task know it was assigned to a creep
    task.received = true;

    // spawn action
    if (task.type == 'move') {
        task.executed_return_value = creep.move(task.details.direction);
    } else if (task.type == 'pickup') {
        task.executed_return_value = creep.pickup(task.details.target);
    } else if (task.type == 'harvest') {
        task.executed_return_value = creep.harvest(task.details.target);
    } else if (task.type == 'transfer') {
        if ('amount' in task.details) {
            task.executed_return_value = creep.transfer(task.details.target, task.details.resource_type, task.details.amount);
        } else {
            task.executed_return_value = creep.transfer(task.details.target, task.details.resource_type);
        }
    } else if (task.type == 'withdraw') {
        if ('amount' in task.details) {
            task.executed_return_value = creep.withdraw(task.details.target, task.details.resource_type, task.details.amount);
        } else {
            task.executed_return_value = creep.withdraw(task.details.target, task.details.resource_type);
        }
    } else if (task.type == 'upgrade_controller') {
        task.executed_return_value = creep.upgrade_controller(task.details.target);
    } else {
        task.executed_return_value = 99;
    }

}