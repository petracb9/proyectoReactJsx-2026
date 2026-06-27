import {createContext, useContext, useState} from 'react'

export const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])
  console.log('CartProvider init')

  // Agrega producto o incrementa cantidad si ya existe
  function addToCart(producto) {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id)
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function removeFromCart(id) {
    setCarrito(prev => prev.filter(item => item.id !== id))
  }

  function clearCart() {
    setCarrito([])
  }

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  const totalPrecio = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad, 0
  )

  return (
    <CartContext.Provider value={{
      carrito,
      addToCart,
      removeFromCart,
      clearCart,
      
      totalItems,
      totalPrecio
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider