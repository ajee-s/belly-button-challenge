// load json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){
    console.log(data.metadata[0]);
    populate_combo_box(data.names);
    populate_demographic_info(data.metadata[0]);
    create_charts(data.names[0]);
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
      create_charts(id);
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
  let select=d3.select("#sample-values");
  //let firstTen = data.otu_ids.slice(0, 10);
  let trace1={
    x:[data.sample_values],
    y:[data.otu_ids],
    type: 'bar',
    orientation: 'h'
  }

  let trace2={
    x:[data.otu_ids],
    y:[data.sample_values],
    mode: 'markers',
  marker: {
    color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
    size: [data.sample_values]
  }
  }


  Plotly.newPlot("bar", trace1);
  Plotly.newPlot("bubble", trace2);
    //d3.json(url).then(function(data){
        //console.log(data);
        //create main chart
        //let layout = { title: "test"};
        //Plotly.newPlot("bar", data, layout);
      //create bubble chart
       // Plotly.newPlot("bubble", data, layout);
      //create a gauge chart 
       // Plotly.newPlot("gauge", data, layout); 
    //})



}

