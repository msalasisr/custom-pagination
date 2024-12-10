
import React from 'react';
import { useSearchPage } from 'vtex.search-page-context';
import { useRuntime } from 'vtex.render-runtime';

const CustomPagination = () => {
  const { searchQuery } = useSearchPage();
  const { navigate, query } = useRuntime();

  const totalProducts = searchQuery?.data?.productSearch?.recordsFiltered || 0;
  const productsPerPage = searchQuery?.data?.productSearch?.products?.length || 0;
  const totalPages = searchQuery?.data?.productSearch?.totalPages || 1;
  const currentPage = searchQuery?.data?.productSearch?.page || 1;

  // Calcular rango actual
  const currentStart = (currentPage - 1) * productsPerPage + 1;
  const currentEnd = Math.min(currentPage * productsPerPage, totalProducts);

  // Manejar cambio de página
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    navigate({
      page: window.location.pathname,
      query: {
        ...query,
        page,
      },
    });
  };

  // Generar botones de paginación
  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      // Agregar solo las primeras 4 páginas y un botón final "..."
      if (i <= 4 || i === totalPages) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={{
              margin: '0 5px',
              fontWeight: i === currentPage ? 'bold' : 'normal',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {i}
          </button>
        );
      } else if (i === 5) {
        // Agregar "..." entre las primeras páginas y el botón final
        buttons.push(
          <span key="ellipsis" style={{ margin: '0 5px' }}>
            ...
          </span>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="custom-pagination">
      {/* Mostrar rango de productos */}
      <p>
        Mostrando {currentStart} - {currentEnd} de {totalProducts} productos
      </p>

      {/* Contenedor de botones de paginación */}
      <div>{renderPaginationButtons()}</div>
    </div>
  );
};

export default CustomPagination;
