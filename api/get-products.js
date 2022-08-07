const router = require("nordic/ragnar").router();
const { getProducts } = require("../services/productsService.js");
/**
 * Ejercitación 1
 *
 * Aquí deberás crear el endpoint con el método GET, el cual consuma
 * el servicio que devuelve los productos de la API de MeLi.
 *
 * Comando para correr el test: `npm run test:unit:watch get-products`
 */

router.get("/", (req, res) => {
  const { siteId } = req.platform;
  const { name, limit, offset } = req.query;
  getProducts(siteId, name, limit, offset)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      json(err);
    });
});

module.exports = router;
