// load json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){
    console.log(data.metadata[0]);
    populate_combo_box(data.names);
    populate_demographic_info(data.metadata[0]);
    //create_charts(data.names[0]);
    //console.log(data.metadata);
})

//populate combo box
function populate_combo_box(data){
   let select= document.getElementById("selDataset");
   data.forEach(id => {

        let options = document.createElement("option");
        options.setAttribute("value",id);
        options.innerText =id;
        select.appendChild(options)
        
   });
}

//Change options
function optionChanged(id){
    console.log(id);
    d3.json(url).then(function(data){
      let matchid = data.metadata.filter(sampid=> sampid.id==id);
      console.log(matchid)
      populate_demographic_info(matchid[0]);
      
      create_charts(matchid);
    })
}

//populate demographic info
function populate_demographic_info(data){
  let select= d3.select("#sample-metadata");
  select.html("")
for (k in data){       
   select.append("h5").text(`${k}: ${data[k]}`)
}
}



//create initial chart for first id

function create_charts(data){
  //let select=d3.select("#sample-values");
  //select.html("")
  // Find the sample object that matches the selected sample name
  let sampch = data.metadata.id.find(sample => sample.id === id);
  console.log(sampch)
  let trace1={
    x: sample.sample_values.slice(0, 10),
    y: sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`),
    type: 'bar',
    orientation: 'h'
  };

  let trace2={
    x: sample.otu_ids,
    y: sample.sample_values,
    mode: 'markers',
    marker: {
      color: sample.otu_ids,
      size: sample.sample_values
    },
    text: sample.otu_labels
  };

  let layout = {
    xaxis: { title: "OTU ID" },
  };

  Plotly.newPlot("bar", [trace1], layout);
  Plotly.newPlot("bubble", [trace2], layout);
}