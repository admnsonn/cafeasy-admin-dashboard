import Layout from "../Layout";
import Bannercomp from "./Bannercomp";
import { useEffect, useState } from "react";
import { getData } from "../../Utils/localAuth";

const Bannerpage = () => {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    const localData = getData();
    setData({ data: localData.banners ?? [] });
  }, []);

  return (
    <div>
      <Layout />
      <Bannercomp data={data} />
    </div>
  );
};

export default Bannerpage;
