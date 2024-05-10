import pool from "../../db/connection.js";
import { filterRequest } from "../../utils/filterRequest.js";

export const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const filterData = filterRequest(req.body);

  if (filterData.length === 0) {
    return res.status(400).send("Request cannot be empty");
  } else {
    try {
      const productExist = await pool.query(
        "SELECT EXISTS(SELECT * FROM products WHERE id = $1)",
        [productId]
      );

      if (productExist.rows[0].exists) {
        let query = "UPDATE products SET";
        filterData.forEach(
          (key) => (query += ` ${key.key} = '${key.value}', `)
        );
        query = query.slice(0, -2);
        query += " WHERE id = $1 RETURNING *";

        console.log(query);
        const updateProduct = await pool.query(query, [productId]);
        if (updateProduct) {
          return res.status(200).send(updateProduct.rows);
        } else {
          return res.status(400).send("Product not updated");
        }
      } else {
        return res.status(400).send("This product doesn't exist");
      }
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  }
};
