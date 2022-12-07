const Folder = require("./Folder");
const File = require("./File");

class Directory {
    constructor(root) {
        this.root = root;
        this.current = root;
    }

    execute_command(command){
        if(command.length == 3)
            if(command[2] == "..") this.current = this.current.parent;
            else if(command[2] == "/") this.current = this.root;
            else this.current = this.current.children.filter(folder => folder.name == command[2])[0];
    }

    insert_file(command) {
        this.current.children.push(new File(command[1] , command[0] , this.current));
    }

    insert_folder(command) {
        this.current.children.push(new Folder(command[1] , this.current));
    }

    insert_into_tree(command) {
        command[0] == "dir" ? this.insert_folder(command) : this.insert_file(command);
    }
}

module.exports = Directory;