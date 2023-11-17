const express = require("express");
const db = require("../models");
const Shoes = db.Shoes;
const { Op } = require("sequelize");

const router = express.Router();

//상품 등록
router.post("/products", async (req, res) => {
  try {
    const { productId, name, brand, price, status } = req.body;

    if (!productId || !name || !brand || !price || !status) {
      return res.status(400).json({ errormessage: "데이터 형식이 올바르지 않습니다." });
    }

    const newProduct = new Shoes({
      productId,
      name,
      brand,
      price,
      status
    });

    await newProduct.save();
    res.status(201).json({ message: "판매상품을 등록하였습니다." });
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

//전체 조회
router.get("/products", async (req, res) => {
  try {
    const shoes = await Shoes.findAll();
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

//단일 조회
router.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Shoes.findOne({
      where: { productId: productId }
    });
    if (!product) {
      return res.status(400).json({ errormessage: "원하시는 상품이 존재하지 않습니다." });
    }

    res.send(product);
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

//상품 업데이트
router.put("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Shoes.findOne({
      where: { productId: productId }
    });

    const { name, brand, price, status } = req.body;

    if (!product) {
      return res.status(400).json({ errormessage: "원하시는 상품이 존재하지 않습니다." });
    }

    product.name = name;
    product.brand = brand;
    product.price = price;
    product.status = status;
    //update 사용가능 product.update({key:value})

    res.send(product);
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

router.delete("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Shoes.findOne({
      where: { productId: productId }
    });

    await product.destroy();
    res.status(200).json({ message: "상품 삭제 완료" });
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

module.exports = router;
