function init() {
    d3.json(bellyButtonUrl).then((data) => {
        let subjectIds = data.names;
        let initSample = subjectIds[0];
        buildGauge(initSample);
    });
};

function buildGauge(sample){
    d3.json(bellyButtonUrl).then((data) => {
        let metaData = data.metadata;
        let sampleMetaData = metaData.filter(row => row.id == sample);
        console.log(sampleMetaData);
        let wfreq = sampleMetaData[0].wfreq;
        console.log(wfreq);

        let data1 = [
            {
              type: "indicator",
              mode: "gauge",
              value: wfreq,
              title: "Scrubs Per Week",
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 1], color: 'azure' },
                  { range: [1, 2], color: 'lightcyan' },
                  { range: [2, 3], color: 'cyan' },
                  { range: [3, 4], color: 'turquoise' },
                  { range: [4, 5], color: 'darkturquoise' },
                  { range: [5, 6], color: 'deepskyblue' },
                  { range: [6, 7], color: 'dodgerblue' },
                  { range: [7, 8], color: 'steelblue' },
                  { range: [8, 9], color: 'teal' }
                ],
                colorscale: 'Electric'
              }
            //   colorscale: 'Electric' 
            }
        ];
          
        var layout = {
            title: "Belly Button Washing Frequency",
        };
          
        Plotly.newPlot('gauge', data1, layout);
    });
};

init();