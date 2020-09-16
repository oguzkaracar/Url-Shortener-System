const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
require("dotenv").config;

const Url = require("../models/URL");
// route POST /api/url/shorten
// desc  Create short URL

router.get("/", (req, res) => {
	res.render("index", { url: "" });
});

router.post("/", async (req, res) => {
	const longUrl = req.body.longUrl;
	const baseUrl = process.env.BASE_URL
	if (!validUrl.isUri(baseUrl)) {
		// valid-url modülünü kullanarak base url kontrolü yaptık.
		return res.status(400).json("Invalid base url"); // eğer geçerli bir base url değilse bunu dönecek...
	}

	// shortid kullanımı - url code üretme

	const urlCode = shortId.generate(); // otomatik olarak kısa idler oluşturuyor...

	// valid-url modülünü kullanarak long url kontrolü yaptık.

	if (validUrl.isUri(longUrl)) {
		// girilen url gerçek mi? valid mi ? kontrol ettik.
		try {
			let url = await Url.findOne({ longUrl });
			if (url) {
				// database'e aynı url i eklememek için...

				res.render("index", { url: url });
			} else {
				const shortUrl = baseUrl + "/" + urlCode; // short url oluşturuldu.. ==> http://localhost:3000/{bişeyler} şeklinde olucak.

				// database yüklemek için yeni bir Url modeline göre collection oluşturuldu.
				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					date: new Date(),
				});

				// database e ekleme
				await url.save();

				res.render("index", { url: url });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json("Server Error");
		}
	} else {
		// verilen longUrl valid değilse ;
		res.status(400).json("Invalid long url");
	}
});

module.exports = router;