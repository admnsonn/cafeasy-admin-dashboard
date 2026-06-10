import Layout from "../Layout";
import DataPelanggancomp from "./DataPelanggancomp";
import { useEffect, useState } from "react";
import { getData } from "../../Utils/localAuth";

const DataPelangganpage = () => {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    const localData = getData();
    setData({ data: localData.customers?.data ?? [] });
  }, []);

  return (
    <Layout>
      <DataPelanggancomp data={data} />
    </Layout>
  );
};

export default DataPelangganpage;
