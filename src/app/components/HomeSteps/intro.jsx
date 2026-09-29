import Button from "../ui/Button";
import Card from "../ui/Card";

const Intro = ({ step }) => {
  const handleSubmit = () => {
    step(1);
  };

  return (
    <Card className="p-6 text-center sm:p-10">
      <h1 className="m-auto p-4 text-2xl font-bold sm:text-3xl">
        Hacé el trámite en 4 pasos
      </h1>
      <p className="mb-6 text-muted">
        Elegí tu auto, los servicios, tus datos y la fecha. El resumen se actualiza a medida que avanzás.
      </p>
      <Button className="w-full" onClick={handleSubmit}>
        Empecemos
      </Button>
    </Card>
  );
};

export default Intro;
