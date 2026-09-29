import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceTypes, addNewProduct } from "./../../../redux/Slices/serviceSlice";
import { Input, Select, Textarea, Label, Button, Alert } from "../ui";

const validate = (data) => {
  const imagePattern = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;

  switch (data.name) {
    case "image":
      if (!imagePattern.test(data.value)) {
        return "url de imagen invalida";
      }
      break;
    case "description":
      if (!data.value || data.value.length < 10) {
        return "dato invalido, minimo 10 palabras";
      }
      break;
    case "name":
      if (!data.value || data.value.length < 3) {
        return "dato invalido, minimo 3 palabras";
      }
      break;
    case "price":
      if (!data.value) {
        return "precio requerido, debe ser numero";
      }
      break;
    case "stock":
      if (!data.value) {
        return "stock requerido, debe ser numero";
      }
      break;
    case "serviceType":
      if (data.value.length !== 1) {
        return "debe elegir un tipo de servicio";
      }
      break;
    default:
      return null;
  }
};

const AddProduct = ({ open, brand }) => {
  const dispatch = useDispatch();
  const { serviceTypes } = useSelector((state) => state.service);
  const { brands } = useSelector((state) => state.brand);

  const [input, setInput] = useState({
    name: "",
    image: "",
    Service_type: null,
    price: null,
    stock: null,
    motor: [],
    description: "",
    brandCar: [],
  });

  const [showBrand, setShowBrand] = useState([]);

  const [error, setError] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "motor") {
      if (value !== "none") {
        if (!input.motor.includes(value)) setInput({ ...input, motor: [...input.motor, value] });
      }
    } else if (name === "brandCar") {
      if (value === "allBrands") {
        setInput({ ...input, brandCar: brands.brands.map((e) => e._id) });
        setShowBrand(brands.brands);
      } else {
        let b = brands.brands.find((b) => b._id === value);
        let include = input.brandCar.find((e) => e === b._id);

        if (!include) {
          setInput({ ...input, brandCar: [...input.brandCar, b._id] });
          setShowBrand([...showBrand, b]);
        }
      }
    } else setInput({ ...input, [name]: value });

    const validationError = validate({ name, value });
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: validationError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, Service_type, price, stock, motor, description } = error;
    let result = dispatch(addNewProduct(input));
    console.log(result);

    setInput({
      name: "",
      image: "",
      ServiceType: null,
      price: null,
      stock: null,
      motor: [],
      description: "",
      brandCar: [],
    });
  };

  const removeMotor = (e) => {
    setInput({
      ...input,
      motor: input.motor.filter((motorItem) => motorItem !== e),
    });
  };

  const removeBrand = (e) => {
    setShowBrand([...showBrand.filter((brandItem) => brandItem._id !== e._id)]);
    setInput({
      ...input,
      brandCar: input.brandCar.filter((motorItem) => motorItem !== e._id),
    });
  };

  useEffect(() => {
    dispatch(getAllServiceTypes());
  }, []);

  return (
    <div className="mx-auto max-w-5xl rounded-md bg-surface p-6 shadow-sm">
      <h2 className="mb-6 text-center text-2xl font-bold text-heading sm:text-3xl">
        Agregar producto nuevo
      </h2>

      <form onSubmit={handleSubmit} onChange={handleChange} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="flex flex-col">
          <Label htmlFor="product-name">Nombre</Label>
          <Input id="product-name" type="text" name="name" required />
          {error.name && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.name}
            </Alert>
          )}
        </article>

        <article className="flex flex-col">
          <Label htmlFor="product-image">URL de la imagen</Label>
          <Input id="product-image" type="url" name="image" />
          {error.image && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.image}
            </Alert>
          )}
        </article>

        <article className="flex flex-col md:col-span-2">
          <Label htmlFor="product-description">Descripción</Label>
          <Textarea id="product-description" name="description" rows="3" required />
          {error.description && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.description}
            </Alert>
          )}
        </article>

        <article className="flex flex-col">
          <Label htmlFor="product-price">Precio</Label>
          <Input id="product-price" type="number" step="0.01" name="price" required />
          {error.price && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.price}
            </Alert>
          )}
        </article>

        <article className="flex flex-col">
          <Label htmlFor="product-stock">Cantidad</Label>
          <Input id="product-stock" type="number" name="stock" required />
          {error.stock && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.stock}
            </Alert>
          )}
        </article>

        <article className="flex flex-col">
          <Label htmlFor="product-service">Tipo de servicio</Label>
          <Select id="product-service" name="Service_type" required>
            <option value="">-------</option>
            {serviceTypes &&
              serviceTypes.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
          </Select>
          {error.ServiceType && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.ServiceType}
            </Alert>
          )}
        </article>

        <article className="flex flex-col">
          <Label htmlFor="product-motor">Motor</Label>
          <Select id="product-motor" name="motor" required>
            <option value="none">seleccionar</option>
            <option value="nafta">Nafta</option>
            <option value="diesel">Diesel</option>
          </Select>

          <div className="mt-4 flex flex-wrap gap-2">
            {input.motor.length > 0 &&
              input.motor.map((e, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => removeMotor(e)}
                  className="rounded-full bg-body px-3 py-1 text-sm"
                  aria-label={`Quitar motor ${e}`}
                >
                  {e} <span className="text-danger">x</span>
                </button>
              ))}
          </div>
          {error.motor && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.motor}
            </Alert>
          )}
        </article>

        <article className="flex flex-col">
          <Label htmlFor="product-brand">Marca de auto</Label>
          <Select id="product-brand" name="brandCar" required>
            <option value="none">seleccionar</option>
            <option value="allBrands">todas las marcas</option>
            {brands.brands &&
              brands.brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
          </Select>
        </article>

        <div className="flex flex-wrap gap-4 md:col-span-2">
          {showBrand.length > 0 &&
            showBrand.map((e, index) => (
              <button
                type="button"
                key={index}
                onClick={() => removeBrand(e)}
                className="flex items-center gap-2 rounded-full border border-border px-3 py-2 transition-colors hover:bg-body"
                aria-label={`Quitar marca ${e.name}`}
              >
                <img src={e.image} alt="" className="h-8 w-8 object-contain" />
                <span className="text-heading">{e.name}</span>
                <span className="font-bold text-danger">x</span>
              </button>
            ))}
        </div>

        <div className="text-center md:col-span-2">
          <Button type="submit" className="w-full">
            Agregar producto
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
