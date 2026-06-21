import Header from './Header'
import Footer from './Footer'
import './Layout.css'


function Layout ({ children, totalItems }) {
  return (
    <div className="layout">
      <Header totalItems={totalItems} />
      
      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout
