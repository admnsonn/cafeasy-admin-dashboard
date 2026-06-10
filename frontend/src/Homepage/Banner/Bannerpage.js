import Layout from "../Layout";
import Bannercomp from "./Bannercomp";
import { useEffect, useState } from "react";
import { getData } from "../../Utils/localAuth";

const Bannerpage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const localData = getData();
    setData(localData.banners ?? []);
  }, []);

  return (
    <Layout>
      <Bannercomp data={data} />
    </Layout>
  );
};

export default Bannerpage;
