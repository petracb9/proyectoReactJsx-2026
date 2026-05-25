import ItemListContainer from '../components/catalog/ItemListContainer'
import productos from '../data/productos.json'
import Item from '../components/catalog/Item'

function Home() {
  const destacados = productos.slice(0, 5)

  return (
    <div className="home-page">
      <div className="home-intro"> 
        <h2 className="page-title">TropicGlass</h2>
        <p className="page-subtitle">Vasos personalizados únicos para cada momento.</p>
      </div>
           

      <div className="home-section">
        <h2>Nuestras Categorías</h2>

        <div className="category-cards">
          <div className="category-card">
            <h3>Vasos altos tropicales</h3>
            <p>Ideales para tragos frescos, jugos, cócteles frutales y bebidas con hielo.</p>
          </div>

          <div className="category-card">
            <h3>Vasos cortos premium</h3>
            <p>Perfectos para whisky, tragos clásicos, degustaciones y regalos personalizados.</p>
          </div>
        </div>
      </div>

       <div className="home-section">
        <h2>Productos Destacados</h2>

        <div className="products-grid">
          {destacados.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home