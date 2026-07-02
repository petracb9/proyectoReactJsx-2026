/*import Header from './Header'*/
import Footer from './Footer'
import './Layout.css'


function Layout ({ children }) {
  return (
    <div className="layout">
      {/*<Header />eliminar aqui lo comentado si funciona la App*/ }
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
