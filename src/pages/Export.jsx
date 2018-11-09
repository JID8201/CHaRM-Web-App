import React from 'react'
import { inject, observer } from 'mobx-react'
import CsvExporter from '../components/CsvExporter';

@inject('recyclingStore')
@observer
class Export extends React.Component {
  render() {
    return (
      <div>
        This is the Export Page
        <CsvExporter />
      </div>
    )
  }
}

export default Export
