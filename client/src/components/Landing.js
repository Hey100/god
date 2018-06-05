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
        <div className="land__tuto-img">
          <img src="https://i.imgur.com/zM6hU2a.png" alt="" width="200px" />
        </div>
      );
    } else if (this.state.tutoSection === 2) {
      return (
        <div className="land__tuto-img">
          <img src="https://i.imgur.com/MTeHg5I.png" alt="" width="200px" />
        </div>
      );
    }
    if (this.state.tutoSection === 3) {
      return (
        <div className="land__tuto-img">
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
        color: '#40E0D0',
        backgroundColor: 'transparent',
        border: '3px solid #40E0D0'
      };
    }
  };

  render() {
    return <div className="land__wrap">
        <div className="land__col">
          <h1 className="land__title intro">
            Monetize Your Free Time. Join a Money Pool.  
          </h1>
        </div>
        <div className="land__col">
          <h1 className="land__title">How it works</h1>
          <div className="land__tuto">
            {this.handleTutorial()}
            <div className="land__tuto-content">
              <div className="land__tuto-content-box" onClick={() => this.setState(
                    { tutoSection: 1 }
                  )}>
                <button style={this.handleSelected(1)}>1</button>
                <div>
                  <h1>Join or create a pool</h1>
                  <h2>Search through existing money pools or create a unique pool where you set the interest rate, contributors, and start date.</h2>
                </div>
              </div>
              <div className="land__tuto-content-box" onClick={() => this.setState(
                    { tutoSection: 2 }
                  )}>
                <button style={this.handleSelected(2)}>2</button>
                <div>
                  <h1>Pick the day you want to get your money</h1>
                  <h2>Select a position in a pool and decide when to get your money. </h2>
                </div>
              </div>
              <div className="land__tuto-content-box" onClick={() => this.setState(
                    { tutoSection: 3 }
                  )}>
                <button style={this.handleSelected(3)}>3</button>
                <div>
                  <h1>Enjoy your money</h1>
                  <h2>When it's your turn to receive money, we'll deposit it into your account.  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="land__col">
          <h1 className="land__title">
            Join a community of like-minded hobbyists with the same interests as
            you
          </h1>
          <div className="land__categ">
            <div>
              <div className="land__circle cat-1" style={{ width: "200px", height: "200px" }}>
                <h1>SPORTS</h1>
                <h1>78 POOLS</h1>
              </div>
            </div>
            <div>
              <div className="land__circle cat-2" style={{ width: "130px", height: "130px" }}>
                <h1>TRAVEL</h1>
                <h1>18 POOLS</h1>
              </div>
            </div>
            <div>
              <div className="land__circle cat-3" style={{ width: "140px", height: "140px" }}>
                <h1>BUSINESS</h1>
                <h1>25 POOLS</h1>
              </div>
            </div>
            <div>
              <div className="land__circle cat-4" style={{ width: "150px", height: "150px" }}>
                <h1>TECH</h1>
                <h1>23 POOLS</h1>
              </div>
            </div>
            <div>
              <div className="land__circle cat-5" style={{ width: "200px", height: "200px" }}>
                <h1>HOME</h1>
                <h1>70 POOLS</h1>
              </div>
            </div>
            <div>
              <div className="land__circle cat-6" style={{ width: "250px", height: "250px" }}>
                <h1>MANY OTHERS</h1>
                <h1>160 POOLS</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="land__col">
          <h1 className="land__title">
            Here at Pooli we take security to the next level.
          </h1>
          <div className="land__cards">
            <div className="land__card">
              <VerifiedIcon size={150} color="#414141" />
              <p>High security standards and encryption protocols.</p>
            </div>
            <div className="land__card">
              <FinanceIcon size={150} color="#414141" />
              <p>Structured and well organized platform.</p>
            </div>
            <div className="land__card">
              <AccountMultipleIcon size={150} color="#414141" />
              <p>Trustworthy and financially responsible users.</p>
            </div>
          </div>
          <a className="big-btn" href="/signin">
            JOIN
          </a>
        </div>
      </div>;
  }
}

const mstp = ({ auth }) => {
  return { auth };
};

export default connect(mstp)(Landing);
