const inquirer = require('inquirer');
require('colors');

const questions = [{
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [{
            value: '1',
            name: `${'1.'.green} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.green} Ver tareas`
        },
        {
            value: '3',
            name: `${'3.'.green} Ver tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.green} Ver tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar tarea`
        },
        {
            value: '0',
            name: `${'7.'.green} Salir`
        },
    ]
}];

const questionsDeleteTask = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const index = (i + 1 + '.').green;
        return {
            value: task.id,
            name: `${index} ${task.description}`
        }
    });
    choices.push({
        value: 0,
        name: (choices.length + 1 + '.').green + ' Cancelar'
    });
    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione tarea a borrar',
        choices
    }];
    const { id } = await inquirer.prompt(questions);
    return id;
}

const inquirerMenu = async() => {
    console.log('======================'.green);
    console.log('Seleccione una opción:');
    console.log('======================\n'.green);
    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {
    await inquirer.prompt([{
        type: 'input',
        message: `Presione ${'ENTER'.green} para continuar`,
        name: 'enter'
    }]);
}

const readInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor, ingrese un valor';
            }
            return true;
        }
    }];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const questionsCompleteTask = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const index = (i + 1 + '.').green;
        return {
            value: task.id,
            name: `${index} ${task.description}`,
            checked: (task.completed) ? true : false
        }
    });
    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione tarea(s) a marcar como completa(s)/pendiente(s)',
        choices
    }];
    const { ids } = await inquirer.prompt(questions);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    questionsDeleteTask,
    confirm,
    questionsCompleteTask
}