const router = require("nordic/ragnar").router();
const { render, fetchProducts } = require("./controller");

router.get("/", fetchProducts, render);

module.exports = router;
