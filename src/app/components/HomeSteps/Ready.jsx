import { CircleCheck } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

const Ready = ({ step }) => {
  const handleSubmit = () => {
    step(1);
  };

  return (
    <Card className="h-fit p-6 text-center sm:p-10">
      <h1 className="p-4 text-2xl font-bold">Listo</h1>
      <CircleCheck className="mx-auto h-16 w-16 text-success" aria-hidden="true" />
      <p className="p-6 text-ink">
        Podés revisar los datos en el resumen. Si está todo bien, hacé click en{" "}
        <strong>Sacar turno</strong>.
      </p>
      <Button className="w-full sm:w-1/3" onClick={handleSubmit}>
        Revisar
      </Button>
    </Card>
  );
};

export default Ready;
