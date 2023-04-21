// load json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){
    console.log(data.metadata[0]);
    populate_combo_box(data.names);
    populate_demographic_info(data.metadata[0]);
    const chartdata=data.samples.filter(sample=>sample.id==data.metadata[0].id)[0]
    create_charts(chartdata);
    
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
      let matchid = data.samples.filter(sampid=> sampid.id==id);
      console.log(matchid)
      populate_demographic_info(data.metadata.filter(matchid=> matchid.id==id)[0]);
      
      create_charts(matchid[0]);
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

function create_charts(sample){
  console.log(sample)
  
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