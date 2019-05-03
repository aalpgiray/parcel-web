import { useStore, useActions } from "../../store";
import { useEffect } from "react";
import { Plant } from "../../store/model/plant";
import { Asset } from "../../store/model/asset";

const usePlantsAndAssetsWithCompanyId = (
  companyId: string,
): [Plant[], Record<string, Asset[] | undefined>] => {
  const plants = useStore((state) => state.plant.plants);
  const assets = useStore((state) => state.asset.assets);

  const { fetchPlants, fetchAssets } = useActions((actions) => ({
    ...actions.asset,
    ...actions.plant,
  }));

  useEffect(() => {
    fetchPlants(companyId);
  }, [companyId]);

  useEffect(() => {
    plants.forEach((plant) => {
      fetchAssets({
        companyId,
        plantId: plant.id,
      });
    });
  }, [plants]);

  return [plants, assets];
};

export default usePlantsAndAssetsWithCompanyId;
