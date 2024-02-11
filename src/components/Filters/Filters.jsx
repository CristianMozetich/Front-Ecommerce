import { useId, useContext } from "react"
import './Filters.css'
import { Context } from "../../utils/ContextProviders"

const Filters = () => {
    const minPriceFilterId = useId()
    const categoryFilterId = useId()
    const { setFilters, filters } = useContext(Context)

    const handleChangePrice = (e) => {
        e.preventDefault()
        

        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        e.preventDefault()

        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }
  return (
    <section className="filters">
        <div>
            <label htmlFor={minPriceFilterId}>Precio</label>
            <input type="range"
            id={minPriceFilterId}
            onChange={handleChangePrice}
            value={filters.minPrice}
            max={1000}
            />
            <span>{filters.minPrice}</span>
        </div>
        <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
            <option value="all">Todos los productos</option>
            <option value="juegos">Juegos</option>
            <option value="Videojuegos">Videojuegos</option>
        </select>
        </div>
    </section>

  )
}

export default Filters
