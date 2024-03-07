const express = require('express');
const cors = require('cors');
const listaRoutes = require('./src/routes/listasRoutes');
const itensRoutes = require('./src/routes/itensRoutes');
const produtosRoutes = require('./src/routes/produtosRoutes');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.use((req, res, next) => {
    next();
});

app.use('/v1/listas', listaRoutes);
app.use('/v1/itens', itensRoutes);
app.use('/v1/produtos', produtosRoutes);
