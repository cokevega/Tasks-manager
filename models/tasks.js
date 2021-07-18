const Task = require("./task");

class Tasks {
    _list = {};
    get listArray() {
        const list = [];
        Object.keys(this._list).forEach((key) => {
            list.push(this._list[key]);
        });
        return list;
    }

    constructor() {
        this._list = {};
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    loadTasks(tasks = []) {
        tasks.forEach((task) => {
            this._list[task.id] = task;
        });
    }

    listTasks() {
        this.listArray.forEach((task, index) => {
            console.log(`${(index+1+'.').toString().green} ${task.description} | ${(task.completed===null)?'Pendiente'.red:'Completada'.green}`);
        })
    }

    listTasksByCompleted(completed = true) {
        const tasks = this.listArray.filter((task) => {
            if (!completed) {
                return task.completed === null;
            }
            return task.completed !== null;
        });
        tasks.forEach((task) => {
            console.log(`${task.description}${(completed)?': '+task.completed.green:''}`);
        });
    }

    deleteTask(id) {
        if (this._list[id]) {
            delete this._list[id];
            console.log('Tarea borrada correctamente');
        }
    }

    toggleCompleted(ids = []) {
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.completed) {
                task.completed = new Date().toISOString();
            }
        });
        this.listArray.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completed = null;
            }
        })
    }
}

module.exports = Tasks;