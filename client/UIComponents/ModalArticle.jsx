import React from 'react';
import { Modal, Card, Icon, Avatar, Spin } from 'antd/lib';
const { Meta } = Card;
import { getInitials } from '../functions';

class ModalArticle extends React.Component {
	
  render() {

    const { isLoading, item, imageSrc } = this.props;
    const username = Meteor.user().username || 'AB';

    return (
      <Modal
        {...this.props} style={{top: 20}} > 
        {
          isLoading 
          ?
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Spin size="large" />
            </div>
          :
            <Card
              title={<div><h1>{item.title}</h1><h3 style={{color: 'rgba(0,0,0,.65)'}}>{item.shortDescription}</h3></div>}
              bordered={false}
              cover={<img alt="example" src={imageSrc} />}
            >
              <Meta
                avatar={<Avatar>{username}</Avatar>}
                title={`${item.room}, Noden`}
                description={item.longDescription}
              />
            </Card>
        }
      </Modal>
    )
  }
}

export default ModalArticle;