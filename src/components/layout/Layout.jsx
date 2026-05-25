import Header from './Header'
import Footer from './Footer'
import './Layout.css'


function Layout ({ children, cantidadCarrito }) {
  return (
    <div className="layout">
      <Header cantidadCarrito={cantidadCarrito} />
      
      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout
