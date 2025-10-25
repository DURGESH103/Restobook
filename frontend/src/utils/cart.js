// Cart utility functions using localStorage
export const getCart = () => {
  try {
    const cart = localStorage.getItem('restobook_cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem('restobook_cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const addToCart = (item) => {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem._id === item._id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  saveCart(cart);
  return cart;
};

export const removeFromCart = (itemId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item._id !== itemId);
  saveCart(updatedCart);
  return updatedCart;
};

export const updateQuantity = (itemId, quantity) => {
  const cart = getCart();
  const item = cart.find(cartItem => cartItem._id === itemId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

export const updateCartItem = (itemId, quantity) => {
  return updateQuantity(itemId, quantity);
};

export const clearCart = () => {
  localStorage.removeItem('restobook_cart');
  return [];
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};