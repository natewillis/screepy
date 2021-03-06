/* This header is placed at the beginning of the output file and defines the
	special `__require`, `__getFilename`, and `__getDirname` functions.
*/
(function() {
	/* __modules is an Array of functions; each function is a module added
		to the project */
var __modules = {},
	/* __modulesCache is an Array of cached modules, much like
		`require.cache`.  Once a module is executed, it is cached. */
	__modulesCache = {},
	/* __moduleIsCached - an Array of booleans, `true` if module is cached. */
	__moduleIsCached = {};
/* If the module with the specified `uid` is cached, return it;
	otherwise, execute and cache it first. */
function __require(uid, parentUid) {
	if(!__moduleIsCached[uid]) {
		// Populate the cache initially with an empty `exports` Object
		__modulesCache[uid] = {"exports": {}, "loaded": false};
		__moduleIsCached[uid] = true;
		if(uid === 0 && typeof require === "function") {
			require.main = __modulesCache[0];
		} else {
			__modulesCache[uid].parent = __modulesCache[parentUid];
		}
		/* Note: if this module requires itself, or if its depenedencies
			require it, they will only see an empty Object for now */
		// Now load the module
		__modules[uid].call(this, __modulesCache[uid], __modulesCache[uid].exports);
		__modulesCache[uid].loaded = true;
	}
	return __modulesCache[uid].exports;
}
/* This function is the replacement for all `__filename` references within a
	project file.  The idea is to return the correct `__filename` as if the
	file was not concatenated at all.  Therefore, we should return the
	filename relative to the output file's path.

	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getFilename(path) {
	return require("path").resolve(__dirname + "/" + path);
}
/* Same deal as __getFilename.
	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getDirname(path) {
	return require("path").resolve(__dirname + "/" + path + "/../");
}
/********** End of header **********/
/********** Start module 0: C:\Users\natew\WebstormProjects\screepy\src\main.js **********/
__modules[0] = function(module, exports) {
let utilities = __require(1,0);
let prototypes = __require(2,0);
let memory = __require(3,0);
let tasks = __require(4,0);

module.exports.loop = function () {
    memory.snapshot();
    tasks.execute_tasks();

}
return module.exports;
}
/********** End of module 0: C:\Users\natew\WebstormProjects\screepy\src\main.js **********/
/********** Start module 1: C:\Users\natew\WebstormProjects\screepy\src\utilities.js **********/
__modules[1] = function(module, exports) {
let utilities = {
    universal_id: function (game_object) {
        if ('structureType' in game_object) {
            return game_object.structureType+'-'+game_object.pos.roomName+'-'+game_object.pos.x+'-'+game_object.pos.y;
        } else if ('name' in game_object) {
            return game_object.name;
        } else {
            return game_object.id;
        }
    },
    get_object_by_universal_id: function(universal_id) {

        let returnMatch = universal_id.match(/([a-z]+)-([WE]\d+[NE]\d+)-(\d+)-(\d+)/);
        if (returnMatch) {
            console.log('found a structure regex of ' + returnMatch)
            console.log('room of ' + returnMatch[2] + ' and x of ' + returnMatch[3] + ' and y of ' + returnMatch[4])
            let roomPos = new RoomPosition(parseInt(returnMatch[3]), parseInt(returnMatch[4]), returnMatch[2]);
            console.log(roomPos)
            let structureType = returnMatch[1];
            console.log('found a type of ' + structureType)
            const structuresAtRoomPos = roomPos.lookFor(LOOK_STRUCTURES);
            console.log('found structures at position ' + roomPos + ' of ' + structuresAtRoomPos)
            let returnStruct = _.find(structuresAtRoomPos, function(structure) {return structure.structureType == structureType})
            console.log('found a structure of the right type in ' + returnStruct)
            if (returnStruct) {
                return returnStruct
            } else {
                return undefined
            }

        } else if (universal_id.length == 32) {
            return Game.creeps[universal_id]
        } else {
            console.log('we didnt find any matches for ' + universal_id)
            return Game.getObjectById(universal_id)
        }

    },
}
module.exports = utilities
return module.exports;
}
/********** End of module 1: C:\Users\natew\WebstormProjects\screepy\src\utilities.js **********/
/********** Start module 2: C:\Users\natew\WebstormProjects\screepy\src\prototypes\index.js **********/
__modules[2] = function(module, exports) {
let files = {
    creep: __require(5,2),
    spawn: __require(6,2),
}
return module.exports;
}
/********** End of module 2: C:\Users\natew\WebstormProjects\screepy\src\prototypes\index.js **********/
/********** Start module 3: C:\Users\natew\WebstormProjects\screepy\src\memory.js **********/
__modules[3] = function(module, exports) {
let utilities = __require(1,3);
let roomPosSnapshot = function (pos) {
    return {x: pos.x, y: pos.y, room_name: pos.roomName};
};
let storeSnapshot = function (store) {
    return {
        capacity: {
            energy: store.getCapacity(RESOURCE_ENERGY),
        },
        free_capacity: {
            energy: store.getFreeCapacity(RESOURCE_ENERGY),
        },
        used_capacity: {
            energy: store.getUsedCapacity(RESOURCE_ENERGY),
        }
    };
};
let spawningSnapshot = function (spawning) {
    return {
        directions: spawning.directions,
        creep_name: spawning.name,
        time_needed_to_complete: spawning.needTime,
        remaining_time_to_go: spawning.remainingTime,
        spawn_id: spawning.spawn.id,
    };
};
let reservationSnapshot = function (reservation) {
    if ('username' in reservation) {
        return {username: reservation.username, ticks_to_end: reservation.ticksToEnd};
    } else {
        return null
    }
};
let signSnapshot = function (sign) {
    return {username: sign.username, text: sign.text, time: sign.time, datetime: sign.datetime};
};
let generic_snapshot = function (generic_obj, code_type) {
    let snapshot = {
        code_type: code_type,
    };
    if ('id' in generic_obj) {
        snapshot['id'] = generic_obj.id;
    }
    snapshot['universal_id'] = utilities.universal_id(generic_obj);
    if ('pos' in generic_obj) {
        snapshot['pos'] = roomPosSnapshot(generic_obj.pos);
    }
    if ('hits' in generic_obj) {
        snapshot['hits'] = generic_obj.hits;
    }
    if ('hitsMax' in generic_obj) {
        snapshot['hits_max'] = generic_obj.hitsMax;
    }
    if ('room' in generic_obj) {
        snapshot['room_name'] = generic_obj.room.name;
    }
    if ('structureType' in generic_obj) {
        snapshot['structure_type'] = generic_obj.structureType;
    }
    if ('owner' in generic_obj) {
        if (!(typeof generic_obj.owner === 'undefined')) {
            snapshot['owner'] = generic_obj.owner.username;
        }
    }
    if ('memory' in generic_obj) {
        snapshot['memory'] = generic_obj.memory;
    }
    if ('name' in generic_obj) {
        snapshot['name'] = generic_obj.name;
    }
    if ('fatigue' in generic_obj) {
        snapshot['fatigue'] = generic_obj.fatigue;
    }
    if ('saying' in generic_obj) {
        snapshot['saying'] = generic_obj.saying;
    }
    if ('spawning' in generic_obj) {
        if ('structureType' in generic_obj) {
            if (!(generic_obj.spawning == undefined)) {
                snapshot['what_am_i_spawning'] = spawningSnapshot(generic_obj.spawning);
            }
        } else {
            snapshot['am_i_spawning'] = generic_obj.spawning;
        }
    }
    if ('store' in generic_obj) {
        snapshot['store'] = storeSnapshot(generic_obj.store);
    }
    if ('ticksToLive' in generic_obj) {
        snapshot['ticks_to_live'] = generic_obj.ticksToLive;
    }
    if ('color' in generic_obj) {
        snapshot['color'] = generic_obj.color;
    }
    if ('secondaryColor' in generic_obj) {
        snapshot['secondary_color'] = generic_obj.secondaryColor;
    }
    if ('level' in generic_obj) {
        snapshot['level'] = generic_obj.level;
    }
    if ('progress' in generic_obj) {
        snapshot['progress'] = generic_obj.progress;
    }
    if ('progressTotal' in generic_obj) {
        snapshot['progress_total'] = generic_obj.progressTotal;
    }
    if ('reservation' in generic_obj) {
        if (!(generic_obj.reservation == undefined)) {
            snapshot['reservation'] = reservationSnapshot(generic_obj.reservation);
        }
    }
    if ('safeMode' in generic_obj) {
        snapshot['safe_mode_ticks_remaining'] = generic_obj.safeMode;
    }
    if ('safeModeAvailable' in generic_obj) {
        snapshot['safe_mode_activations_available'] = generic_obj.safeModeAvailable;
    }
    if ('safeModeCooldown' in generic_obj) {
        snapshot['safe_mode_cooldown_ticks_remaining'] = generic_obj.safeModeCooldown;
    }
    if ('ticksToDowngrade' in generic_obj) {
        snapshot['ticks_to_downgrade'] = generic_obj.ticksToDowngrade;
    }
    if ('sign' in generic_obj) {
        if (!(generic_obj.sign == undefined)) {
            snapshot['sign'] = signSnapshot(generic_obj.sign);
        }
    }
    if ('upgradeBlocked' in generic_obj) {
        snapshot['upgrade_blocked_ticks'] = generic_obj.upgradeBlocked;
    }
    if ('energyCapacity' in generic_obj) {
        snapshot['energy_capacity'] = generic_obj.energyCapacity;
    }
    if ('energy' in generic_obj) {
        snapshot['energy'] = generic_obj.energy;
    }
    if ('ticksToRegeneration' in generic_obj) {
        snapshot['ticks_to_regeneration'] = generic_obj.ticksToRegeneration;
    }
    if ('body' in generic_obj) {
        snapshot['detailed_body'] = generic_obj.body;
    }
    return snapshot;

}
let memory = {
    snapshot: function () {
        Memory.snapshot = {
            game_time: Game.time,
            tick_limit: Game.cpu.tickLimit,
            bucket: Game.cpu.bucket,
            cpu_per_tick: Game.cpu.limit,
            objects: {},
        };
        _.forEach(Game.rooms, function (room, name) {
            _.forEach(room.find(FIND_STRUCTURES), function (structure) {
                Memory.snapshot.objects[utilities.universal_id(structure)] = generic_snapshot(structure, 'structure');
            });
            _.forEach(room.find(FIND_CREEPS), function (creep) {
                Memory.snapshot.objects[utilities.universal_id(creep)] = generic_snapshot(creep, 'creep');
            });
            _.forEach(room.find(FIND_SOURCES), function (source) {
                Memory.snapshot.objects[utilities.universal_id(source)] = generic_snapshot(source, 'source');
            });
            _.forEach(Game.flags, function (flag) {
                Memory.snapshot.objects[utilities.universal_id(flag)] = generic_snapshot(flag, 'flag');
            });

        });

    },

};

module.exports = memory;
return module.exports;
}
/********** End of module 3: C:\Users\natew\WebstormProjects\screepy\src\memory.js **********/
/********** Start module 4: C:\Users\natew\WebstormProjects\screepy\src\tasks.js **********/
__modules[4] = function(module, exports) {
let utilities = __require(1,4);
let task_logic = {
    execute_tasks: function () {
        if (!('tasks' in Memory)) {
            Memory['tasks'] = {};
        }
        if (!(Game.time in Memory.tasks)) {
            console.log('No tasks for tick ' + Game.time);
            return;
        } else {
            console.log('tasks for ' + Game.time);
        }
        let tasks = Memory.tasks[Game.time];
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

module.exports = task_logic;
return module.exports;
}
/********** End of module 4: C:\Users\natew\WebstormProjects\screepy\src\tasks.js **********/
/********** Start module 5: C:\Users\natew\WebstormProjects\screepy\src\prototypes\creep.js **********/
__modules[5] = function(module, exports) {
let utilities = __require(1,5);

Creep.prototype.execute_task = function (task) {
    let creep = this;
    console.log('creep ' + creep.name + ' is performing task of type ' + task.type + ' on tick ' + task.tick)
    if ('console_output' in task) {
        console.log(task.console_output)
    }
    task.received = true;
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
return module.exports;
}
/********** End of module 5: C:\Users\natew\WebstormProjects\screepy\src\prototypes\creep.js **********/
/********** Start module 6: C:\Users\natew\WebstormProjects\screepy\src\prototypes\spawn.js **********/
__modules[6] = function(module, exports) {
Spawn.prototype.execute_task = function (task) {
    spawn = this;
    task.received = true;

    console.log(task);
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
return module.exports;
}
/********** End of module 6: C:\Users\natew\WebstormProjects\screepy\src\prototypes\spawn.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/
