const express = require("express");
const router = express.Router();

const tokenVerifyMiddleware = require("../middlewares/tokenVerifyMiddleware");

const profileController = require("../controllers/profileController");
router.post("/createProfile", profileController.createProfile);
router.post("/userLogin", profileController.userLogin);

router.get("/getProfileData",tokenVerifyMiddleware, profileController.getProfileData);
router.post("/updateProfile", tokenVerifyMiddleware, profileController.updateProfile);

router.get("/recoverVerifyEmail/:email",profileController.recoverVerifyEmail);
router.get("/recoverVerifyOTP/:email/:otp", profileController.recoverVerifyOTP);
router.post("/recoverResetPass", profileController.recoverResetPass);

const taskController = require("../controllers/taskController");
router.post("/createTask", tokenVerifyMiddleware, taskController.createTask);
router.get("/readTask", tokenVerifyMiddleware, taskController.readTask);
router.get("/readTaskByStatus/:status", tokenVerifyMiddleware, taskController.readTaskByStatus);
router.get("/readTaskByDate", tokenVerifyMiddleware, taskController.readTaskByDate);
router.post("/updateTask/:id", tokenVerifyMiddleware, taskController.updateTask);
router.post("/updateTaskStatus/:id/:status", tokenVerifyMiddleware, taskController.updateTaskStatus);
router.post("/deleteTask/:id", tokenVerifyMiddleware, taskController.deleteTask);
router.get("/countTaskStatus", tokenVerifyMiddleware, taskController.countTaskStatus);

const productController = require("../controllers/productController");
router.post("/createProduct", productController.createProduct);
router.get("/readProduct", productController.readProduct);
router.post("/updateProduct/:id", productController.updateProduct);
router.post("/deleteProduct/:id", productController.deleteProduct);


module.exports = router;