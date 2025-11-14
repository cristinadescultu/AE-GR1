// server/routes/favorite.routes.js
const express = require('express');
const { Favorite, Product } = require('../database/models');
const { verifyToken } = require('../utils/token');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      attributes: ['product_id'],
    });

    const productIds = favorites.map((fav) => fav.product_id);

    return res.status(200).json({
      success: true,
      message: 'Favorites retrieved successfully',
      data: productIds,
    });
  } catch (error) {
    console.error('Error retrieving favorites:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving favorites',
      data: error.message,
    });
  }
});

router.post('/:productId', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const productId = parseInt(req.params.productId, 10);

    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product id is not valid',
        data: {},
      });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: {},
      });
    }

    const existing = await Favorite.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Product already in favorites',
        data: existing,
      });
    }

    const favorite = await Favorite.create({
      user_id: userId,
      product_id: productId,
    });

    return res.status(201).json({
      success: true,
      message: 'Product added to favorites',
      data: favorite,
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return res.status(500).json({
      success: false,
      message: 'Error adding favorite',
      data: error.message,
    });
  }
});

router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const productId = parseInt(req.params.productId, 10);

    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product id is not valid',
        data: {},
      });
    }

    await Favorite.destroy({
      where: { user_id: userId, product_id: productId },
    });

    return res.status(200).json({
      success: true,
      message: 'Product removed from favorites',
      data: {},
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({
      success: false,
      message: 'Error removing favorite',
      data: error.message,
    });
  }
});

module.exports = router;
