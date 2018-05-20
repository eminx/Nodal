import React from 'react';
import CreateGatheringForm from '../UIComponents/CreateGatheringForm';
import ModalArticle from '../UIComponents/ModalArticle';
import { Row, Col, message, Alert, Affix } from 'antd/lib';
import { Redirect } from 'react-router-dom'
import Evaporate from 'evaporate';
import AWS from 'aws-sdk';

const successCreation = () => {
  message.success('Your activity is successfully created', 6);
};

const sideNote = "Please check if a corresponding time and room is not taken already. \n It is your responsibility to make sure that there's no overlapping activities."

class NewGathering extends React.Component {
	state={
		modalConfirm: false,
		values: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    newGatheringId: null,
    uploadedImage: null,
    uploadableImage: null
	}

	registerGatheringLocally = (values) => {
		this.setState({
      values: values, 
      modalConfirm: true
    });
	}

  setUploadableImage = (e) => {
    const theImageFile = e.file.originFileObj;
    const reader  = new FileReader();
    reader.readAsDataURL(theImageFile);
    reader.addEventListener("load", () => {
      this.setState({
        uploadableImage: theImageFile,
        uploadableImageLocal: reader.result
      })
    }, false);
  }

  uploadImage = () => {
    this.setState({isLoading: true});
    
    const { uploadableImage } = this.state;

    const upload = new Slingshot.Upload("gatheringImageUpload");
    const timeStamp = Math.floor(Date.now());
    
    upload.send(uploadableImage, (error, downloadUrl) => {
      if (error) {
        console.error('Error uploading:', error);
      } else {
        this.setState({
          uploadedImage: downloadUrl
        });
        this.createGathering(downloadUrl);
      }
    });
  }

	createGathering = (uploadedImage) => {
    const { values } = this.state;

    Meteor.call('createGathering', values, uploadedImage, (error, result) => {
      if (error) {
        this.setState({
          isLoading: false,
          isError: true
        });
      } else {
        this.setState({
          isLoading: false,
          newGatheringId: result,
          isSuccess: true
        });
      }
    });
  }

  hideModal = () => this.setState({modalConfirm: false})
  showModal = () => this.setState({modalConfirm: true})
 
  render() {

    if (!this.props.currentUser) {
      return (
        <div style={{maxWidth: 600, margin: '0 auto'}}>
          <Alert
            message="You have to signup and become an active member in order to initiate a creation at Noden"
            type="error"
          />
        </div>
      )
    }

    const { modalConfirm, values, isLoading, isSuccess, newGatheringId, uploadedImage, uploadableImage, uploadableImageLocal } = this.state;

    if (isSuccess) {
      successCreation();
      return <Redirect to={`/gathering/${newGatheringId}`} />
    }

    return (
    	<div style={{padding: 24}}>
        <h1>Organise an activity</h1>
        <Row gutter={48}>
          <Col xs={24} sm={24} md={16}>
    	      <CreateGatheringForm
    	      	values={values}
    	      	registerGatheringLocally={this.registerGatheringLocally}
              setUploadableImage={this.setUploadableImage}
              uploadableImage={this.state.uploadableImage}
    	      />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Affix offsetTop={50}>
              <Alert
                message={sideNote}
                type="warning"
                showIcon
              />
            </Affix>
          </Col>
        </Row>
  	    { modalConfirm
          ?
            <ModalArticle
              imageSrc={uploadableImageLocal}
              item={values}
              isLoading={isLoading}
              title="Overview The Information"
              visible={modalConfirm}
              onOk={this.uploadImage}
              onCancel={this.hideModal}
              okText="Confirm"
              cancelText="Go back and edit"
            />
          : null
        }

       </div>
    )
  }
}

export default NewGathering;