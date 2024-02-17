import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    "name": "Page A",
    "pv": 4000,
    "uv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "pv": 3000,
    "uv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "pv": 2000,
    "uv": 2800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "pv": 2780,
    "uv": 1908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "pv": 1890,
    "uv": 3690,
    "amt": 2181
  },
  {
    "name": "Page F",
    "pv": 2390,
    "uv": 5800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "pv": 1490,
    "uv": 7380,
    "amt": 2100
  }
]


export default class Exampleneg extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorpv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF312E" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FF312E" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#FF312E" fillOpacity={1} fill="url(#colorpv)" />
          </AreaChart>
      </ResponsiveContainer>
    );
  }
}

