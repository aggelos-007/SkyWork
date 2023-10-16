class CommandBuilder {
    name?: string;
    aliases?: string[];
    description?: string;
    devOnly?: boolean;
    adminOnly?: boolean;
    alwaysExecutes?: boolean;
    disabled?: boolean;
    type?: string;

    setName(name: string){
        this.name = name;
        return this;
    }

    setAliases(aliases: string[]){
        this.aliases = aliases;
        return this;
    }

    setDescription(description: string){
        this.description = description;
        return this;
    }

    setDevOnly(){
        this.devOnly = true;
        return this;
    }

    setAdminOnly(){
        this.adminOnly = true;
        return this;
    }

    alwaysExecute(){
        this.alwaysExecutes = true;
        return this;
    }

    setDisabled(){
        this.disabled = true;
        return this;
    }

    setType(type: string){
        this.type = type;
        return this;
    }
}

export { CommandBuilder };