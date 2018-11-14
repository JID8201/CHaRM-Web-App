import React from 'react'
import { PieChart, Pie, Cell, Sector, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import PropTypes from 'prop-types'

class Graph extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8E44AD',
    '#48C9B0',
    '#ed1683',
    '#870202',
    '#a58d6f',
    '#d1999f',
    '#ffb56a'
  ]

  renderActiveShape = (pieChart) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent } = pieChart
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill='#333'>{payload._id.items}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload._id.items}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  };

  getInitialState() {
    return {
      activeIndex: 0,
    }
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    })
  }

  pie = (data) => {

    return (
      <PieChart width={800} height={400}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={this.renderActiveShape}
          dataKey='amount'
          data={data}
          cx={300}
          cy={200}
          innerRadius={100}
          outerRadius={120}
          fill="#8884d8"
          onMouseEnter={this.onPieEnter}
        >
          {
            data.map((_, i) => <Cell key={i} fill={this.COLORS[i % this.COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    )
  }

  bar = (data) => {
    return (
      <BarChart width={600} height={300} data={data}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="_id.items"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="amount" fill="#8884d8" >
          {
            data.map((_, i) => <Cell key={i} fill={this.COLORS[i % this.COLORS.length]}/>)
          }
        </Bar>
      </BarChart>
    )
  }

  render() {
    const { graph, data } = this.props
    if (graph === 'bar') {
      return (
        <div>
          {this.bar(data)}
        </div>
      )
    } else if (graph === 'donut') {
      return (
        <div>
          {this.pie(data)}
        </div>
      )
    } else {
      return (
        <div>
          Something went very wrong
        </div>
      )
    }
  }
}

Graph.propTypes = {
  graph: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}
export default Graph
