import React, { useEffect, useState } from 'react';
import useFetch from 'use-http'
import { Line } from '@ant-design/charts';

function Page() {
    const [config, setConfig] = useState({});
    const { loading, data: mullergoalsJSON = [] } = useFetch('https://raw.githubusercontent.com/korczynsk1/lewyvsmuller/main/src/mullergoals.json', {}, [])
    const { data: lewygoalsJSON = [] } = useFetch('https://raw.githubusercontent.com/korczynsk1/lewyvsmuller/main/src/lewygoals.json', {}, [])

    useEffect(() => {
      async function fetchData() {
        if (!loading) {
              const lewy = lewygoalsJSON.map(el => ({...el, key: 'lewy'}))
              const muller = mullergoalsJSON.map(el => ({...el, key: 'muller'}))
              const data = [...lewy, ...muller];
              const sorted = data.sort((el1, el2) => el1.round - el2.round);
              setConfig({
                  data: sorted,
                  xField: 'round',
                  yField: 'goals',
                  height: window.outerHeight*0.9,
                  label: {
                      style:{
                        fontSize: 16,
                        fontWeight: 300,
                        textAlign: 'center',
                        textBaseline: 'middle',
                      }
                  },
                  xAxis: {
                      label: {
                        style: {
                          fontSize: 26,
                        }
                      }
                  },
                  yAxis: {
                      label: {
                        style: {
                          fontSize: 26,
                        }
                      }
                  },
                  seriesField: 'key',
                  legend: { position: 'top' },
                  smooth: false,
                  animation: {
                    appear: {
                      animation: 'path-in',
                      duration: 5000,
                    },
                  },
              })
            }

            // setConfig({
            //     data: [data, data],
            //     xField: 'round',
            //     yField: ['muller', 'lewy'],
            //     geometryOptions: [
            //     {
            //         geometry: 'line',
            //         smooth: false,
            //         color: '#5AD8A6',
            //         lineStyle: {
            //         lineWidth: 3,
            //         opacity: 0.5,
            //         },
            //         label: {
            //         formatter: (datum) => {
            //             return `${datum.muller}`;
            //         },
            //         },
            //         point: {
            //         shape: 'circle',
            //         size: 4,
            //         style: {
            //             opacity: 0.5,
            //             stroke: '#5AD8A6',
            //             fill: '#fff',
            //         },
            //         },
            //     },
            //     {
            //         geometry: 'line',
            //         smooth: false,
            //         color: '#5B8FF9',
            //         label: {
            //         formatter: (datum) => {
            //             return `${datum.lewy}`;
            //         },
            //         },
            //         lineStyle: {
            //         lineWidth: 3,
            //         lineDash: [5, 5],
            //         },
            //         point: {
            //             shape: 'circle',
            //             size: 4,
            //             style: {
            //             opacity: 0.5,
            //             stroke: '#5B8FF9',
            //             fill: '#fff',
            //             },
            //         },
            //     },
            //     ]
            // })
        }
        fetchData()
    }, [loading, mullergoalsJSON, lewygoalsJSON])

    if (!loading && config && config.data) {
        console.log('data', config);
        return (
        <Line {...config} />);
    } else {
        return (<p>Loading...</p>)
    }
}
export default Page;