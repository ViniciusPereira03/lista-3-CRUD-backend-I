const db = require('../connection/database')

async function checkItem (id) {
    const checkItemSql = `
        SELECT * FROM itens_lista
        WHERE id = ?;
    `;

    const [checkResults] = await db.execute(checkItemSql, [id]);

    if (checkResults.length === 0) {
        return false
    } else {
        return true;
    }
}

async function checkList (id) {
    const checkListSql = `
        SELECT * FROM lista
        WHERE id = ?;
    `;

    const [checkResults] = await db.execute(checkListSql, [id]);

    if (checkResults.length === 0) {
        return false
    } else {
        return true;
    }
}

async function checkProduct (id) {
    const checkProductSql = `
        SELECT * FROM produtos
        WHERE id = ?;
    `;

    const [checkResults] = await db.execute(checkProductSql, [id]);

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
