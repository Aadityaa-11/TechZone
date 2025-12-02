const express = require("express");
const app = express();

const userRoutes = require("./Routes/User");
const profileRoutes = require("./Routes/Profile");
const paymentRoutes = require("./Routes/Payment");
const courseRoutes = require("./Routes/Course");
const contactUsRoute = require("./Routes/Contactus")

// const contactUsRoute = require("./routes/Contact");
const {dbconnect} = require("./Config/Database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {UploadImageToCloudinary } = require("./Config/Cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
dbconnect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
//UploadImageToCloudinary();
const { cloudinaryConnect } = require("./Config/Cloudinary");

//cloudinary connection
cloudinaryConnect();  // ✅ just connect, do NOT pass files here


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})