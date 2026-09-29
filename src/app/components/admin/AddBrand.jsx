import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewBrand } from "../../../redux/Slices/brandSlice";
import { Input, Label, Button, Alert } from "../ui";

const validate = (data) => {
  const imagePattern = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;

  switch (data.name) {
    case "image":
      if (!data.value || !imagePattern.test(data.value)) {
        return "url de imagen invalida";
      }
      break;
    case "name":
      if (!data.value || data.value.length < 3) {
        return "dato invalido, minimo 3 palabras";
      }
      break;
    default:
      return null;
  }
};

const AddBrand = ({ open, brand }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({ name: "", image: "" });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    setInput({ ...input, [name]: value });

    const validationError = validate({ name, value });
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: validationError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.name && !error.image) {
      dispatch(addNewBrand(input));
      setInput({ name: "", image: "" });
    }
  };

  return (
    <div className="m-auto max-w-96 rounded-md bg-surface p-6 shadow-sm">
      <h2 className="mb-6 text-center text-2xl font-bold text-heading">Agregar marca de auto</h2>

      <form onSubmit={handleSubmit} onChange={handleChange} className="space-y-6">
        <article>
          <Label htmlFor="brand-name">Nombre</Label>
          <Input id="brand-name" type="text" name="name" required />
          {error.name && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.name}
            </Alert>
          )}
        </article>

        <article>
          <Label htmlFor="brand-image">URL de imagen</Label>
          <Input id="brand-image" type="url" name="image" required />
          {error.image && (
            <Alert variant="danger" role="alert" className="mt-2">
              {error.image}
            </Alert>
          )}
        </article>

        <div className="flex justify-center">
          <Button type="submit">Agregar marca</Button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
