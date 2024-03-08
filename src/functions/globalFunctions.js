const mysql = require('mysql2/promise');
const dbConfig = require('../../database');


async function checkItem (id) {
    const pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();

    const checkItemSql = `
        SELECT * FROM itens_lista
        WHERE id = ?;
    `;

    const [checkResults] = await conn.execute(checkItemSql, [id]);
    conn.release();

    if (checkResults.length === 0) {
        return false
    } else {
        return true;
    }
}

async function checkList (id) {
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

async function checkProduct (id) {
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


module.exports = {
    checkItem,
    checkList,
    checkProduct
}
