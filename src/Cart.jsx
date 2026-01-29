import { Link } from "react-router-dom";
import EmptyCart from "./empty_cart.svg";

const Cart = ({ cart, changeQuantity, removeItem }) => {
  const total = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += Number(item.price ?? 0) * (item.quantity ?? 1);
    });
    return sum;
  }; 

  return (
    <div id="movies__body">
      <main id="movies__main">
        <div className="movies__container">
          <div className="row">
            <div className="movie__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__movie">Movie</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>          
              <div className="cart__body">
                {cart.map((movie) => {
                  const unitPrice = Number(movie.price ?? 0);
                  const title = movie.Title || movie.title || "Untitled";
                  const img = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/assets/no-image.svg";

                  return (
                    <div className="cart__item" key={`${movie.imdbID}-${movie.cartType}`}>
                      <div className="cart__movie">
                        <img
                          className="cart__movie--img"
                          src={img}
                          alt={title}
                          onError={(e) => (e.currentTarget.src = "/assets/no-image.svg")}
                        />
                        <div className="cart__movie--info">
                          <span className="cart__movie--title">
                            {title}
                          </span>
                          <span className="cart__movie--price">
                            {movie.cartType === "rent" ? "Rent" : "Buy"} • ${unitPrice.toFixed(2)}
                          </span>
                          <button
                            className="cart__movie--remove"
                            onClick={() => removeItem(movie)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart__quantity">
                        <input
                          type="number"
                          className="cart__input"
                          min={1}
                          max={99}
                          value={movie.quantity}
                          onChange={(event) =>
                            changeQuantity(movie, event.target.value)
                          }
                        />
                      </div>
                      <div className="cart__total">
                        ${(unitPrice * movie.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
                {/* {(!cart || !cart.length) && <img src={EmptyCart}/>} */}
                {(!cart || !cart.length) && (
                  <div className="cart__empty">
                    <img className="cart__empty--img" src={EmptyCart} alt="" />
                    <h2>You don't have any movies in your cart!</h2>
                  </div>
                )}
              </div>
            </div>
            {cart && cart.length > 0 && (
              <div className="total">
                <div className="total__item total__sub-total">
                  <span>Subtotal</span>
                  <span>${(total() * 0.9).toFixed(2)}</span>
                </div>
                <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${(total() * 0.1).toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Total</span>
                  <span>${(total() * 1.1).toFixed(2)}</span>
                </div>
                <button className="btn btn__checkout no-cursor" onClick={() => alert(`Haven't got around to doing this :(`)}>
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;