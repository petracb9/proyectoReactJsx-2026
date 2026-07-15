import {createContext, useContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("tropic_cart")
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })

  useEffect(() => {
    localStorage.setItem("tropic_cart", JSON.stringify(carrito))
  }, [carrito])

  function addToCart(producto) {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id)
      if (existe) {
        if (existe.cantidad >= producto.stock) {
           return prev
        }
        
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      } else {
        if (producto.stock <= 0) {
          alert(`Lo sentimos, ${producto.nombre} está agotado y no se puede agregar al carrito.`)
          return prev
        }
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

  function cantidadMas(id, stockMaximo) {
    setCarrito(prev =>
     prev.map(item => { 
      if (item.id === id) { 
         if (item.cantidad >= stockMaximo) {
          return item
         }
        
      return { ...item, cantidad: item.cantidad + 1 } 
     }
     return item    
    })
  )
}

  function cantidadMenos(id) {
    setCarrito(prev =>
    prev.map(item =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    )
   )
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
      cantidadMas,
      cantidadMenos,
      totalItems,
      totalPrecio
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider