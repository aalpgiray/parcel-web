import { useState, useEffect } from "react";
import { useStore, useActions } from "../../store";
import { Plant } from "../../store/model/plant";

const usePlantsWithCompanyId = (
  companyId: string,
): [Plant[], React.Dispatch<React.SetStateAction<string>>] => {
  const [search, setSearch] = useState("");

  const plants = useStore((store) => store.plant.plants);
  const fetchPlants = useActions((actions) => actions.plant.fetchPlants);

  useEffect(() => {
    fetchPlants(companyId);
  }, [companyId]);

  return [
    plants.filter(
      (plant) =>
        plant.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1,
    ),
    setSearch,
  ];
};

export default usePlantsWithCompanyId;
