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
let creepLogic = __require(1,0);
let roomLogic = __require(2,0);
let prototypes = __require(3,0);
let managerLogic = __require(4,0);

module.exports.loop = function () {
    let start = 0;
    let end = 0;
    start = Game.cpu.getUsed();
    _.forEach(Game.flags, function (flag, name) {
        flag.process();
    });
    end = Game.cpu.getUsed();
    console.log(`flag process: ${end-start} ticks`)
    start = Game.cpu.getUsed();
    let jobQueue = managerLogic.Manager.createJobQueue();
    end = Game.cpu.getUsed();
    console.log(`job queue process: ${end-start} ticks`)
    start = Game.cpu.getUsed();
    let spawnQueue = managerLogic.Manager.createSpawnQueue(jobQueue);
    end = Game.cpu.getUsed();
    console.log(`spawn queue process: ${end-start} ticks`)
    start = Game.cpu.getUsed();
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
    end = Game.cpu.getUsed();
    console.log(`garbage collection process: ${end-start} ticks`)
    start = Game.cpu.getUsed();
    _.forEach(Game.flags, function (flag, name) {
        flag.visualize();
    });
    end = Game.cpu.getUsed();
    console.log(`visualization process: ${end-start} ticks`)
}
return module.exports;
}
/********** End of module 0: C:\Users\natew\WebstormProjects\screepy\src\main.js **********/
/********** Start module 1: C:\Users\natew\WebstormProjects\screepy\src\creeps\index.js **********/
__modules[1] = function(module, exports) {
let creepLogic = {
    harvester:     __require(5,1),
    upgrader:      __require(6,1),
}

module.exports = creepLogic;
return module.exports;
}
/********** End of module 1: C:\Users\natew\WebstormProjects\screepy\src\creeps\index.js **********/
/********** Start module 2: C:\Users\natew\WebstormProjects\screepy\src\room\index.js **********/
__modules[2] = function(module, exports) {
let roomLogic = {
    spawning:     __require(7,2),
}

module.exports = roomLogic;
return module.exports;
}
/********** End of module 2: C:\Users\natew\WebstormProjects\screepy\src\room\index.js **********/
/********** Start module 3: C:\Users\natew\WebstormProjects\screepy\src\prototypes\index.js **********/
__modules[3] = function(module, exports) {
let files = {
    roomPosition: __require(8,3),
    creep: __require(9,3),
    flag: __require(10,3),
}
return module.exports;
}
/********** End of module 3: C:\Users\natew\WebstormProjects\screepy\src\prototypes\index.js **********/
/********** Start module 4: C:\Users\natew\WebstormProjects\screepy\src\manager\index.js **********/
__modules[4] = function(module, exports) {
let managerLogic = {
    Job:     __require(11,4),
    Manager: __require(12,4),
}

module.exports = managerLogic;
return module.exports;
}
/********** End of module 4: C:\Users\natew\WebstormProjects\screepy\src\manager\index.js **********/
/********** Start module 5: C:\Users\natew\WebstormProjects\screepy\src\creeps\harvester.js **********/
__modules[5] = function(module, exports) {
var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            creep.sayHello();
            
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    },
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        console.log('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 2) {
            return true;
        }
    },
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester'};
        
            return {name, body, memory};
    }
};

module.exports = harvester;
return module.exports;
}
/********** End of module 5: C:\Users\natew\WebstormProjects\screepy\src\creeps\harvester.js **********/
/********** Start module 6: C:\Users\natew\WebstormProjects\screepy\src\creeps\upgrader.js **********/
__modules[6] = function(module, exports) {
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    spawn: function(room) {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);
        console.log('Upgraders: ' + upgraders.length, room.name);

        if (upgraders.length < 2) {
            return true;
        }
    },
    spawnData: function(room) {
            let name = 'Upgrader' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'upgrader'};
        
            return {name, body, memory};
    }
};

module.exports = roleUpgrader;
return module.exports;
}
/********** End of module 6: C:\Users\natew\WebstormProjects\screepy\src\creeps\upgrader.js **********/
/********** Start module 7: C:\Users\natew\WebstormProjects\screepy\src\room\spawning.js **********/
__modules[7] = function(module, exports) {
let creepLogic = __require(1,7);
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    _.forEach(creepTypes, type => console.log(type));
    let creepTypeNeeded = _.find(creepTypes, function(type) {
        return creepLogic[type].spawn(room);
    });
    let creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room);
    console.log(room, JSON.stringify(creepSpawnData));

    if (creepSpawnData) {
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", creepTypeNeeded, result)
    }
}

