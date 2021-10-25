const db = require("../models");
const ToDo = db.todo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Пустой запрос!"
        });
        return;
    }

    // Create a Tutorial
    const name = {
        title: req.body.title,
        description: req.body.description
    };

    // Save Tutorial in the database
    ToDo.create(name)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ошибка!"
            });
        });
};
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    ToDo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ошибка!"
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    ToDo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Невозможно найти объект с id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка с объектом id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    ToDo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Обновлено успешно."
                });
            } else {
                res.send({
                    message: `Невозможно обновить объект с id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка обновления с id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    ToDo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Удалено успешно!"
                });
            } else {
                res.send({
                    message: `Невозможно удалить объект с id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Невозможно удалить объект с id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    ToDo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Удалено успешно!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ошибка!"
            });
        });
};
