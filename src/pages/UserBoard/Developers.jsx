import Deverloper from "./Deverloper";
import { useState, useEffect } from "react";
import axios from "./../../axios.js";
import Spinner from "./../../components/ui/Spinner";
import { Link } from "react-router-dom";
const Developers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/users/allusers`);
        setData(response.data.data.users);
        console.log(response.data.data.users);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[400px]">
        <Spinner size={25} color={"#ffffff"} />
      </div>
    );
  }

  return (
    <div className="mt-[98px] grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-y-[45px] gap-x-[19px]">
      {data.map((el) => {
        return (
          <Link to={`/account/${el._id}`}>
            <Deverloper key={el.id} data={el} />
          </Link>
        );
      })}
    </div>
  );
};

export default Developers;
