const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const normalize = require("../../../utils/normalize");
const Image = require("nordic/image");

const restClient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "/api",
});

function View(props) {
  const { products, name, limit, offset } = props;

  const preloadedState = {
    products,
    name,
    limit,
    offset,
  };

  const [productList, setProductList] = React.useState(undefined);
  const [count, setCount] = React.useState(parseInt(offset));
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (products) {
      let normalizedProducts = normalize(products);
      console.log(normalizedProducts);
      setProductList(normalizedProducts);
      setIsLoading(false);
    }
  }, [products]);

  const nextPage = () => {
    setIsLoading(true);
    setCount((prevCount) => prevCount + 1);
    restClient
      .get("/get-products", {
        params: {
          name,
          limit,
          offset: parseInt(offset) + count * parseInt(limit),
        },
      })
      .then((response) => {
        setProductList(normalize(response.data));
        setIsLoading(false);
      });
  };

  const previousPage = () => {
    setIsLoading(true);
    setCount((prevCount) => prevCount - 1);
    restClient
      .get("/get-products", {
        params: {
          name,
          limit,
          offset: parseInt(offset) + count * parseInt(limit),
        },
      })
      .then((response) => {
        setProductList(normalize(response.data));
        setIsLoading(false);
      });
  };

  return (
    <>
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
          console.log('Product List page is loaded!');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />
      {productList && productList.length > 0 && (
        <div>
          <p>página {count}</p>
          <button onClick={previousPage} disabled={count < 1}>anterior</button>
          <button onClick={nextPage}>siguiente</button>
        </div>
      )}
      {!isLoading &&
        productList &&
        (productList.length > 0 ? (
          productList.map((product) => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              {product.winner && <h4>Buy box winner</h4>}
              <Image src={product.thumbnail} lazyload="off" />
            </div>
          ))
        ) : (
          <h1>no se encontraron productos</h1>
        ))}
      {isLoading && <h1>cargando...</h1>}
    </>
  );
}

module.exports = View;
