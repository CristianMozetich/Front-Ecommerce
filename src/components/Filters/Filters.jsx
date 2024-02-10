import { useState, useId } from "react"

const Filters = () => {
    const [minPrice, setMinPrice] = useState(0)
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangePrice = (e) => {
        e.preventDefault()
        
        setMinPrice(e.target.value)
    }
  return (
    <section>
        <div>
            <label htmlFor={minPriceFilterId}>Precio</label>
            <input type="range"
            id={minPriceFilterId}
            onChange={handleChangePrice}
            />
            <span>{minPrice}</span>
        </div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId}>
            <option value="">Todos los productos</option>
            <option value="">Relojes</option>
            <option value="">Notebooks</option>
            <option value="">Consolas</option>
        </select>
    </section>

  )
}

export default Filters
