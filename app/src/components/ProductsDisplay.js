import React, { useEffect, useState } from 'react'

export default function ProductsDisplay() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/products", {
            method: "GET",
        }).then((response) => console.log(response));
    }, [])

    return (
        <div>
            <h1>Display</h1>
            <div>
                {(products.length > 0) && products.map((prod, index) =>
                    <div key={index}>
                        {prod.id}
                    </div>
                )}
            </div>

        </div>
    )
}
