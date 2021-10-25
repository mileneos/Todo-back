module.exports = (sequelize, Sequelize) => {
    const ToDo = sequelize.define("todo", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }

    });

    return ToDo;
};