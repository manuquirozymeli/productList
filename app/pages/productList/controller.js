const React = require("react");
const View = require("./view");
const ProductsService = require("../../../services/productsService");

exports.fetchProducts = function fetchProductList(req, res, next) {
  const { name, limit, offset } = req.query;
  const { siteId } = req.platform;
  ProductsService.getProducts(siteId, name, limit, offset)
    .then((response) => {
      res.locals.products = response;
      res.locals.name = name;
      res.locals.limit = limit;
      res.locals.offset = offset;
      next();
    })
    .catch((err) => {
      next(err);
    });
};

exports.render = function render(req, res) {
  const ProductList = (props) => <View {...props} />;
  res.render(ProductList, {
    products: res.locals.products,
    name: res.locals.name,
    limit: res.locals.limit,
    offset: res.locals.offset,
  });
};
