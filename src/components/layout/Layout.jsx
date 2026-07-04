import Footer from './Footer'
import './Layout.css'


function Layout ({ children }) {
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
