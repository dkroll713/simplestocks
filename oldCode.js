useEffect(() => {
  if (document.getElementById(ticker) && props !== undefined) {
    let chartStatus = Chart.getChart(ticker);
    if (chartStatus !== undefined) {
      chartStatus.destory();
    }
    // document.getElementById(`${ticker}`).remove();
    // let canvas = document.createElement('canvas');
    // canvas.setAttribute('id', ticker)
    // canvas.setAttribute('className', 'canvas')
    // document.querySelector('.chartContainer'+ticker).appendChild(canvas)
    const ctx = document.getElementById(ticker)
    const priceChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        labels: chart.labels,
        datasets: [{
            label: `${ticker} - 3m`,
            data: chart.prices,
            pointBackgroundColor: function(context) {
              let index = context.dataIndex;
              let value = context.dataset.data[index];
              if (context.dataset.data[index - 1]) {
                let priorValue = context.dataset.data[index - 1]
              }
              // console.log(value.y);
              if (context.dataset.data[index - 1]) {
                return index === (chart.prices.length - 1)  ? 'black' :
                value.y > context.dataset.data[index-1].y ? 'green' : 'red';
              } else {
                return 'black'
              }
            },
            backgroundColor: function(context) {
              let index = context.dataIndex;
              // console.log(index);
              let priorValue = context.dataset.data[index - 1]
              let value = context.dataset.data[index];
              // console.log(value);
              return index === (chart.prices.length - 1) ? 'black' : index % 2 ? 'blue' : 'green';
            },
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            pointRadius: 5,
            showLine: true,
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(ctx) {
                // console.log(chart.labels[ctx.datasetIndex])
                // console.log(ctx)
                let label = chart.labels[ctx.datasetIndex]
                label += " price: " + ctx.parsed.y;
                return label;
              }
            }
          }
        },
          scales: {
            x: {
              type: 'linear'
            },
            y: {
                beginAtZero: false
            }
          },
          elements: {
            line: {
              tension: .1,
            }
          }
        }
      })
  }
},[chart])

// if (document.getElementById(ticker) && props !== undefined) {
      // let chartStatus = Chart.getChart(ticker);
      // if (chartStatus !== undefined) {
      //   chartStatus.destory();
      // }
      // document.getElementById(`${ticker}`).remove();
      // let canvas = document.createElement('canvas');
      // canvas.setAttribute('id', ticker)
      // canvas.setAttribute('className', 'canvas')
      // document.querySelector('.chartContainer'+ticker).appendChild(canvas)
      // const ctx = document.getElementById(ticker)
      // const config = {
      //   type: 'candlestick',
      //   cdata,
      //   options: {}
      // }
      // // const priceChart = new Chart(ctx, config);

      // const priceChart = new Chart(ctx, {
      //   type: 'scatter',
      //   data: {
      //     labels: chart.labels,
      //     datasets: [{
      //         label: `${ticker} - 3m`,
      //         data: chart.prices,
      //         pointBackgroundColor: function(context) {
      //           let index = context.dataIndex;
      //           let value = context.dataset.data[index];
      //           if (context.dataset.data[index - 1]) {
      //             let priorValue = context.dataset.data[index - 1]
      //           }
      //           // console.log(value.y);
      //           if (context.dataset.data[index - 1]) {
      //             return index === (chart.prices.length - 1)  ? 'black' :
      //             value.y > context.dataset.data[index-1].y ? 'green' : 'red';
      //           } else {
      //             return 'black'
      //           }
      //         },
      //         pointRadius: 5,
      //         showLine: true,
      //     }]
      //   },
      //   options: {
      //     plugins: {
      //       tooltip: {
      //         callbacks: {
      //           label: function(ctx) {
      //             // console.log(chart.labels[ctx.datasetIndex])
      //             // console.log(ctx)
      //             let label = chart.labels[ctx.datasetIndex]
      //             label += " price: " + ctx.parsed.y;
      //             return label;
      //           }
      //         }
      //       }
      //     },
      //       scales: {
      //         x: {
      //           type: 'linear'
      //         },
      //         y: {
      //             beginAtZero: false
      //         }
      //       },
      //       elements: {
      //         line: {
      //           tension: .1,
      //         }
      //       }
      //     }
      //   })