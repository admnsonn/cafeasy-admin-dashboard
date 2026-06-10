import Layout from "../Layout";
import DataTransaksicomp from "./DataTransaksicomp";
import { useEffect, useState } from "react";
import { getData } from "../../Utils/localAuth";

const DataTransaksipage = () => {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    const localData = getData();
    setData({ data: localData.transaksi ?? [] });
  }, []);

  return (
    <div>
      <Layout />
      <DataTransaksicomp data={data} />
    </div>
  );
};

export default DataTransaksipage;
