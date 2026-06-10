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
    <Layout>
      <DataKategoricomp data={data} />
    </Layout>
  );
};

export default DataKategoripage;
