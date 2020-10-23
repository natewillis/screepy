// these functions wont be directly called because I dont include them in the module scope

// these snapshot functions are used int the generic structure snapshot
let roomPosSnapshot = function (pos) {
    return {x: pos.x, y: pos.y, roomName: pos.roomName};
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
    return {username: reservation.username, ticks_to_end: reservation.ticksToEnd};
};
let signSnapshot = function (sign) {
    return {username: sign.username, text: sign.text, time: sign.time, datetime: sign.datetime};
};

// generic snapshot for all objects not named above
let generic_snapshot = function (generic_obj, code_type) {

    // init snapshot
    let snapshot = {
        code_type: code_type,
    };

    // id
    if (generic_obj.hasOwnProperty('id')) {
        snapshot['id'] = generic_obj.id;
    }

    // room position
    if (generic_obj.hasOwnProperty('pos')) {
        snapshot['pos'] = roomPosSnapshot(generic_obj.pos);
    }

    // hits
    if (generic_obj.hasOwnProperty('hits')) {
        snapshot['hits'] = generic_obj.hits;
    }

    // hits_max
    if (generic_obj.hasOwnProperty('hitsMax')) {
        snapshot['hits_max'] = generic_obj.hitsMax;
    }

    // room_name
    if (generic_obj.hasOwnProperty('room')) {
        snapshot['room_name'] = generic_obj.room.name;
    }

    // structure_type
    if (generic_obj.hasOwnProperty('structureType')) {
        snapshot['structure_type'] = generic_obj.structureType;
    }

    // owner
    if (generic_obj.hasOwnProperty('owner')) {
        snapshot['owner'] = generic_obj.owner.username;
    }

    // memory
    if (generic_obj.hasOwnProperty('memory')) {
        snapshot['memory'] = generic_obj.memory;
    }

    // name
    if (generic_obj.hasOwnProperty('name')) {
        snapshot['name'] = generic_obj.name;
    }

    // fatigue
    if (generic_obj.hasOwnProperty('fatigue')) {
        snapshot['fatigue'] = generic_obj.fatigue;
    }

    // saying
    if (generic_obj.hasOwnProperty('saying')) {
        snapshot['saying'] = generic_obj.saying;
    }

    // am_i_spawning and what_am_i_spawning
    if (generic_obj.hasOwnProperty('spawning')) {
        if (generic_obj.hasOwnProperty('structureType')) {
            snapshot['what_am_i_spawning'] = spawningSnapshot(generic_obj.spawning);
        } else {
            snapshot['am_i_spawning'] = generic_obj.spawning;
        }
    }

    // store
    if (generic_obj.hasOwnProperty('store')) {
        snapshot['store'] = storeSnapshot(generic_obj.store);
    }

    // ticks_to_live
    if (generic_obj.hasOwnProperty('ticks_to_live')) {
        snapshot['ticks_to_live'] = generic_obj.ticks_to_live;
    }

    // color
    if (generic_obj.hasOwnProperty('color')) {
        snapshot['color'] = generic_obj.color;
    }

    // secondary_color
    if (generic_obj.hasOwnProperty('secondaryColor')) {
        snapshot['secondary_color'] = generic_obj.secondaryColor;
    }

    // level
    if (generic_obj.hasOwnProperty('level')) {
        snapshot['level'] = generic_obj.level;
    }

    // progress
    if (generic_obj.hasOwnProperty('progress')) {
        snapshot['progress'] = generic_obj.progress;
    }

    // progress_total
    if (generic_obj.hasOwnProperty('progressTotal')) {
        snapshot['progress_total'] = generic_obj.progressTotal;
    }

    // reservation
    if (generic_obj.hasOwnProperty('reservation')) {
        snapshot['reservation'] = reservationSnapshot(generic_obj.reservation);
    }

    // safe_mode_ticks_remaining
    if (generic_obj.hasOwnProperty('safeMode')) {
        snapshot['safe_mode_ticks_remaining'] = generic_obj.safeMode;
    }

    // safe_mode_activations_available
    if (generic_obj.hasOwnProperty('safeModeAvailable')) {
        snapshot['safe_mode_activations_available'] = generic_obj.safeModeAvailable;
    }

    // safe_mode_cooldown_ticks_remaining
    if (generic_obj.hasOwnProperty('safeModeCooldown')) {
        snapshot['safe_mode_cooldown_ticks_remaining'] = generic_obj.safeModeCooldown;
    }

    // ticks_to_downgrade
    if (generic_obj.hasOwnProperty('ticksToDowngrade')) {
        snapshot['ticks_to_downgrade'] = generic_obj.ticksToDowngrade;
    }

    // sign
    if (generic_obj.hasOwnProperty('sign')) {
        snapshot['sign'] = signSnapshot(generic_obj.sign);
    }

    // upgrade_blocked_ticks
    if (generic_obj.hasOwnProperty('upgradeBlocked')) {
        snapshot['upgrade_blocked_ticks'] = generic_obj.upgradeBlocked;
    }

    // return finished dict
    return snapshot;

}

// the module scope functions (prototypes are in global scope)
let memory = {
    snapshot: function () {

        // re-initialize snapshot
        Memory.snapshot = {
            game_time: Game.time,
            tick_limit: Game.cpu.tickLimit,
            bucket: Game.cpu.bucket,
            cpu_per_tick: Game.cpu.limit,
            objects: {},
        };

        // terrain can be grabbed from screepsapi
        // loop through rooms I can see
        _.forEach(Game.rooms, function (room, name) {

            // structures
            _.forEach(room.find(FIND_STRUCTURES), function (structure) {
                Memory.snapshot.objects[structure.id] = generic_snapshot(structure, 'structure');
            });

            // creeps
            _.forEach(room.find(FIND_CREEPS), function (creep) {
                Memory.snapshot.objects[creep.id] = generic_snapshot(creep, 'creep');
            });

            // sources
            _.forEach(room.find(FIND_SOURCES), function (source) {
                Memory.snapshot.objects[source.id] = generic_snapshot(source, 'source');
            });

            // flags
            _.forEach(Game.flags, function (flag) {
                Memory.snapshot.objects[source.id] = generic_snapshot(source, 'flag');
            });

        });

    },

};

module.exports = memory;