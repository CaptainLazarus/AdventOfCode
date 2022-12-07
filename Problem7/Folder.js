class Folder {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
    }
}

module.exports = Folder;