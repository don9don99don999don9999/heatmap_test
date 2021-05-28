import "./styles.css";
import React from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default class App extends React.Component {
  state = {
    loading: false,
    ItemList: [] // 처음 Itemlist는 있는 상태로 기획 []
  };

  loadItem = async () => {
    // Json Data 불러오기
    axios // axios를 이용해
      .get("http://127.0.0.1:8000/FileData/") // json을 가져온다음
      .then(({ data }) => {
        console.log(data);
        // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
        this.setState({
          loading: true, // load되었으니 true,
          ItemList: data.results // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
        });
      })
      .catch((e) => {
        // json이 로드되지않은 시간엔
        console.error(e); // 에러표시
        this.setState({
          loading: false // 이때는 load 가 false 유지
        });
      });
  };
  componentDidMount() {
    this.loadItem();
  }

  render() {
    const { ItemList } = this.state;

    const Read_csv2 = ItemList.map((value) => {
      return value.Read_csv2;
    });
    const Read_csv = ItemList.map((value) => {
      return value.Read_csv;
    });
    console.log(Read_csv2);
    const dummy_props = [
      "AT1G01010",
      "AT1G01020",
      "AT1G01030",
      "AT1G01040",
      "AT1G01050",
      "AT1G01060",
      "AT1G01070",
      "AT1G01080",
      "AT1G01090",
      "AT1G01100"
    ];

    console.log(test_function(1, Read_csv, Read_csv2));

    function test_function(data1, data2, data3) {
      var genename_idx = data1;
      var hormonename = data2;
      var meanvalue = data3;
      var series2 = [];

      meanvalue.map((value, i) => {
        var x = hormonename[i][0][0][0];
        var y = value[0][genename_idx];

        series2.push({
          x: x,
          y: y
        });
        return series2;
      });
      return series2;
    }

    function dummy(dummy_props, Read_csv, Read_csv2) {
      var series_options = [];

      dummy_props.map((value, idx) => {
        var name1 = value;
        var data = test_function(idx, Read_csv, Read_csv2);
        series_options.push({
          name: name1,
          data: data
        });
        return series_options;
      });
      return series_options;
    }

    console.log(
      generateData(3, {
        min: 0,
        max: 90
      })
    );
    function generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = "w" + (i + 1).toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    }
    var series33 = dummy(dummy_props, Read_csv, Read_csv2);
    var options = {
      options: {
        chart: {
          height: 350,
          type: "heatmap"
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#008FFB"],
        title: {
          text: "HeatMap Chart (Single color)"
        }
      }
    };
    console.log(options);
    console.log(dummy_props);
    console.log(series33);

    return (
      <Chart
        options={options}
        series={series33}
        type="heatmap"
        width={500}
        height={320}
      />
    );
  }
}
