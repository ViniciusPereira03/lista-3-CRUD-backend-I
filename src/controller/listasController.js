const db = require('../connection/database');
const { checkList } = require('../functions/globalFunctions');

const listasController = {};

listasController.add = async (req, res) => {
    try {
        const data = req.body;

        const sql = `
            INSERT INTO lista (nome, descricao, data_compra)
            VALUES (?, ?, ?);
        `;

        const [results] = await db.execute(sql, [data.nome, data.descricao, data.data_compra]);

        const response = {
            id: results.insertId,
            ...data
        }

        return res.status(200).json({
            message: 'Lista criada com sucesso!',
            produto: response,
        });
    } catch (error) {
        return res.status(422).json({ message: 'Ocorreu um erro inesperado', error });
    }
}

listasController.get = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID da lista inválido' });
        }

        const sql = `
            SELECT * FROM lista
            WHERE id = ?;
        `;

        const [lista] = await db.execute(sql, [id]);

        if (lista.length === 0) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        return res.status(200).json({
            message: 'Lista encontrada com sucesso!',
            produto: lista[0],
        });
    } catch (error) {
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

listasController.list = async (req, res) => {
    try {
        const sql = `
            SELECT * FROM lista;
        `;

        const [listas] = await db.execute(sql);

        return res.status(200).json({
            message: 'Listas encontradas com sucesso!',
            listas,
        });
    } catch (error) {
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

listasController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID da lista inválido' });
        }

        const exist = await checkList(id);
        if (!exist) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        const sql = `
            UPDATE lista 
            SET status = ?, nome = ?, descricao = ?, data_compra = ?
            WHERE id = ?;
        `;

        const [results] = await db.execute(sql, [
            data.status, 
            data.nome, 
            data.descricao, 
            data.data_compra, 
            id
        ]);

        const response = {
            id,
            ...data
        }

        return res.status(200).json({
            message: 'Lista editada com sucesso!',
            produto: response,
        });
    } catch (error) {
        return res.status(422).json({ message: 'Ocorreu um erro inesperado', error });
    }
}

listasController.delete = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID da lista inválido' });
        }

        const exist = await checkList(id);
        if (!exist) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        const deleteSql = `
            DELETE FROM lista
            WHERE id = ?;
        `;

        await db.execute(deleteSql, [id]);

        return res.status(200).json({
            message: 'Lista excluída com sucesso!'
        });
    } catch (error) {
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}


module.exports = listasController;
