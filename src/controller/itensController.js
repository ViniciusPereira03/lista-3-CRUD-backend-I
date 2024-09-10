const mysql = require('mysql2/promise');
const dbConfig = require('../../database');
const { checkList, checkProduct, checkItem } = require('../functions/globalFunctions');
const db = require('../connection/database'); 


const itensController = {};

itensController.add = async (req, res) => {
    try {
        const data = req.body;

        const existList = await checkList(data.lista_id);
        if (!existList) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        const existProduct = await checkProduct(data.produto_id);
        if (!existProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const sql = `
            INSERT INTO itens_lista (fk_lista, fk_produto, quantidade_produto, valor_unidade_produto)
            VALUES (?, ?, ?, ?);
        `;

        const [results] = await db.execute(sql, [
            data.lista_id, 
            data.produto_id, 
            data.quantidade_produto,
            data.valor_unidade_produto || null
        ]);
        
        const response = {
            id: results.insertId,
            ...data
        }
        return res.status(200).json({
            message: 'Item adicionado a lista com sucesso!',
            produto: response,
        });
    } catch (error) {
        return res.status(422).json({ message: 'Ocorreu um erro inesperado', error });
    }
}

itensController.get = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID do item inválido' });
        }

        const sql = `
            SELECT * FROM itens_lista
            WHERE id = ?;
        `;

        const [item] = await db.execute(sql, [id]);

        if (item.length === 0) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }

        return res.status(200).json({
            message: 'Item encontrado com sucesso!',
            produto: item[0],
        });
    } catch (error) {
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

itensController.list = async (req, res) => {
    try {
        const listaId = req.params.id;

        const exist = await checkList(listaId);
        if (!exist) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        const sql = `
            SELECT * FROM itens_lista WHERE fk_lista = ?;
        `;

        const [itens] = await db.execute(sql, [listaId]);

        return res.status(200).json({
            message: 'Itens encontrados com sucesso!',
            itens,
        });
    } catch (error) {
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

itensController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID do item inválido' });
        }

        const exist = await checkItem(id);
        if (!exist) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }

        const existList = await checkList(data.lista_id);
        if (!existList) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        const existProduct = await checkProduct(data.produto_id);
        if (!existProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const sql = `
            UPDATE itens_lista 
            SET fk_lista = ?, fk_produto = ?, quantidade_produto = ?, valor_unidade_produto = ?
            WHERE id = ?;
        `;

        const [results] = await db.execute(sql, [
            data.lista_id, 
            data.produto_id, 
            data.quantidade_produto, 
            data.valor_unidade_produto, 
            id
        ]);

        const response = {
            id,
            ...data
        }

        return res.status(200).json({
            message: 'Item editado com sucesso!',
            produto: response,
        });

        
    } catch (error) {
        return res.status(422).json({ message: 'Ocorreu um erro inesperado', error });
    }
}

itensController.delete = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID do item inválido' });
        }

        const exist = await checkItem(id);
        if (!exist) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }

        const deleteSql = `
            DELETE FROM itens_lista
            WHERE id = ?;
        `;

        await db.execute(deleteSql, [id]);

        return res.status(200).json({
            message: 'Item excluído com sucesso!'
        });
    } catch (error) {
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

module.exports = itensController;
