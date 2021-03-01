import React, { useEffect, useState } from 'react';
import useFetch from 'use-http'
import { Line } from '@ant-design/charts';

const COLORS = [
  '#2E6ABD', '#ED1248'
]

function Page() {
    const [config, setConfig] = useState({});
    const { loading, data: mullergoalsJSON = [] } = useFetch('https://raw.githubusercontent.com/korczynsk1/lewyvsmuller/main/src/mullergoals.json', {}, [])
    const { data: lewygoalsJSON = [] } = useFetch('https://raw.githubusercontent.com/korczynsk1/lewyvsmuller/main/src/lewygoals.json', {}, [])

    useEffect(() => {
      async function fetchData() {
        if (!loading) {
              const lewy = lewygoalsJSON.map(el => ({...el, key: 'Lewandowski'}))
              const muller = mullergoalsJSON.map(el => ({...el, key: 'Müller'}))
              const data = [...lewy, ...muller];
              const sorted = data.sort((el1, el2) => el1.round - el2.round);
              setConfig({
                  data: sorted,
                  xField: 'round',
                  yField: 'goals',
                  color: COLORS,
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
                  tooltip: {
                    customContent: (title, data) => {
                      return `<div>
                        <div class="g2-tooltip-title">Round: ${title}</div>
                        <ul class="g2-tooltip-list">
                          ${data.map(element => `<li class="g2-tooltip-list-item">
                          <span class="g2-tooltip-marker" style="background-color: ${element.color}; width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 8px;"></span>
                          <span class="g2-tooltip-name">${element.data.key}</span>:
                          <span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">${element.data.goals}</span>
                          </li>`).join(' ')}
                        </ul>
                      </div>`;
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
        }
        fetchData()
    }, [loading, mullergoalsJSON, lewygoalsJSON])

    if (!loading && config && config.data) {
        return (<div id="chart"><Line {...config} /></div>);
    } else {
        return (<p>Loading...</p>)
    }
}
export default Page;