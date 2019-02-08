import app from "./app";

const port = process.env.PORT || 8087;

app.listen(port, () => console.log(`App listen on port ${port}!`));
