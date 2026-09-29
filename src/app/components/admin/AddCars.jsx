import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCar } from "./../../../redux/Slices/carsSlice";
import { Input, Select, Label, Button, Alert } from "../ui";

const AddCar = ({ open, brand }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.car);

  const [input, setInput] = useState({});
  const [seeBrand, setSeeBrand] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;

    setInput({ ...input, [name]: value });

    if (name === "brand") {
      let show = brand.brands.find((e) => e._id === value);
      setSeeBrand(show.name);
      setError(null);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!input.brand) return setError("seleccionar marca");

    dispatch(addNewCar(input));
    setInput({});
  };

  return (
    <div className="m-auto max-w-96 rounded-md bg-surface p-6 shadow-sm">
      <span className="mb-4 block text-lg font-medium text-heading">{seeBrand && seeBrand}</span>

      <form onSubmit={HandleSubmit} className="space-y-4" onChange={(e) => handleChange(e)}>
        <div>
          <Label htmlFor="car-name">Nombre</Label>
          <Input id="car-name" type="text" name="name" required />
        </div>

        <div>
          <Label htmlFor="car-type">Tipo de auto</Label>
          <Select id="car-type" name="type" onChange={(e) => handleChange(e)} required>
            <option value={null}>--- Seleccionar ---</option>
            <option value="auto">Auto</option>
            <option value="camioneta">Camioneta</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="car-motor">Motor</Label>
          <Input id="car-motor" type="text" name="motor" required />
        </div>

        <div>
          <Label htmlFor="car-brand">Marca</Label>
          <Select id="car-brand" name="brand" onChange={(e) => handleChange(e)} required>
            <option value={null}>--- Seleccionar ---</option>
            {brand.brands &&
              brand.brands.map((marca, index) => (
                <option value={marca._id} key={index}>
                  {marca.name}
                </option>
              ))}
          </Select>
        </div>

        {error && (
          <Alert variant="danger" role="alert">
            {error}
          </Alert>
        )}

        <div className="flex justify-center">
          <Button type="submit">Agregar auto</Button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
