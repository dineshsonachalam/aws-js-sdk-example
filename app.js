const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const vpcRouter = require("./routes/vpc");
const PORT = process.env.PORT || 5000;
var HOST = "0.0.0.0";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "AWS VPC API",
			version: "0.0.1",
			description: "AWS VPC API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());

app.use("/vpc", vpcRouter);
app.listen(PORT, HOST, () => console.log(`The server is running on port ${PORT}`));