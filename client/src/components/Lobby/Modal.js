import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class LobbyModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#000';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  kickMember() {
    alert('Kick this member?')
  }

  showMembers() {
    this.props.partyMembers.map(player => {
      return <li onClick={this.kickMember.bind(this)} style={styles.fontStyles}>{player}</li>;
    })
  }

  render() {
    const { title, description } = this.props;
    return (
      <div onClick={this.openModal}>
        <button>View Group</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>{title}</h2>
          <form style={styles.buttonStyles}>
          <div style={styles.fontStyles}>{description}</div>

          <div style={styles.fontStyles} >Party Members: {this.props.partyNow}/{this.props.partyMax}</div>

          <ul style={styles.partyStyle}>
            {this.showMembers.bind(this)}
            <li onClick={this.kickMember.bind(this)} style={styles.fontStyles}>{this.props.partyMembers[0]}</li>
            <li style={styles.fontStyles}>{this.props.partyMembers[1]}</li>
            <li style={styles.fontStyles}>{this.props.partyMembers[2]}</li>
          </ul>

          <button style={styles.buttonStyles} onClick={this.joinGroup}>Join Group</button>
          <button style={styles.buttonStyles} onClick={this.closeModal}>To Lobby</button>
          </form>
        </Modal>
      </div>
    );
  }
}

const styles = {
  fontStyles: {
    color: '#000',
    marginTop: 10
  },
  buttonStyles: {
    margin: 10,
    padding: 10
  },
  partyStyle: {
    listStyle: 'none'
  }
}

const mapStateToProps = state => {
  return{
    title: 'Arthas Farm',
    description: 'Looking for the necromancer drop.',
    partyMembers: ['Colonial Spew', 'Scylol', 'Baamosk'],
    partyNow: 3,
    partyMax: 4
  }
}

export default connect(mapStateToProps)(LobbyModal);