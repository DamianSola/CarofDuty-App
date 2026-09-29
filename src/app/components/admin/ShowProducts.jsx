const { useEffect, useState } = require("react");
const { useDispatch, useSelector } = require("react-redux");
import { getAllProducts, deleteOneProduct } from "./../../../redux/Slices/serviceSlice";
import { Modal, Input, Button, EmptyState, Label } from "../ui";

const ShowProducts = ({ close }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((s) => s.service);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("¿Seguro que quieres eliminar?");

    if (isConfirmed) {
      dispatch(deleteOneProduct(id));
    } else {
      console.log("Eliminación cancelada");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const list = (
    <div>
      <div className="mb-4">
        <Label htmlFor="search-product">Buscar producto</Label>
        <Input
          id="search-product"
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="space-y-3">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <li
              key={p._id}
              className="flex flex-col gap-2 rounded-sm border border-border bg-body p-4 md:flex-row md:items-start md:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-lg font-bold text-heading">{p.name}</p>
                <p className="text-sm text-muted">{p.description}</p>
                <p className="text-sm text-ink">$ {parseFloat(p.price.$numberDecimal)}</p>
                <p className="text-sm text-muted">Stock: {p.stock}</p>
                <p className="text-sm text-muted">
                  Motor: {p.motor.map((m) => (
                    <span key={m} className="mr-1">
                      {m}
                    </span>
                  ))}
                </p>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>
                Eliminar
              </Button>
            </li>
          ))
        ) : (
          <EmptyState title="No hay productos" />
        )}
      </ul>
    </div>
  );

  if (close) {
    return (
      <Modal isOpen onClose={close} title="Productos" className="max-w-3xl">
        {list}
      </Modal>
    );
  }

  return list;
};

export default ShowProducts;
