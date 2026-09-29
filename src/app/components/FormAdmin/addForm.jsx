"use client";
import { Input, Label, Button } from "../ui";

export const AddCategory = () => {
  return (
    <div className="space-y-4 rounded-md bg-surface p-4">
      <h2 className="text-xl font-bold text-heading">Nueva categoría</h2>
      <form className="space-y-3">
        <Label htmlFor="category-name">Nombre de la categoría</Label>
        <Input id="category-name" type="text" placeholder="Nombre de la categoría" />
        <Button type="submit">Agregar</Button>
      </form>
    </div>
  );
};
