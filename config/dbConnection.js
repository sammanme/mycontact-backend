const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CON_STR), {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        };
        console.log(`Database connected: host- ${mongoose.connection.host} name- ${mongoose.connection.name}` );
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;