module.exports = spawnCreeps;
return module.exports;
}
/********** End of module 7: C:\Users\natew\WebstormProjects\screepy\src\room\spawning.js **********/
/********** Start module 8: C:\Users\natew\WebstormProjects\screepy\src\prototypes\roomPostion.js **********/
__modules[8] = function(module, exports) {
RoomPosition.prototype.squarePosInRange = function (range) {
    let pos = this;
    let returnArray = [];
    _.range(-1 * range, range+1).forEach(function(x) {
        _.range(-1 * range, range+1).forEach(function(y) {
            returnArray.push(new RoomPosition(pos.x+x,pos.y+y,pos.roomName));
        });
    });
    return returnArray;

}
return module.exports;
}
/********** End of module 8: C:\Users\natew\WebstormProjects\screepy\src\prototypes\roomPostion.js **********/
/********** Start module 9: C:\Users\natew\WebstormProjects\screepy\src\prototypes\creep.js **********/
__modules[9] = function(module, exports) {
Creep.prototype.sayHello = function sayHello() {
    this.say("Hello", true);
}
return module.exports;
}
/********** End of module 9: C:\Users\natew\WebstormProjects\screepy\src\prototypes\creep.js **********/
/********** Start module 10: C:\Users\natew\WebstormProjects\screepy\src\prototypes\flag.js **********/
__modules[10] = function(module, exports) {
let Job = __require(11,10);

Flag.prototype.process = function () {
    let flag = this;
    if (!flag.memory.processed) flag.memory.processed = false;
    if (flag.memory.processed) {
        if (!('deleteMe' in flag.memory)) flag.memory.deleteMe = true;
        if (!flag.memory.type) flag.memory.deleteMe = true;
        if (flag.memory.deleteMe) {
            console.log('flag ' + flag.name + ' has been marked for deletion');
        }


    } else {

        console.log(`${flag.name} hasn't been processed yet!`);
        if (flag.pos.roomName in Game.rooms) {
            flag.memory.deleteMe = false;
            flag.memory.processed = true;
            let sources = flag.pos.findInRange(FIND_SOURCES,0);
            if (sources.length == 1) {
                flag.memory.type = 'source';
                flag.setColor(COLOR_YELLOW);
                source = sources[0];
                flag.memory.sourceId = source.id;
                flag.memory.harvestLocations = source.pos.squarePosInRange(1).filter(function (pos) {
                    return source.room.getTerrain().get(pos.x, pos.y) !== TERRAIN_MASK_WALL;
                });

            }
            console.log('a flag named ' + flag.name + ' and type ' + flag.memory.type + ' was added');
        } else {
            flag.memory.deleteMe = true;
            console.log('a flag named ' + flag.name + ' and type ' + flag.memory.type + ' was deleted due to visibility');

        }
    }

}

Flag.prototype.visualize = function () {
    let flag = this;
    if (flag.memory.processed) {
        if (flag.memory.type == 'source') {
            _.forEach(flag.memory.harvestLocations, function (pos) {
                new RoomVisual(pos.roomName).circle(pos.x, pos.y, {fill: '#FFFF00', stroke: '#ffff00', radius: .15, opacity: 0.5});
            });
        }
    }

}

Flag.prototype.jobs = function () {
    let flag = this;
    let jobs = [];
    if (flag.memory.processed) {
        if (flag.memory.type == 'source') {
            jobs = _.map(flag.memory.harvestLocations, function(pos) {
                return new Job('harvest',1,{
                    sourceId: flag.memory.sourceId,
                    harvestPos: pos,
                })
            })
        }
    }
    return jobs;
}
return module.exports;
}
/********** End of module 10: C:\Users\natew\WebstormProjects\screepy\src\prototypes\flag.js **********/
/********** Start module 11: C:\Users\natew\WebstormProjects\screepy\src\manager\job.js **********/
__modules[11] = function(module, exports) {
function Job(type, priority, details) {
    this.createdTime = Game.time;
    this.type = type;
    this.details = details;
    this.priority = priority;
    this.assignedScreepId = '';

}

Job.prototype.toString = function () {
    return `${this.type} task instance created at ${this.createdTime} reserved by ${this.assignedScreepId=='' ? 'Nobody' : this.assignedScreepId}`;
}

module.exports = Job;
return module.exports;
}
/********** End of module 11: C:\Users\natew\WebstormProjects\screepy\src\manager\job.js **********/
/********** Start module 12: C:\Users\natew\WebstormProjects\screepy\src\manager\manager.js **********/
__modules[12] = function(module, exports) {
let Job = __require(11,12);
let prototypes = __require(3,12);
let manager = {

    createJobQueue: function () {
        let queue = [];
        _.forEach(Game.flags, function (flag, name) {
            queue = queue.concat(flag.jobs());
        });
        queue = _.sortByOrder(queue, ['priority'], ['desc']);
        return queue;
    },

    createSpawnQueue: function (jobQueue) {
        let spawnQueue = [];
        let harvesterCount = _.filter(jobQueue, function (job) {return ((job.assignedScreepId == '') && (job.type == 'harvest'))}).length;
        spawnQueue = spawnQueue.concat(spawnQueue, _.range(0, harvesterCount).map(function (harvesterNumber) {
            return {
                parts: [MOVE, MOVE, WORK, WORK],
                priority: 10,
            }
        }));
        spawnQueue = _.sortByOrder(spawnQueue, ['priority'], ['desc']);
        return spawnQueue;


    }


}
module.exports = manager;
return module.exports;
}
/********** End of module 12: C:\Users\natew\WebstormProjects\screepy\src\manager\manager.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/
