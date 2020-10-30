let utilities = {
    universal_id: function (game_object) {
        if ('structureType' in game_object) {
            return game_object.structureType+'-'+game_object.pos.roomName+'-'+game_object.pos.x+'-'+game_object.pos.y;
        } else if ('name' in game_object) {
            return game_object.name;
        } else {
            return game_object.id;
        }
    }
}
module.exports = utilities