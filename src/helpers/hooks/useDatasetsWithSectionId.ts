import { useStore, useActions } from "../../store";
import { useEffect } from "react";

const useDatasetsWithSectionId = (sectionId: string) => {
  const datasets = useStore((store) => store.dataset.datasetList);
  const fetchDataset = useActions((actions) => actions.dataset.fetchDataset);

  useEffect(() => {
    fetchDataset(sectionId);
  }, [sectionId]);

  return datasets;
};

export default useDatasetsWithSectionId;
