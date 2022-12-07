class File {
    constructor(name , size , parent) {
        this.name = name;
        this.size = +size;
        this.parent = parent
    }
}

module.exports = File;