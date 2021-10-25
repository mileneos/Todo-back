module.exports = app => {
    const todo = require("../controllers/todo.controller.js");
  
    var router = require("express").Router();
  
    // Создать ноую строку в бд
    router.post("/", todo.create);
  
    // Показать все строки в бд
    router.get("/", todo.findAll);
  
    // Показать строку по id
    router.get("/:id", todo.findOne);
  
    // Обновить строкупо id
    router.put("/:id", todo.update);
            
    // Удалить строку по  id
    router.delete("/:id", todo.delete);
  
    // Удалить всё в бд
    router.delete("/", todo.deleteAll);
  
    app.use('/api/todo', router);
  };