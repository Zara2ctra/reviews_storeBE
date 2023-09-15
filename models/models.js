const sequelize = require("../db.js");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    likes_number: {type: DataTypes.INTEGER, defaultValue: 0},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Review = sequelize.define("review", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    content_text: {type: DataTypes.TEXT},
    score: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    imageUrl: {type: DataTypes.STRING}
});

const ArtWork = sequelize.define("art_work", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false}
});

const Rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
});

const Like = sequelize.define("like", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Tag = sequelize.define("tag", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
});

const Comment = sequelize.define("comment", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment_text: {type: DataTypes.STRING, allowNull: false},
});

User.hasMany(Rating)
Rating.belongsTo(User)

Review.hasMany(Rating)
Rating.belongsTo(Review)

User.hasMany(Like)
Like.belongsTo(User)

Review.hasMany(Like)
Like.belongsTo(Review)

User.hasMany(Comment)
Comment.belongsTo(User)

Review.hasMany(Comment)
Comment.belongsTo(Review)

User.hasMany(Review)
Review.belongsTo(User)

Review.hasMany(Tag)
Tag.belongsTo(Review)

ArtWork.hasMany(Review)
Review.belongsTo(ArtWork)


module.exports = {
    User,
    Like,
    Review,
    ArtWork,
    Rating,
    Comment,
    Tag
};