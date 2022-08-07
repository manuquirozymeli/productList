const React = require("react");
const hydrate = require("nordic/hydrate");
const ProductListView = require("../pages/productList/view");

const { products, name, limit, offset } = window.__PRELOADED_STATE__;

hydrate(
  <ProductListView products={products} name={name} limit={limit} offset={offset} />,
  document.getElementById("root-app")
);
