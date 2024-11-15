require("express-async-errors")
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");  

 
const app = express();
app.use(express.json()); 
app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {

    if(error instanceof AppError){
        return response.status(error.statusCode).json({  
            status: "error",
            message: error.message
        });  
    }
    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });

});




//query params - opcionais
app.get("/users/", (request, response) => {
    const {page, limit} = request.query;

    response.send(`
        Pagina : ${page} 
        Limit : ${limit}
    `);
});

// route params- obrigatórios
app.get("/message/:id/:user", (request, response) => {
    const {id, user} = request.params;

    response.send(`
        ID : ${id}
        User : ${user}
    `);
});






const PORT = 3333;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// npm start - rodar o servidor
// npm run dev - rodar o servidor com o nodemon (recarregamento automático)