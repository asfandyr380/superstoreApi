require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require('./api/users/user.router');
const shopRouter = require('./api/shops/shop.router');
const adminRouter = require('./api/admin/admin.router');
const categoryRouter = require('./api/categories/category.router');
const productRouter = require('./api/products/product.router');
const orderRouter = require('./api/orders/order.router');
const bannerRouter = require('./api/banners/banners.router');
const brandsRouter = require('./api/brands/brand.router');
const swipeBannerRouter = require('./api/swipeBanner/swipeBanner.router');
const cartRouter = require('./api/cart/cart.router');
const wishrouter = require('./api/wishlist/wish.router');
const reviewsRouter = require('./api/reviews/review.router');
const checkOutRouter = require('./api/checkout/checkout.router');
const messageRouter = require('./api/messages/msg.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRouter);
app.use('/api/stores', shopRouter);
app.use('/api/admin', adminRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/swipeBanners', swipeBannerRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishrouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/checkout', checkOutRouter);
app.use('/api/message', messageRouter);

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server up and running...');
});