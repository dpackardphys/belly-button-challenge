const bellyButtonUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {
  let dropDownMenu = d3.select("#selDataset");

  d3.json(bellyButtonUrl).then((data) => {
    let subjectIds = data.names;
    subjectIds.forEach((sample) => {
      dropDownMenu.append("option").text(sample).property("value",sample)
    });
    let initSample = subjectIds[0];
    // console.log(data.metadata);
    buildMeta(initSample);
    buildChart(initSample);
  });
};

function buildMeta(sample) {
  let infoBox = d3.select("#sample-metadata");

  d3.json(bellyButtonUrl).then((data) => {
    let metaData = data.metadata;
    let sampleMetaData = metaData.filter(row => row.id == sample);
    // console.log(sampleMetaData);
    infoBox.selectAll("p").remove();
    sampleMetaData.forEach(row => {
      for (const [key, value] of Object.entries(row)) {
        infoBox.append("p").text(`${key}: ${value}`);
      };    
    });
  });
};

function buildChart(sample) {
  d3.json(bellyButtonUrl).then((data) => {
    // console.log('samples[0]["otu_ids"]', data['samples'][0]["otu_ids"]);
    // console.log('samples[0]["sample_values"]', data['samples'][0]["sample_values"]);
    // console.log(data.samples);
    let sampleData = data.samples.filter(row => row.id == sample);
    // console.log(sampleData);
    // console.log(sampleData[0]["otu_ids"]);
    let slicedOtuIds = sampleData[0]["otu_ids"].slice(0,10);
    let slicedOtuLabels = sampleData[0]["otu_labels"].slice(0,10);
    let slicedSampleValues = sampleData[0]["sample_values"].slice(0,10);
    let otuIds = slicedOtuIds.reverse();
    let otuLabels = slicedOtuLabels.reverse();
    let sampleValues = slicedSampleValues.reverse();

    let trace1 = {
      x: sampleValues,
      y: otuIds.map(elt => `OTU ${elt}`),
      text: otuLabels,
      type: 'bar',
      orientation: 'h'
    };
    let data1 = [trace1];
    let layout1 = {
      title: "Sample Values"
    };

    let allOtuIds = sampleData[0]["otu_ids"];
    let allOtuLabels = sampleData[0]["otu_labels"];
    let allSampleValues = sampleData[0]["sample_values"];

    let trace2 = {
      x: allOtuIds,
      y: allSampleValues,
      text: allOtuLabels,
      mode: 'markers',
      marker: {
        color: allOtuIds,
        colorscale: 'Earth',
        size: allSampleValues
      }
    };
    let data2 = [trace2];
    let layout2 = {showlegend: false};
    
    Plotly.newPlot("bar", data1, layout1);
    Plotly.newPlot("bubble",data2,layout2)
  });
};

function optionChanged(sample) {
  buildMeta(sample);
  buildChart(sample);
  buildGauge(sample);
};


init();



// console.log("data", jsonData);
    // console.log("names", jsonData["names"]);
    // console.log("metadata", jsonData["metadata"]);
    // console.log("samples", jsonData["samples"])
    // console.log("metadata[0]", jsonData['metadata'][0]);
    // console.log("samples[0]", jsonData['samples'][0]);
    // console.log('samples[0]["otu_ids"]', jsonData['samples'][0]["otu_ids"]);
    // console.log('samples[0]["otu_labels"]', jsonData['samples'][0]["otu_labels"]);
    // console.log('samples[0]["sample_values"]', jsonData['samples'][0]["sample_values"]);
    // console.log('samples[0]["sample_values"] first 10?', jsonData['samples'][0]["sample_values"].slice(0,10));

    // let otuIds = jsonData['samples'][0]["otu_ids"].slice(0,10);
    // let sampleValues = jsonData['samples'][0]["sample_values"].slice(0,10);
    
    // let trace1 = {
    //     x: sampleValues,
    //     y: otuIds,
    //     type: 'bar',
    //     orientation: 'h'
    //   };
      
    // let data = [trace1];
      
    // let layout = {
    //     title: "Sample Values"
    //   };
      
    // Plotly.newPlot("bar", data, layout);





