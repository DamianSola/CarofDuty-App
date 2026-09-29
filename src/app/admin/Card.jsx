import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const CardItem = ({ title, showAddButton = true }) => {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="flex flex-wrap gap-3">
        <Button variant="danger">Ver</Button>
        {showAddButton && (
          <Button>Agregar</Button>
        )}
      </div>
    </Card>
  );
};

export default CardItem;
