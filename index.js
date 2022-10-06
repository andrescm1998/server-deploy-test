const app = require("./app")
const port = 5000;

// Actually start the server listening
app.listen(port, () => {
    console.log(`Server now listening on port ${port}....`)
});
