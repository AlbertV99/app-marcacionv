// import useState from 'react'
// import env from "react-dotenv";
import Constantes from "./constantes"

const Peticiones = () => {
  //DATOS A UTILIZAR EN EL OBJETO CARDS
    const {host} = Constantes();
    const BASE = host // SERVIDOR AL CUAL SE REALIZARAN LAS PETICIONES
    const EMPRESA = "01"
    const CODIGO = "01"
    const CLAVE = "pollo931"
    const SFTP_USER = "yo"
    const SFTP_PASS = "pollo931"
    //FUNCIONES A UTILIZAR
    const obtenerPanel = async (modulo,setState,pagina=0,buscar="",filtros=[]) =>{
        // setCarga(true)
        // IDEA: Cambiar por constante de ambiente
        const url = BASE + modulo + "/"+pagina+"/"+((buscar!=="")?buscar : "")
        const temp = await fetch(url)
        const data = await temp.json();
        console.log(url,"testting");
        console.log(data,"testting");
        console.log("testting");
        setState(data)
        // setCarga(false)
    }

    const obtenerUnicoRegistro = async (modulo,id) =>{
        // setCarga(true)
        // IDEA: Cambiar por constante de ambiente
        const url = BASE + modulo +"/"+id
        const temp = await fetch(url)
        const data = await temp.json();
        return data
    }

    const procesoDeEnvio =  async (datos) => {
        console.log("Proceso de envio")
        let resp;
        try {
            if(obtenerListaEnviar().length <4){
                await actualizacionListaEnviar(datos)
                resp = await enviarLista();
            }else{
                throw new Error("Capacidad de registros almacenables lleno")
            }
        } catch (e) {
            console.log("Catch PDE",e)
            resp = {"cod":"99","msg":"Error al realizar el envio de datos"}
        } finally {

        }

        // if(resp.cod !="00"){
        //     console.log("error ")
        //     resp.cod = "09"
        //     resp.msg = "Guardado para envio al regresar la conexion "
        //     actualizacionListaEnviar(datos);
        // }
        console.log(resp)
        return resp
    }

    const actualizacionListaEnviar = (datos) => {
        console.log("Data",datos)
        const queue = JSON.parse(localStorage.getItem('listaRegistros')) || [];
        queue.push(datos);
        localStorage.setItem('listaRegistros', JSON.stringify(queue));
    }

    const obtenerListaEnviar = ()=> {
        const lista = localStorage.getItem("listaRegistros") || "[]";

        return JSON.parse(lista)
    }

    const eliminarPosListaEnviar = (pos) =>{
        const lista = JSON.parse(localStorage.getItem("listaRegistros") || "[]");
        lista.splice(pos)
        localStorage.setItem('listaRegistros', JSON.stringify(lista));
    }

    const enviarLista = async () => {
        const lista = obtenerListaEnviar();
        // const listaRespuesta = [] ;
        let listaRespuesta ;
        console.log("Envio Masivo")
        let resp;
        try {
            for (let pos in lista) {

                resp = await guardarRegistro(lista[pos])
                console.log("->"+resp.cod+ "["+pos+"]")
                if(resp.cod == "00"){
                    // listaRespuesta.push(resp);
                    listaRespuesta = resp;
                    eliminarPosListaEnviar(pos)
                }else if (resp.cod == "09"){
                    // listaRespuesta.push(resp);
                    listaRespuesta = resp;
                    eliminarPosListaEnviar(pos)
                    break;
                }else if (resp.cod == "10"){
                    // listaRespuesta.push(resp);
                    listaRespuesta = resp;
                    break;
                }else{

                    resp.cod="99"
                    resp.msg="Error de registro"
                    throw new Error(" No se puede enviar el registro, inconsistencia de datos")
                    break;
                }

            }
        } catch (e) {

            console.log("Error de conexion, throw",resp)
            throw new Error(e);
        }
        return listaRespuesta
    }

    const guardarRegistro = async (registro) =>{
        let url = BASE + "/marcador/Parametros/ABMForm.php?opcion=E" ;
        console.log(registro)
        let data ;
        if (navigator.onLine) {
            const temp = await fetch(url, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify(registro)
            });
            if(temp.ok){
                data = await temp.json();
            }else{
                data = {"cod":"10","msg":"ERROR no hay internet, datos guardados al retomar conexion"}
            }
        }else{
            data = {"cod":"10","msg":"ERROR no hay internet, datos guardados al retomar conexion"}
        }
        console.log(data);
        return data;
    }

    const guardarNuevoJson = async (modulo,datos)=>{
        const url = BASE + modulo ;
        console.log(url)
        console.log(datos)
        let resp ={"cod":"99","msg":"ERROR inesperado"}
        // const res = await fetch(url)
        try {
            const temp = await fetch(url, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify(datos)
            });
            console.log(temp);
            const resp = await temp.json();

        } catch (e) {
            console.log("Error : ", e)
        }
        return resp;
    }

    const guardarNuevoArchivo = async (modulo,datos)=>{

        const form = new FormData();

        for (var indice in datos) {
            if (datos.hasOwnProperty(indice)) {
                form.append(indice, datos[indice]);
            }
        }
        const url = BASE + modulo ;
        const temp = await fetch(url, {
          "method": "POST",
          "headers": {
            "Content-Type": "multipart/form-data",
            "body": form
            }
        });
        const data = await temp.json();
        console.log(data);
        return data;

    }

    const modificarRegistroJson = async (modulo,id,datos)=>{
        const url = BASE + modulo + "/" + id ;
        const temp = await fetch(url, {
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
           },
            "body": JSON.stringify(datos)
        });
        const res = await fetch(url)
        const data = await res.json();

    }

    const eliminarRegistro = async (modulo,id)=>{
        const url = BASE + modulo + "/" + id ;
        const temp = await fetch(url, {
          "method": "DELETE",
        });
        const res = await fetch(url)
        const data = await res.json();
        return data;
    }

    const endpointLibre = async (modulo,metodo)=>{
        const url = BASE + modulo ;
        const temp = await fetch(url, {
          "method": metodo,
        });

        const res = await fetch(url)
        const data = await res.json();
        return data;
    }

    const obtenerPersona = async (ci)=>{
        const query= `SELECT * FROM personal WHERE nro_docum ='${ci}';`
        const url = BASE;
        // + "/personal/Parametros/consultaValores.php"
        const temp = await fetch(url, {
              method: 'POST',
              headers: {'Content-Type': 'text/plain'},
              body: query
        });
        // console.log(temp)
        try{
            const data = JSON.parse(await temp.text());

            return data
        }catch (e){
            console.error("error:",e)
            return []
        }

    }

    const obtenerPersonales = async ()=>{
        const query = "SELECT id,nombres,apellidos,nro_docum,dsc_cargo FROM personal ;";
        const url = BASE + "/personal/Parametros/consultaValores.php?tipo=app";
        const temp = await fetch(url, {
              method: 'GET',
              // headers: {'Content-Type': 'text/plain'},
              // body: query
        });
        try{
            const data = JSON.parse(await temp.text());
            console.log(data)
            localStorage.setItem('personales',JSON.stringify(data.datos));
            // return data
        }catch (e){
            console.error("error:",e)
            return []
        }
    }

    const registrarMarcacion = async (datos)=>{
        return ""
    }

    const obtenerHistorial = async (ci)=>{
        const query = `SELECT pa.id,pa.fecha, pa.personal, pa.hs_entrada,pa.hs_entrada,pa.hs_salida FROM panel_asistencia  pa join personal p on  pa.personal = CONCAT(p.nombres,' ',p.apellidos) WHERE p.nro_docum = '${ci}'  LIMIT 20`;
        const url = BASE;
        const temp = await fetch(url, {
              method: 'POST',
              headers: {'Content-Type': 'text/plain'},
              body: query
        });
        // console.log(temp)
        try{
            const data = JSON.parse(await temp.text());
            return data
        }catch (e){
            console.error("error:",e)
            return []
        }
        return ""
    }
    // return [obtenerPanel,obtenerUnicoRegistro,guardarNuevoJson,guardarNuevoArchivo,modificarRegistroJson,eliminarRegistro,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial]
    return {
        "obtenerPanel":obtenerPanel,
        "obtenerUnicoRegistro":obtenerUnicoRegistro,
        "guardarNuevoJson":guardarNuevoJson,
        "guardarNuevoArchivo":guardarNuevoArchivo,
        "modificarRegistroJson":modificarRegistroJson,
        "eliminarRegistro":eliminarRegistro,
        "endpointLibre":endpointLibre,
        "obtenerPersona":obtenerPersona,
        "registrarMarcacion":registrarMarcacion,
        "obtenerHistorial":obtenerHistorial,
        "obtenerPersonales":obtenerPersonales,
        "procesoDeEnvio" : procesoDeEnvio,
        "actualizacionListaEnviar" : actualizacionListaEnviar,
        "obtenerListaEnviar" : obtenerListaEnviar,
        "enviarLista" : enviarLista,


    }
}

export default Peticiones
