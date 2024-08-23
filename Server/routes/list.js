import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Hello").status(200);
});

export default router;
