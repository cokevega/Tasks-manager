require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
    questionsDeleteTask,
    confirm,
    questionsCompleteTask
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/manageDB');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

const main = async() => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();
    if (tasksDB) {
        tasks.loadTasks(tasksDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Descripción: ');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listTasks();
                break;
            case '3':
                tasks.listTasksByCompleted(true);
                break;
            case '4':
                tasks.listTasksByCompleted(false);
                break;
            case '5':
                const ids = await questionsCompleteTask(tasks.listArray);
                tasks.toggleCompleted(ids);
                break;
            case '6':
                const id = await questionsDeleteTask(tasks.listArray);
                if (id !== 0) {
                    if (await confirm('¿Seguro que desea borrar la tarea?')) {
                        tasks.deleteTask(id);
                    }
                }
                break;
        }
        saveDB(tasks.listArray);
        await pause();
    } while (opt !== '0');
}

main();