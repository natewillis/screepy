let utilities = require('../utilities');

Creep.prototype.execute_task = function (task) {

    // copy instance for lodash purposes
    let creep = this;

    // logging
    console.log('creep ' + creep.name + ' is performing task of type ' + task.type + ' on tick ' + task.tick)
    if ('console_output' in task) {
        console.log(task.console_output)
    }

    // let the task know it was assigned to a creep
    task.received = true;

    // spawn action
    if (task.type == 'move') {
        task.executed_return_value = creep.move(task.details.direction);
    } else if (task.type == 'pickup') {
        task.executed_return_value = creep.pickup(utilities.get_object_by_universal_id(task.details.target));
    } else if (task.type == 'harvest') {
        task.executed_return_value = creep.harvest(utilities.get_object_by_universal_id(task.details.target));
    } else if (task.type == 'transfer') {
        if ('amount' in task.details) {
            task.executed_return_value = creep.transfer(utilities.get_object_by_universal_id(task.details.target), task.details.resource_type, task.details.amount);
        } else {
            task.executed_return_value = creep.transfer(utilities.get_object_by_universal_id(task.details.target), task.details.resource_type);
        }
    } else if (task.type == 'withdraw') {
        if ('amount' in task.details) {
            task.executed_return_value = creep.withdraw(utilities.get_object_by_universal_id(task.details.target), task.details.resource_type, task.details.amount);
        } else {
            task.executed_return_value = creep.withdraw(utilities.get_object_by_universal_id(task.details.target), task.details.resource_type);
        }
    } else if (task.type == 'upgrade_controller') {
        task.executed_return_value = creep.upgrade_controller(utilities.get_object_by_universal_id(task.details.target));
    } else {
        task.executed_return_value = 99;
    }

}

Creep.prototype.universal_id = function () {
    return this.name;
}