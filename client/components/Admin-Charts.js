import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Rating,
  Icon,
  Image,
  Item,
  Container,
  Comment,
  Header,
  Form,
  Label,
  Button,
  Confirm
} from 'semantic-ui-react'
import {Bar} from 'react-chartjs-2'
import {getOrders} from '../store/order'

class AdminCharts extends React.Component {

  componentDidMount() {
    this.props.getOrders()

  }


  render() {
    const orders = this.props.orders
    console.log(orders)
    let dataObj
    if (orders) {
      dataObj = dollarData(orders)
      console.log(dataObj)
    }

    return(
      <div>
      <h3>Number of Orders by Dollar Value</h3>
      {dataObj.legend ? <Bar data={{labels: dataObj.legend,
	datasets: [
		{
			label: "Orders By Dollar Value",
			fillColor: "rgba(54,181,155,0.5)",
			strokeColor: "rgba(60,180,150,0.8)",
			highlightFill: "rgba(75,166,170,0.75)",
			highlightStroke: "rgba(50,80,200,1)",
			data: dataObj.data
		}
	]}} /> : ''}

      </div>
    )

  }
}



const mapStateToProps = state => ({
  orders: state.orders


})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getOrders())

})

export default connect(mapStateToProps, mapDispatchToProps)(AdminCharts)



function dollarData(orderData) {

  const legend = ["<$10", "$10-$20", "$20-30", "$30-40", "$40-50", "$50-100", "$100+"]
  const data = [0, 0, 0, 0, 0, 0, 0]

  for (let i=0; i<orderData.length; i++) {
    let amount = Number(orderData[i].totalAmount)
    switch(true) {
      case (amount < 1000):
        data[0] += 1
        break;
      case (amount < 2000):
        data[1] += 1;
        break;
      case (amount < 3000):
        data[2] += 1;
        break;
      case (amount < 4000):
        data[3] += 1;
        break;
      case (amount < 5000):
        data[4] += 1;
        break;
      case (amount < 10000):
        data[5] += 1;
        break;
      default:
        data[6] += 1;
        break;
    }
  }

    const dataObj = {
      data: data,
      legend: legend
    }

    return dataObj
  }










