// Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

function dropdown(){
    d3.json("./samples.json").then(data => {
        var sampleName = data.names;
        var dataid = d3.select("#selDataset")
        sampleName.forEach((sampleid)=> {
            dataid.append("option")
                .text(sampleid)
                .property("value", sampleid)
        })
        var firstSample = sampleName[0];
        metadata(firstSample);
        Charts(firstSample);
    // console.log(sampleId)
    });
};

dropdown();

function metadata(id) {
    d3.json("./samples.json").then(data => {
        var sampleMetadata = data.metadata;
        var result = sampleMetadata.filter(obj => obj.id == id);
        var filterresult = result[0];
        var display = d3.select("#sample-metadata");
        display.html("");
        Object.entries(filterresult).forEach(([key, value]) => {
            display.append("h6").text(`${key} ${value}`);
        });
    });
}

// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

function Charts(id){
    d3.json("./samples.json").then(data => {
        var sampledata = data.samples;
        var result = sampledata.filter(obj => obj.id == id);
        var filterresult = result[0];
        var otu_ids = filterresult.otu_ids;
        var otu_labels = filterresult.otu_labels;
        var sample_values = filterresult.sample_values;

        var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Picnic"
            }
        }];
        
        var barData = [{
            y: otu_ids.slice(0, 10).map(val => `OTU ${val}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            border: 2
        }];

        Plotly.newPlot("bar", barData);

        Plotly.newPlot("bubble", bubbledata);
    });
};

function optionChanged(changeid) {
    metadata(changeid);
    Charts(changeid);
};


