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

            // break regex apart
            console.log('found a structure regex of ' + returnMatch)
            console.log('room of ' + returnMatch[2] + ' and x of ' + returnMatch[3] + ' and y of ' + returnMatch[4])
            let roomPos = new RoomPosition(parseInt(returnMatch[3]), parseInt(returnMatch[4]), returnMatch[2]);
            console.log(roomPos)
            let structureType = returnMatch[1];
            console.log('found a type of ' + structureType)

            // search location for structures
            const structuresAtRoomPos = roomPos.lookFor(LOOK_STRUCTURES);
            console.log('found structures at position ' + roomPos + ' of ' + structuresAtRoomPos)

            // loop through structures to find right type
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