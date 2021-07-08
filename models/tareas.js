/**
 * _listado:
 *      { 'uuid-12324-56789-1: { id:1, desc:qwerty, completadoEn:fecha } },
 */

const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        let listado = '\n';

        this.listadoArr.forEach((tarea, idx) => {
            const numeracion = (idx + 1 + '.').green;
            const {desc, completadoEn} = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            listado += `${numeracion} ${desc} :: ${ estado }\n`
        });

        return listado;
    }

    listadoPendienteCompletado(opt) {
        let listado = '\n';
        let listaTareas = this.listadoArr;

        switch (opt) {
            case 1:
                listaTareas = this.listadoArr.filter((lt) => {
                    return lt.completadoEn
                });
                break;

            case 2:
                listaTareas = this.listadoArr.filter((lt) => {
                    return !lt.completadoEn
                });
                break;
        }

        listaTareas.forEach((tarea, idx) => {
            const numeracion = (idx + 1 + '.').green;
            const {desc, completadoEn} = tarea;
            const estado = completadoEn ? completadoEn.green : 'Pendiente'.red;
            listado += `${numeracion} ${desc} :: ${ estado }\n`
        });

        return listado;
    }

    toggleCompletadas( ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}


module.exports = Tareas;