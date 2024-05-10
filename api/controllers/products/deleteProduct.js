import pool from "../../db/connection.js";

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);

  try {
    const productExist = await pool.query(
      "SELECT EXISTS(SELECT * FROM products WHERE id = $1);",
      [productId]
    );
    if (productExist.rows[0].exists) {
      const deleteProduct = await pool.query(
        "DELETE FROM products WHERE id = $1;",
        [productId]
      );
      if (deleteProduct) {
        return res.status(200).send("Product deleted");
      } else {
        return res.status(400).send("Can't delete the product");
      }
    } else {
      return res.status(400).send("This product not exist");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
