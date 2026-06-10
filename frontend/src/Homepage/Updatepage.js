import Update from "./Update";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../Utils/localAuth";

const DataMenupage = () => {
  const params = useParams();
  const urlParams = params.idAdmin;
  const [data, setData] = useState();

  useEffect(() => {
    const localData = getData();
    const menuItem = localData.menus?.find(
      (item) => String(item.idMenu) === String(urlParams)
    );
    setData(menuItem);
  }, [urlParams]);

  return <div>{data && <Update data={data} />}</div>;
};

export default DataMenupage;
