const Card = () => {
  return (
    <ul class="listing">
      <li class="product">
        <a class="img-wrapper" href="/">
          <img
            src="https://res.cloudinary.com/denzhippu/image/upload/v1631183854/bookstore/alv0sa6eaywqfhio8nmy.jpg"
            alt=""
          />
        </a>

        <div class="info">
          <div class="title">Some Product</div>
          <div class="price">$34.99</div>
        </div>

        <div class="actions-wrapper">
          <a href="/" class="add-btn wishlist">
            Wishlist
          </a>
          <a href="/" class="add-btn cart">
            Cart
          </a>
        </div>
      </li>
      <li class="product">
        <a class="img-wrapper" href="/">
          <img
            src="https://res.cloudinary.com/denzhippu/image/upload/v1631183854/bookstore/alv0sa6eaywqfhio8nmy.jpg"
            alt="Green running shoe"
          />
        </a>
        <div class="note no-stock">Out of stock</div>

        <div class="info">
          <div class="title">Some Product</div>
          <div class="price">$34.99</div>
        </div>

        <div class="actions-wrapper">
          <a href="/" class="add-btn wishlist">
            Wishlist
          </a>
          <a href="/" class="add-btn cart">
            Cart
          </a>
        </div>
      </li>
      <li class="product">
        <a class="img-wrapper" href="/">
          <img
            src="https://res.cloudinary.com/denzhippu/image/upload/v1631183854/bookstore/alv0sa6eaywqfhio8nmy.jpg"
            alt="Pink running shoe"
          />
        </a>
        <div class="note on-sale">On sale</div>

        <div class="info">
          <div class="title">
            <a href="/">Some Product</a>
          </div>
          <div class="price sale">$20.50</div>
          <div class="price old">$34.99</div>
        </div>

        <div class="actions-wrapper">
          <a href="/" class="add-btn wishlist">
            Wishlist
          </a>
          <a href="/" class="add-btn cart">
            Cart
          </a>
        </div>
      </li>
    </ul>
  );
};

export default Card;
