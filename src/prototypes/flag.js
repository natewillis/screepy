Flag.prototype.process = function () {

    // check and see if this has already been processed
    if (!('processed' in this.memory)) {
        this.memory.processed = false;
    }

    // check that the flag has all necessary items
    if (this.memory.processed) {

        // check fields
        if (!('deleteMe' in this.memory)) this.memory.deleteMe = true;
        if (!('type' in this.memory)) this.memory.deleteMe = true;

        // logging
        if (this.memory.deleteMe) {
            console.log('flag ' + this.name + ' has been marked for deletion');
        }


    } else {

        // default flags
        if (this.pos.roomName in Game.rooms) {

            // set delete flag to false
            this.memory.deleteMe = false;

            // energy source flags
            let sources = this.pos.findInRange(FIND_SOURCES,0);
            if (sources.length == 1) {

                // flag id information
                this.memory.type = 'source';
                this.setColor(COLOR_YELLOW);

                // store source
                source = sources[0];
                this.memory.sourceId = source.id;

                // find valid harvesting locations
                this.memory.harvestLocations = [];
                let flag = this;
                _.range(-1, 2).forEach(function(x) {
                    _.range(-1, 2).forEach(function(y) {
                        if (!((x == 0) && (y == 0))) {
                            let checkPosition = new RoomPosition(source.pos.x+x, source.pos.y+y, source.pos.roomName);
                            console.log(checkPosition);
                            let terrain = source.room.getTerrain().get(checkPosition.x, checkPosition.y);
                            if (terrain !== TERRAIN_MASK_WALL) {
                                flag.memory.harvestLocations.push(checkPosition);
                            }
                        }
                    });
                });
            }

            // this has now been processed
            this.memory.processed = true;

            // logging
            console.log('a flag named ' + this.name + ' and type ' + this.memory.type + ' was added');
        } else {

            // set delete flag to false
            this.memory.deleteMe = true;

            // logging
            console.log('a flag named ' + this.name + ' and type ' + this.memory.type + ' was deleted due to visibility');

        }


    }

}

Flag.prototype.visualize = function () {
    // only visualize processed items
    if (this.memory.processed) {
        _.forEach(this.memory.harvestLocations, function (pos) {
            new RoomVisual(pos.roomName).circle(pos.x, pos.y, {fill: '#FFFF00', stroke: '#ffff00', radius: .15, opacity: 0.5});
        });
    }
}