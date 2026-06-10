import Layout from "../Layout";
import DataKategoricomp from "./DataKategoricomp";
import { useEffect, useState } from "react";
import { getData } from "../../Utils/localAuth";

const DataKategoripage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const localData = getData();
    setData(localData.kategoris ?? []);
  }, []);

  return (
    <div>
      <Layout />
      <DataKategoricomp data={data} />
    </div>
  );
};

export default DataKategoripage;
