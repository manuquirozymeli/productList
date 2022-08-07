function normalize(products) {
  const normalizedProducts = products.map((product) => {
    if (product.buy_box_winner) {
      const buyBoxWinner = {...product.buy_box_winner, winner: true};
      return buyBoxWinner;
    } else {
      return product;
    }
  });
  return normalizedProducts;
}

module.exports = normalize;
