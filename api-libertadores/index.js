import express from "express";
import pool from "./servicos/conexao.js";
import { retornaCampeonatos, retornaCampeonatosAno, retornaCampeonatosID, retornaCampeonatosTime } from "./servicos/retornaCampeonatos_servico.js";
import { cadastraCampeonato } from "./servicos/cadastroCampeonato_servico.js";
import { atualizaCampeonato } from "./servicos/atualizaCampeonato_servico.js";

const app = express()
app.use(express.json())

app.put('/campeonatos/:id', async (req, res) =>{
    const{id} = req.params;
    const{campeao, vice, ano} = req.body

    if (campeao == undefined || vice == undefined || ano == undefined) {
        res.status(400).send("Nem Todos os campos foram atualizados")
    } else {
        const resultado = await atualizaCampeonato(id, campeao, vice, ano)
        if (resultado.affectedRows > 0) {
            res.status(202).send("Registro atualizado com sucesso")
        } else {
            res.status(400).send("Registro não encontrado!")
        }
    }


    await atualizaCampeonato()

})

app.post('/campeonatos', async (req, res) =>{
    const campeao = req.body.campeao
    const vice= req.body.vice
    const ano = req.body.ano
    await cadastraCampeonato(campeao, vice, ano)
    res.status(204).send({"Mensagem": "Cadastro efetivo com sucesso!"})
})

app.get('/campeonatos', async (req, res) =>{
    let campeonatos
    const ano = req.query.ano
    const time = req.query.time

    if (typeof ano === 'undefined' && typeof time === 'undefined') {
        campeonatos = await retornaCampeonatos();
    } 
    else if(typeof ano !== 'undefined') {
        campeonatos = await retornaCampeonatosAno(ano);
    }
    else if (typeof time !== 'undefined'){
        campeonatos = await retornaCampeonatosTime(time);
    }

    if (campeonatos.length>0) {
        res.json(campeonatos)
    } else {
        res.status(404).json({mensagem: 'Nenhum campeonato encontrado'})
    }
})



app.get('/campeonatos/:id', async (req, res) =>{
    const id = parseInt(req.params.id)
    const campeonato =await retornaCampeonatosID(id)
    if (campeonato.length > 0) {
        res.json(campeonato)
    }else{
        res.status(400).json({mensagem: 'Nenhum campeonato encontrado!'})
    }
    
})



app.listen(9000, async () => {
    const data = new Date()
    console.log('Servidor node iniciado em: '+data);

    const conexao = await pool.getConnection();

    console.log(conexao.threadId)
    conexao.release()
})