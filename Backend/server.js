const app = require('./src/app');
const connectToDB = require('./src/db/db');

connectToDB();

app.listen(3000, (req,res) => {
    console.log("Server is running on port 3000");
})