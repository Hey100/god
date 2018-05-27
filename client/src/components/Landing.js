import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VerifiedIcon, AccountMultipleIcon, FinanceIcon } from 'mdi-react';

import './styles/landing.css';
import './styles/global.css';
import './styles/media.css';

class Landing extends Component {
  state = { tutoSection: 1 };
  mounted = true;
  carouselInterval = null;

  componentDidMount() {
    this.carouselInterval = setInterval(() => {
      if (this.state.tutoSection === 3) {
        this.mounted && this.setState({ tutoSection: 0 });
      }
      this.mounted &&
        this.setState({ tutoSection: this.state.tutoSection + 1 });
    }, 5000);
  }

  componentWillUnmount() {
    this.mounted = false;
    clearInterval(this.carouselInterval);
  }

  componentWillUpdate(nextProps) {
    const { user } = nextProps.auth;
    if (user) {
      this.props.history.push('/dashboard');
    }
  }

  handleTutorial = () => {
    if (this.state.tutoSection === 1) {
      return (
        <div>
          <img src="https://i.imgur.com/zM6hU2a.png" alt="" width="200px" />
        </div>
      );
    } else if (this.state.tutoSection === 2) {
      return (
        <div>
          <img src="https://i.imgur.com/MTeHg5I.png" alt="" width="200px" />
        </div>
      );
    }
    if (this.state.tutoSection === 3) {
      return (
        <div>
          <img src="https://i.imgur.com/fOIvDo9.png" alt="" width="200px" />
        </div>
      );
    }
  };

  handleSelected = num => {
    if (this.state.tutoSection === num) {
      return { backgroundColor: '#40E0D0', color: '#FFF' };
    } else {
      return {
        backgroundColor: '#FFF',
        color: '#40E0D0',
        border: '1px solid #40E0D0'
      };
    }
  };

  render() {
    return (
      <div className="land__wrap">
        <div className="land__col">
          <h1 className="land__title">
            Zombie ipsum reversus ab viral inferno, nam rick grimes malum
            cerebro. De carne lumbering animata corpora quaeritis. Summus brains
            sit​​, morbo vel maleficia? De apocalypsi gorger omero undead
            survivor dictum mauris.{' '}
            {/* Hi mindless mortuis soulless
            creaturas, imo evil stalking monstra adventus resi dentevil
            vultus comedat cerebella viventium. Qui animated corpse, cricket
            bat max brucks terribilem incessu zomby. The voodoo sacerdos
            flesh eater, suscitat mortuos comedere carnem virus. */}
          </h1>
        </div>
        <div className="land__col">
          <h1 className="land__title">How it works</h1>
          <div className="land__tuto">
            {this.handleTutorial()}
            <div>
              <div
                className="land__tuto-header"
                onClick={() => this.setState({ tutoSection: 1 })}
              >
                <button style={this.handleSelected(1)}>1</button>
                <div>
                  <h1>Join or create a pool</h1>
                  <h2>blah blah blah</h2>
                </div>
              </div>
              <div
                className="land__tuto-header"
                onClick={() => this.setState({ tutoSection: 2 })}
              >
                <button style={this.handleSelected(2)}>2</button>
                <div>
                  <h1>Pick the day you want to get your money</h1>
                  <h2>blah blah blah</h2>
                </div>
              </div>
              <div
                className="land__tuto-header"
                onClick={() => this.setState({ tutoSection: 3 })}
              >
                <button style={this.handleSelected(3)}>3</button>
                <div>
                  <h1>Enjoy your money</h1>
                  <h2>blah blah blah</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="land__col">
          <h1 className="land__title">
            Join a community of wise investors with the same interests as you
          </h1>
          <div className="land__categ">
            <div>
              <div
                className="land__circle cat-1"
                style={{ width: '200px', height: '200px' }}
              >
                SPORTS
              </div>
            </div>
            <div>
              <div
                className="land__circle cat-2"
                style={{ width: '130px', height: '130px' }}
              >
                TRAVEL
              </div>
            </div>
            <div>
              <div
                className="land__circle cat-3"
                style={{ width: '140px', height: '140px' }}
              >
                BUSINESS
              </div>
            </div>
            <div>
              <div
                className="land__circle cat-4"
                style={{ width: '150px', height: '150px' }}
              >
                TECH
              </div>
            </div>
            <div>
              <div
                className="land__circle cat-5"
                style={{ width: '200px', height: '200px' }}
              >
                HOME
              </div>
            </div>
            <div>
              <div
                className="land__circle cat-6"
                style={{ width: '250px', height: '250px' }}
              >
                MANY OTHERS
              </div>
            </div>
          </div>
        </div>
        <div className="land__col">
          <div className="land__cards">
            <div className="land__card">
              <VerifiedIcon size={150} color="#414141" />
              <p>High security standards and encription protocols.</p>
            </div>
            <div className="land__card">
              <FinanceIcon size={150} color="#414141" />
              <p>Structured and well organized platform.</p>
            </div>
            <div className="land__card">
              <AccountMultipleIcon size={150} color="#414141" />
              <p>Thrusworthy and financially responsible users.</p>
            </div>
          </div>
          <button className="big-btn">JOIN</button>
        </div>
      </div>
    );
  }
}

const mstp = ({ auth }) => {
  return { auth };
};

export default connect(mstp)(Landing);
