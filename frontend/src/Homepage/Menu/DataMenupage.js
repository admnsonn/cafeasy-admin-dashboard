import Layout from "../Layout";
import DataMenucomp from "./DataMenucomp";
import { useEffect, useState } from "react";
import { getData } from "../../Utils/localAuth";

const DataMenupage = () => {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    const localData = getData();
    setData(localData.menus ?? []);
    setKategori(localData.kategoris ?? []);
  }, []);

  return (
    <div>
      <Layout />
      <DataMenucomp data={data} kategori={kategori} />
    </div>
  );
};

export default DataMenupage;
