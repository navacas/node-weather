import inquirer from 'inquirer';
import colors from 'colors';


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const pressEnter = [
    {
        type: 'input',
        name: 'enter',
        message: `Press ${'enter'.green} to continue`
    }
]



const inquirerMenu = async() => {
    // console.clear();
    console.log('=================='.green);
    console.log('Select an option'.white);
    console.log('==================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;

}

const pause = async() => {
    console.log('\n');
    await inquirer.prompt(pressEnter);
}


const readInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }else{
                    return true;
                }
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;

}

// Menú para que aparezcan todos los lugares que se encontraron
const listPlaces = async( places = []) => {
    // {
    //     value: '1',
    //     name: `${'1.'.green} Crear tarea`
    // },

    const choices = places.map((place, i) => {
        const idx = `${i + +1}.`.green;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.red + 'Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place: ',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

//MEnú para que aparezca el mensaje de confirmación de borrado de tarea
const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const showCheckList = async( tasks = []) => {
    // {
    //     value: '1',
    //     name: `${'1.'.green} Crear tarea`
    // },

    const choices = tasks.map((task, i) => {
        const idx = `${i + +1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: ( task.completedDate ) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select task',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;
}


export { inquirerMenu, pause, readInput, listPlaces, confirm, showCheckList };




