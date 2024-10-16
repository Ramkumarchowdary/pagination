// import React, { useEffect, useState } from "react";
// import "./App.css";
// function Api() {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const[toalPages,setToatPages] = useState(0)
//   let data = "Loading...................";
//   const fetchProducts = async () => {
//     const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 -10}`);
//     const data = await res.json();

//     console.log(toalPages);
// console.log(data)
//     if (data && data.products) {
//       setProducts(data.products);
//       setToatPages(data.total / 10)
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page]);
//   const selectedPage = (selectedAPage) => {
//     if (
//       selectedAPage >= 1 &&
//       selectedAPage <= toalPages &&
//       selectedAPage !== page
//     ) {
//       setPage(selectedAPage);
//     }
//   };
//   return loading ? (
//     data
//   ) : (
//     <div>
//       {products.length > 0 && (
//         <div className="products">
//           {products.map((prod) => {
//             return (
//               <span className="products__single" key={prod.id}>
//                 <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
//                 <span>{prod.title}</span>
//               </span>
//             );
//           })}
//         </div>
//       )}
//       {products.length > 0 && (
//         <div className="pagination">
//           <span
//           className={page> 1 ?"":"pagination__disabled"}
//             onClick={() => {
//               selectedPage(page - 1);
//             }}
//           >
//             ⬅️
//           </span>
//           {[...Array(10)].map((_, i) => {
//             return (
//               <span
//                 className={page === i + 1 ? "pagination__selected" : ""}
//                 onClick={() => {
//                   selectedPage(i + 1);
//                 }}
//                 key={i}
//               >
//                 {i + 1}
//               </span>
//             );
//           })}
//           <span className={page< toalPages ?"":"pagination__disabled"}
//             onClick={() => {
//               selectedPage(page + 1);
//             }}
//           >
//             ➡️
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Api;
import React, { useEffect, useState } from "react";
import { Pagination, TablePagination } from "@mui/material"; // Import MUI Pagination component
import "./App.css";

function Api() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0); // Fix typo
  let Loader = "Loading...................";

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10)); // Set total pages correctly
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value); // MUI's Pagination passes the selected page as 'value'
  };
  const handleProductClick = (product) => {
    console.log(product); // Logs the product's title to the console
  };
  return loading ? (
    Loader
  ) : (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id} onClick={() => handleProductClick(prod)}>
                <img src={prod.thumbnail} alt={prod.title} />{" "}
                
                <span>{prod.title.split("").splice(0, 25).join("")}</span>
              </span>
            );
          })}
        </div>
      )}

      {/* MUI Pagination Component */}
      {products.length > 0 && (
        <div className="pagination">
          <Pagination
            count={totalPages} // Total number of pages
            page={page} // Current page
            onChange={handlePageChange} // Handle page change
            color="primary" // You can change the color or other props
          />
           {/* <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={10}
      onRowsPerPageChange={10}
    /> */}
        </div>
      )}
    </div>
  );
}

export default Api;
