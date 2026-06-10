import Logoputih from '../Photos/Logoputih.png';
import { useNavigate } from 'react-router-dom';
import * as React from "react";



const Landingcomp = () => {
    const time = 3000;
    const navigate = useNavigate();
    const [counter, setCounter] = React.useState(3);

    setInterval(() => setCounter(counter - 1), 1000);

    React.useEffect(() => {


        setTimeout(() => {

            navigate('/LoginAdmin', { replace: true });
        }, time
        );
    }, []);

    return (
        <div>
            <div className="h-screen bg-gray-900">
                <div className="absolute w-[74.5px] h-[93px] left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2">
                    <img src={Logoputih}></img>
                </div>
                <div className="absolute font-black text-2xl text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">CAFEASY</div>
                <div className="absolute w-[71px] h-7 text-center text-xs uppercase text-white left-1/2 top-3/5 -translate-x-1/2 -translate-y-1/2">from hallodeck</div>
                <div className="absolute w-80 h-7 text-center text-xs uppercase text-white left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2">Redirect to Login Admin in {counter} ....</div>
                <div className="absolute w-56 h-4 text-center text-xs text-white opacity-50 left-1/2 top-[90%] -translate-x-1/2 -translate-y-1/2 tracking-tight">© 2022-2023 CAFEASY All Rights Reserved.</div>

            </div>


        </div>
    )
}






export default Landingcomp