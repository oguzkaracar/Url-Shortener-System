const express = require("express");
const router = express.Router();
const Url = require("../models/URL");

router.get("/", (req, res) => {
	res.render("index", { url: "" });
});

// linkleri yönlendirme - long url e yönlendirecez.
router.get("/:url", async (req, res) => {
	try {
		const url = await Url.findOne({ urlCode: req.params.url });

		if (url) {
			return res.redirect(url.longUrl);
		} else {
			return res.status(404).send("Geçerli bir url giriniz.");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
