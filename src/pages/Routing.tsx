import  {FunctionComponent} from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "@/pages/Dashboard.tsx";

type Props = {};

export const Routing: FunctionComponent<Props> = ({}) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Routes>
                <Route path='/' element={<Dashboard />}/>
                <Route path='/products' element={<Dashboard />}/>
                <Route path='customers'  element={<Dashboard />}/>
            </Routes>
        </div>

    )
}