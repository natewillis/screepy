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
    if ('username' in reservation) {
        return {username: reservation.username, ticks_to_end: reservation.ticksToEnd};
    } else {
        return null
    }
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
    if ('id' in generic_obj) {
        snapshot['id'] = generic_obj.id;
    }

    // room position
    if ('pos' in generic_obj) {
        snapshot['pos'] = roomPosSnapshot(generic_obj.pos);
    }

    // hits
    if ('hits' in generic_obj) {
        snapshot['hits'] = generic_obj.hits;
    }

    // hits_max
    if ('hitsMax' in generic_obj) {
        snapshot['hits_max'] = generic_obj.hitsMax;
    }

    // room_name
    if ('room' in generic_obj) {
        snapshot['room_name'] = generic_obj.room.name;
    }

    // structure_type
    if ('structureType' in generic_obj) {
        snapshot['structure_type'] = generic_obj.structureType;
    }

    // owner
    if ('owner' in generic_obj) {
        if (!('owner' == undefined)) {
            snapshot['owner'] = generic_obj.owner.username;
        }
    }

    // memory
    if ('memory' in generic_obj) {
        snapshot['memory'] = generic_obj.memory;
    }

    // name
    if ('name' in generic_obj) {
        snapshot['name'] = generic_obj.name;
    }

    // fatigue
    if ('fatigue' in generic_obj) {
        snapshot['fatigue'] = generic_obj.fatigue;
    }

    // saying
    if ('saying' in generic_obj) {
        snapshot['saying'] = generic_obj.saying;
    }

    // am_i_spawning and what_am_i_spawning
    if ('spawning' in generic_obj) {
        if ('structureType' in generic_obj) {
            if (!(generic_obj.spawning == undefined)) {
                snapshot['what_am_i_spawning'] = spawningSnapshot(generic_obj.spawning);
            }
        } else {
            snapshot['am_i_spawning'] = generic_obj.spawning;
        }
    }

    // store
    if ('store' in generic_obj) {
        snapshot['store'] = storeSnapshot(generic_obj.store);
    }

    // ticks_to_live
    if ('ticks_to_live' in generic_obj) {
        snapshot['ticks_to_live'] = generic_obj.ticks_to_live;
    }

    // color
    if ('color' in generic_obj) {
        snapshot['color'] = generic_obj.color;
    }

    // secondary_color
    if ('secondaryColor' in generic_obj) {
        snapshot['secondary_color'] = generic_obj.secondaryColor;
    }

    // level
    if ('level' in generic_obj) {
        snapshot['level'] = generic_obj.level;
    }

    // progress
    if ('progress' in generic_obj) {
        snapshot['progress'] = generic_obj.progress;
    }

    // progress_total
    if ('progressTotal' in generic_obj) {
        snapshot['progress_total'] = generic_obj.progressTotal;
    }

    // reservation
    if ('reservation' in generic_obj) {
        if (!(generic_obj.reservation == undefined)) {
            snapshot['reservation'] = reservationSnapshot(generic_obj.reservation);
        }
    }

    // safe_mode_ticks_remaining
    if ('safeMode' in generic_obj) {
        snapshot['safe_mode_ticks_remaining'] = generic_obj.safeMode;
    }

    // safe_mode_activations_available
    if ('safeModeAvailable' in generic_obj) {
        snapshot['safe_mode_activations_available'] = generic_obj.safeModeAvailable;
    }

    // safe_mode_cooldown_ticks_remaining
    if ('safeModeCooldown' in generic_obj) {
        snapshot['safe_mode_cooldown_ticks_remaining'] = generic_obj.safeModeCooldown;
    }

    // ticks_to_downgrade
    if ('ticksToDowngrade' in generic_obj) {
        snapshot['ticks_to_downgrade'] = generic_obj.ticksToDowngrade;
    }

    // sign
    if ('sign' in generic_obj) {
        if (!(generic_obj.sign == undefined)) {
            snapshot['sign'] = signSnapshot(generic_obj.sign);
        }
    }

    // upgrade_blocked_ticks
    if ('upgradeBlocked' in generic_obj) {
        snapshot['upgrade_blocked_ticks'] = generic_obj.upgradeBlocked;
    }

    // energy_capacity
    if ('energyCapacity' in generic_obj) {
        snapshot['energy_capacity'] = generic_obj.energyCapacity;
    }

    // energy
    if ('energy' in generic_obj) {
        snapshot['energy'] = generic_obj.energy;
    }

    // ticks_to_regeneration
    if ('ticksToRegeneration' in generic_obj) {
        snapshot['ticks_to_regeneration'] = generic_obj.ticksToRegeneration;
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
                Memory.snapshot.objects[flag.name] = generic_snapshot(flag, 'flag');
            });

        });

    },

};

module.exports = memory;