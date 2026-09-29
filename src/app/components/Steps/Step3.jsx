'use client'
import {useState} from "react"
import { useDispatch } from "react-redux";
import {setDateCustomer} from "./../../../redux/Slices/datesSlices"
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Alert from "../ui/Alert";

const Step3 = ({sprint}) => {
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: "", email:"" , phone:""
    })
    const [error, setError] = useState('');

    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Ingresá un correo electrónico válido');
      } else {
        setError(null);
      }
    };

    const handleChange = (e) => {
        let {name, value} = e.target
        if(name === 'email') validateEmail(value)
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!error) dispatch(setDateCustomer(input))
        setInput({})
        sprint(4)
    }

    return (
        <Card className="mx-auto mb-6 flex flex-col p-5 sm:p-7">
        <p className="text-lg font-semibold text-accent">Paso 3</p>
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Ingresá tus datos</h2>

        <form onSubmit={handleSubmit} onChange={handleChange}>
            <section className="mb-4 w-full">
                <Label htmlFor="customer-name" required>Nombre y apellido</Label>
                    <Input id="customer-name" type="text" name='name'/>
            </section>

            <section className="mb-4 w-full">
                <Label htmlFor="customer-email" required>Correo electrónico</Label>
                    <Input
                    id="customer-email"
                    type="email"
                    name='email'
                    required
                    />
                    {error && <Alert variant="danger" role="alert" className="mt-2">{error}</Alert>}
            </section>

            <section className="mb-4 w-full">
                <Label htmlFor="customer-phone">Teléfono</Label>
                    <Input id="customer-phone" type="text" name='phone'/>
            </section>
                <Button className="w-full" type="submit">
                    Siguiente
                </Button>
        </form>
    </Card>
    )
}

export default Step3;
