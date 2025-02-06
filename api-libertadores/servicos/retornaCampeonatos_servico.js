import pool from "./conexao.js";

async function retornaCampeonatos() {
    const conexao = await pool.getConnection()
    const campeonatos_tb = await conexao.query('SELECT id, campeao, vice, ano FROM campeonatos')
    const campeonatos = campeonatos_tb[0]
    conexao.release()
    return campeonatos
}


async function retornaCampeonatosID(id) {
    const conexao = await pool.getConnection()
    const campeonatos_tb = await conexao.query(
        'SELECT id, campeao, vice, ano FROM campeonatos WHERE id = '+id)
    const campeonatos = campeonatos_tb[0]
    conexao.release()
    return campeonatos
}

async function retornaCampeonatosAno(ano){
    const conexao = await pool.getConnection()
    const campeonatos_tb = await conexao.query(
        'SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = ' + ano)
    const campeonatos = campeonatos_tb[0]
    conexao.release()
    return campeonatos
}


async function retornaCampeonatosTime(time){
    const conexao = await pool.getConnection()
    const campeonatos_tb = await conexao.query(
        'SELECT id, campeao, vice, ano FROM campeonatos WHERE campeao = "' + time + '"')
    const campeonatos = campeonatos_tb[0]
    conexao.release()
    return campeonatos
}

export {
    retornaCampeonatos,
    retornaCampeonatosID,
    retornaCampeonatosAno,
    retornaCampeonatosTime
}