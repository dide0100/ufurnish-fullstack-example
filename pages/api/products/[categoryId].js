// pages/api/products/[categoryId].js

/**
 * Mock backend API endpoint (server-side only)
 * --------------------------------------------
 * This acts like a microservice or backend layer that provides
 * a unified JSON response for product data to the frontend.
 * In production, this would likely fetch from multiple sources
 * or databases and normalize the structure.
 */

export default function handler(req, res) {
    const { categoryId } = req.query;
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = 10;
  
    // --- Mock dataset generation ---
    const allProducts = Array.from({ length: 50 }, (_, i) => ({
      productId: `${categoryId}-${i + 1}`,
      name: `Product ${i + 1} in ${categoryId}`,
      price: (Math.random() * 100).toFixed(2),
      stock: Math.floor(Math.random() * 100),
      category: categoryId,
      shortDescription: `A stylish ${categoryId} item number ${i + 1}.`,
      image: `https://via.placeholder.com/600x400?text=${encodeURIComponent(categoryId + ' ' + (i + 1))}`,
    }));
  
    // --- Server-side pagination ---
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = allProducts.slice(start, end);
  
    // --- Standardized JSON response ---
    res.status(200).json({
      categoryId,
      page,
      pageSize,
      totalProducts: allProducts.length,
      products: paginated,
    });
  }