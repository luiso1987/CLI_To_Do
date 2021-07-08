require('colors');

const { guardarDB, leerDB } = require('./helpers/accionesArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {
    console.log('Hola mundo');

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                console.log(tareas.listadoCompleto());
                break;

            case '3':
                console.log(tareas.listadoPendienteCompletado(1));
                break;

            case '4':
                console.log(tareas.listadoPendienteCompletado(2));
                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id != '0') {
                    const confirmacion = await confirmar('¿Estás seguro?');

                    if(confirmacion) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }

                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while( opt !== '0')
}

main();