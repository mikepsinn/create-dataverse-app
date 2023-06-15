import React, { useState } from "react";
import { useCreateAsset, useUpdateAsset } from "@livepeer/react";
import LivepeerClient from "@dataverse/livepeer-client-toolkit";

interface IProps {
  livepeerClient: LivepeerClient;
  asset: any;
  setAsset: Function;
}
export const LivepeerWidget = ({ livepeerClient, asset, setAsset }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState<any>(null);
  const { mutateAsync: createAssetAsync } = useCreateAsset(
    fileInput
      ? {
          sources: [{ name: fileInput.name, file: fileInput }],
        }
      : null
  );

  const { mutateAsync: updateAssetAsync } = useUpdateAsset(
    asset
      ? {
          assetId: asset.id,
          storage: { ipfs: true },
        }
      : null
  );

  const handleFileUpload = async () => {
    // stream name input check empty
    if (!fileInput) throw new Error("Please select a file");
    try {
      setLoading(true);
      const asset = await createAssetAsync();
      console.log("created asset:", asset);
      if (!asset) {
        throw new Error("Asset undefined");
      }
      if ((asset[0] as any).status.errorMessage) {
        throw new Error((asset[0] as any).status.errorMessage);
      }
      const res = await livepeerClient.createAssetMetaStream(asset[0]);
      console.log("livepeerClient createAssetMetaStream res: ", res);
      setAsset(asset[0]);
      console.log("File uploaded successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error while uploading file:", err);
    }
  };

  const uploadFileToIpfs = async () => {
    // stream name input check empty
    if (!asset) throw new Error("Please create asset first");
    try {
      setLoading(true);
      const asset = await updateAssetAsync();
      console.log("updated asset:", asset);
      if (!asset) {
        throw new Error("Asset undefined");
      }
      const res = await livepeerClient.updateAssetMetaStream(asset);
      console.log("livepeerClient updateAssetMetaStream res: ", res);
      setAsset(asset);
      console.log("Asset saved to Ipfs successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error while saving asset to Ipfs:", err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileInput(files[0]);
    } else {
      setFileInput(null);
    }
  };

  const getAssetList = async () => {
    const res = await livepeerClient.getAssetList();
    console.log("res:", res);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        className="upload"
        accept="video/*"
      />
      <button onClick={handleFileUpload} disabled={loading}>
        UploadToLivepeer
      </button>
      <button onClick={uploadFileToIpfs} disabled={loading}>
        UploadFileToIpfs
      </button>
      <button onClick={getAssetList}>getAssetList</button>
    </div>
  );
};
