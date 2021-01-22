import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";

//Acá le tiramos la data del fetch
function ProductCards() {
  const products = [
    {
      name: "PANTALON LOGAN",
      description:
        "Pantalón de vestir de gabardina esmerilada, de tiro medio con botamanga. Muy versátil en su uso. Tiene dos bolsillos en delantero y dos bolsillos ojal en el trasero.",
      image:
        "https://cdn.elburgues.com/media/catalog/product/cache/1/small_image/456x556/9df78eab33525d08d6e5fb8d27136e95/5/0/50_a_2.jpg",
      price: "12.279",
      stock: "10",
      rating: "5*",
      sale: "***HOT SALE***",
    },
    {
      name: "PANTALON LOGAN",
      description:
        "Pantalón de vestir de gabardina esmerilada, de tiro medio con botamanga. Muy versátil en su uso. Tiene dos bolsillos en delantero y dos bolsillos ojal en el trasero.",
      image:
        "https://cdn.elburgues.com/media/catalog/product/cache/1/small_image/456x556/9df78eab33525d08d6e5fb8d27136e95/5/0/50_a_2.jpg",
      price: "12.279",
      stock: "10",
      rating: "5*",
      sale: "***HOT SALE***",
    },
    {
      name: "PANTALON LOGAN",
      description:
        "Pantalón de vestir de gabardina esmerilada, de tiro medio con botamanga. Muy versátil en su uso. Tiene dos bolsillos en delantero y dos bolsillos ojal en el trasero.",
      image:
        "https://cdn.elburgues.com/media/catalog/product/cache/1/small_image/456x556/9df78eab33525d08d6e5fb8d27136e95/5/0/50_a_2.jpg",
      price: "12.279",
      stock: "10",
      rating: "5*",
      sale: "***HOT SALE***",
    },
    {
      name: "PANTALON LOGAN",
      description:
        "Pantalón de vestir de gabardina esmerilada, de tiro medio con botamanga. Muy versátil en su uso. Tiene dos bolsillos en delantero y dos bolsillos ojal en el trasero.",
      image:
        "https://cdn.elburgues.com/media/catalog/product/cache/1/small_image/456x556/9df78eab33525d08d6e5fb8d27136e95/5/0/50_a_2.jpg",
      price: "12.279",
      stock: "10",
      rating: "5*",
      sale: "***HOT SALE***",
    },
    {
      name: "PANTALON LOGAN",
      description:
        "Pantalón de vestir de gabardina esmerilada, de tiro medio con botamanga. Muy versátil en su uso. Tiene dos bolsillos en delantero y dos bolsillos ojal en el trasero.",
      image:
        "https://cdn.elburgues.com/media/catalog/product/cache/1/small_image/456x556/9df78eab33525d08d6e5fb8d27136e95/5/0/50_a_2.jpg",
      price: "12.279",
      stock: "10",
      rating: "5*",
      sale: "***HOT SALE***",
    },
    {
      name: "PANTALON LOGAN",
      description:
        "Pantalón de vestir de gabardina esmerilada, de tiro medio con botamanga. Muy versátil en su uso. Tiene dos bolsillos en delantero y dos bolsillos ojal en el trasero.",
      image:
        "https://cdn.elburgues.com/media/catalog/product/cache/1/small_image/456x556/9df78eab33525d08d6e5fb8d27136e95/5/0/50_a_2.jpg",
      price: "12.279",
      stock: "10",
      rating: "5*",
      sale: "***HOT SALE***",
    },
  ];
  return (
    <div>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <Grid container spacing={1}>
            {products &&
              products.map((p) => {
                return (
                  <Grid item key={p.id} xs={12} sm={3}>
                    <ProductCard
                      idProduct={p.idProduct}
                      name={p.name}
                      description={p.description}
                      price={p.price}
                      image={p.image}
                      // onClick={() => {}}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </div>
  );
}

export default ProductCards;