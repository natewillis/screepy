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
        this.memory.deleteMe = false;

        // energy source flags
        let sources = this.pos.findInRange(FIND_SOURCES,0);
        if (sources.length == 1) {
            this.memory.type = 'source';
            this.setColor(COLOR_YELLOW);
        }

        // this has now been processed
        this.memory.processed = true;

        // logging
        console.log('a flag named ' + this.name + ' and type ' + this.memory.type + ' was added');

    }

}