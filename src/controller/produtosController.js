const mysql = require('mysql2/promise');
const dbConfig = require('../../database');

const produtosController = {};

produtosController.add = async (req, res) => {
    
    try {
        const data = req.body;
        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            INSERT INTO produtos (nome_produto, marca, categoria)
            VALUES (?, ?, ?);
        `;

        const [results] = await conn.execute(sql, [data.nome_produto, data.marca, data.categoria]);
        conn.release();

        const response = {
            id: results.insertId,
            ...data
        }

        return res.status(200).json({
            message: 'Produto cadastrado com sucesso!',
            produto: response,
        });
    } catch (error) {
        console.error('Erro no bloco try:', error);
        return res.status(422).json({ message: 'Ocorreu um erro inesperado', error });
    }
}

produtosController.get = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID do produto inválido' });
        }

        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            SELECT * FROM produtos
            WHERE id = ?;
        `;

        const [results] = await conn.execute(sql, [id]);
        conn.release();

        if (results.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        return res.status(200).json({
            message: 'Produto recuperado com sucesso!',
            produto: results[0],
        });
    } catch (error) {
        console.error('Erro na função produtosController.get:', error);
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

produtosController.list = async (req, res) => {
    try {
        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            SELECT * FROM produtos;
        `;

        const [produtos] = await conn.execute(sql);

        conn.release();

        return res.status(200).json({
            message: 'Lista de produtos recuperada com sucesso!',
            produtos,
        });
    } catch (error) {
        console.error('Erro na função produtosController.list:', error);
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

produtosController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID do produto inválido' });
        }

        const exist = await checkProduct(id);
        if (!exist) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const sql = `
            UPDATE produtos 
            SET status = ?, nome_produto = ?, marca = ?, categoria = ?
            WHERE id = ?;
        `;

        const [results] = await conn.execute(sql, [data.status, data.nome_produto, data.marca, data.categoria, id]);
        conn.release();

        const response = {
            id,
            ...data
        }

        return res.status(200).json({
            message: 'Produto editado com sucesso!',
            produto: response,
        });

        
    } catch (error) {
        console.error('Erro no bloco try:', error);
        return res.status(422).json({ message: 'Ocorreu um erro inesperado', error });
    }
}

produtosController.delete = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID do produto inválido' });
        }

        const exist = await checkProduct(id);
        if (!exist) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const pool = mysql.createPool(dbConfig);
        const conn = await pool.getConnection();

        const deleteSql = `
            DELETE FROM produtos
            WHERE id = ?;
        `;

        await conn.execute(deleteSql, [id]);

        conn.release();

        return res.status(200).json({
            message: 'Produto excluído com sucesso!'
        });
    } catch (error) {
        console.error('Erro na função produtosController.delete:', error);
        return res.status(422).json({ message: 'Erro interno do servidor', error });
    }
}

const checkProduct = async (id) => {
    const pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();

    const checkProductSql = `
        SELECT * FROM produtos
        WHERE id = ?;
    `;

    const [checkResults] = await conn.execute(checkProductSql, [id]);
    conn.release();

    if (checkResults.length === 0) {
        return false
    } else {
        return true;
    }
}

module.exports = produtosController;
