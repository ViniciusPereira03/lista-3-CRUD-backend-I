const mysql = require('mysql2/promise');
const dbConfig = require('../../database');

const listasController = {};

listasController.add = async (req, res) => {
    try {
        const data = req.body;
        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            INSERT INTO lista (nome, descricao, data_compra)
            VALUES (?, ?, ?);
        `;

        const [results] = await conn.execute(sql, [data.nome, data.descricao, data.data_compra]);
        conn.release();

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

        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            SELECT * FROM lista
            WHERE id = ?;
        `;

        const [lista] = await conn.execute(sql, [id]);
        conn.release();

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
        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            SELECT * FROM lista;
        `;

        const [listas] = await conn.execute(sql);

        conn.release();

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

        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            UPDATE lista 
            SET status = ?, nome = ?, descricao = ?, data_compra = ?
            WHERE id = ?;
        `;

        const [results] = await conn.execute(sql, [
            data.status, 
            data.nome, 
            data.descricao, 
            data.data_compra, 
            id
        ]);
        conn.release();

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

        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const deleteSql = `
            DELETE FROM lista
            WHERE id = ?;
        `;

        await conn.execute(deleteSql, [id]);

        conn.release();

        return res.status(200).json({
            message: 'Lista excluída com sucesso!'
        });
    } catch (error) {
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

const checkList = async (id) => {
    const pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();

    const checkListSql = `
        SELECT * FROM lista
        WHERE id = ?;
    `;

    const [checkResults] = await conn.execute(checkListSql, [id]);
    conn.release();

    if (checkResults.length === 0) {
        return false
    } else {
        return true;
    }
}


module.exports = listasController;
