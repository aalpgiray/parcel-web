import { useEffect, useState } from "react";
import { useStore, useActions } from "../../store";
import { getMultimediaUrl } from "../../services/datasetService";
import { path } from "d3";

export interface UseAssetWithAssetIdProps {
  plantId: string;
  assetId: string;
  sectionId: string;
}

const asyncSetUrl = (src: string) => async (setUrl: (url: string) => void) => {
  const url = await getMultimediaUrl(src);
  setUrl(url);
};

const useAssetWithAssetId = ({
  assetId,
  plantId,
  sectionId,
}: UseAssetWithAssetIdProps) => {
  const assets = useStore((state) => state.asset.assets)[plantId];
  const fetchAsset = useActions((actions) => actions.asset.fetchAssetWithAssetId);
  const [filePath, setFilePath] = useState<string>();
  const asset = assets && assets.find((a) => a.id === assetId);

  useEffect(() => {
    if (asset) {
      return;
    }

    fetchAsset({
      assetId,
      plantId,
    });
  }, [assetId]);

  useEffect(() => {
    if (asset) {
      asyncSetUrl(asset.files[0].path)(setFilePath);
    }
  }, [asset && asset.files[0].path]);

  return (
    asset && {
      name: asset.name,
      filePath,
      section: asset.sections.find((s) => s.id === sectionId),
    }
  );
};

export default useAssetWithAssetId;
