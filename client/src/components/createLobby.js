import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './createLobby.css';
import { createGroup, saveLobbyInDatabase } from '../actions/actions';

export class CreateLobby extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      selection: {
        game: '',
        region: '',
        platform: '',
        voice: '',
        title: '',
        startTime: '',
        partySize: '',
        description: '',
        roomNumber: ''
      }
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true, selection: {...this.state.selection, roomNumber: this.props.currentUser.googleId}});
    
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  handleChange(event) {
    const category = event.target.className.split(' ')[1];
    let obj = {};
    if(category === 'game' || category === 'region' || category === 'platform') {
      obj[category] = event.target.value.toLowerCase().replace(/\s+/g, '');
    }
    else {
      obj[category] = event.target.value;
    }
    this.setState({
      modalIsOpen: true,
      selection: {
        ...this.state.selection,
        ...obj
      }
    });
  }
  _clickHandler() {
    this.props.dispatch(createGroup(this.state.selection));
    //dispatch action for create group
    //this action will be handled in the middleware
    this.props.dispatch(saveLobbyInDatabase(this.state.selection));
  }

  render() {
    return (
      <div className="modal-div">
        <button className="create-lobby-button" onClick={this.openModal}>
          Create Lobby
        </button>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <span className="close" onClick={this.closeModal}>
            &times;
          </span>
          <div className="create-lobby-header">
            <h2>Lobby Creator</h2>
          </div>
          <form className="create-lobby">
            <div className="dropdown-section">
              Game:<select
                className="user-selections game"
                onChange={event => this.handleChange(event)}
              >
                <option />
                <option>Dota 2</option>
                <option>League of Legends</option>
                <option>Overwatch</option>
                <option>Diablo 3</option>
              </select>
              Region:<select
                className="user-selections region"
                onChange={event => this.handleChange(event)}
              >
                <option />
                <option>North America</option>
                <option>Europe</option>
                <option>South America</option>
                <option>OCE</option>
              </select>
              Platform:<select
                className="user-selections platform"
                onChange={event => this.handleChange(event)}
              >
                <option />
                <option>PC</option>
                <option>Xbox</option>
                <option>PS4</option>
                <option>Switch</option>
              </select>
              Voice Required:<select
                className="user-selections voice"
                onChange={event => this.handleChange(event)}
              >
                <option />
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="text-section">
              Title:
              <input
                className="user-selections title"
                type="text"
                maxLength="35"
                onChange={event => this.handleChange(event)}
              />
              Start Time:{' '}
              <input
                className="user-selections startTime"
                type="text"
                onChange={event => this.handleChange(event)}
              />
              Ideal Party Size:<select
                className="user-selections partySize"
                onChange={event => this.handleChange(event)}
              >
                <option />
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>More Than 6</option>
              </select>
            </div>
            <div className="short-description">
              Description:{' '}
              <textarea
                rows="4"
                cols="50"
                className="dummyClass description"
                onChange={event => this.handleChange(event)}
              />
            </div>
            <Link to={'/lobby'} onClick={this.closeModal}>
              <input
                className="create-lobby-button"
                type="submit"
                value="Create Lobby"
                onClick={this._clickHandler.bind(this)}
              />
            </Link>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reducer.currentUser
  };
};

export default connect(mapStateToProps)(CreateLobby);
