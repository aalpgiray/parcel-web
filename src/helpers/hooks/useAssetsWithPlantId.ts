import { useState, useEffect } from "react";
import { useStore, useActions } from "../../store";
import { Asset } from "../../store/model/asset";

const useAssetsWithPlantId = (
  plantId: string,
  companyId: string,
): [Asset[], React.Dispatch<React.SetStateAction<string>>] => {
  const [search, setSearch] = useState("");

  const assets = useStore((store) => store.asset.assets);
  const fetchAssets = useActions((actions) => actions.asset.fetchAssets);

  useEffect(() => {
    fetchAssets({ plantId, companyId });
  }, [plantId]);

  return [
    (assets[plantId] || ([] as Asset[])).filter(
      (asset) =>
        asset.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1,
    ),
    setSearch,
  ];
};

export default useAssetsWithPlantId;
