import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {useEffect, useState} from "react";
import {getMonthlyAggregate} from "../../../../amplify/utils/lambdas.ts";
import {DataItem} from "../../../../amplify/utils/model.ts";



export default function Overview() {
    const [data, setData] = useState<DataItem[]>([]);
    useEffect(() => {
        async function fetchAggregate() {
            setData(await getMonthlyAggregate())
        }
        fetchAggregate();
    }, [])
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
