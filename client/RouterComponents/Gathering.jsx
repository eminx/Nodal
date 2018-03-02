import React from 'react';
import { Row, Col } from 'antd/lib';
import CardArticle from '../UIComponents/CardArticle';

class Gathering extends React.Component {

  render() {
    return (
    	<div>
    		<Row>
    			<Col span={4} />
    			<Col xs={24} sm={16}>
    				<CardArticle item={this.props.theGathering} isLoading={this.props.isLoading} />
    			</Col>
    			<Col span={4} />
    		</Row>
      </div>
    )
  }
}

export default Gathering;