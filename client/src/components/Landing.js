import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles/landing.css';
import './styles/global.css';
import './styles/media.css';

class Landing extends Component {
	state = { tutoSection: "1" }

  componentWillUpdate(nextProps) {
    const { user } = nextProps.auth
		if (user) {
      this.props.history.push('/dashboard');
    }
	}
	
	handleTutorial = () => {
		if (this.state.tutoSection == 1){
			return <div>
				one
			</div>
		} else if (this.state.tutoSection == 2){
			return <div>
				two
			</div>
		} 
		if (this.state.tutoSection == 3){
			return <div>
				three
			</div>
		} 

	}

  render() {
    return <div className="land__wrap">
        <div className="land__col">
          <h1 className="text-2">
            Zombie ipsum reversus ab viral inferno, nam rick grimes malum
						cerebro. De carne lumbering animata corpora quaeritis. Summus
						brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
            undead survivor dictum mauris. {/* Hi mindless mortuis soulless
            creaturas, imo evil stalking monstra adventus resi dentevil
            vultus comedat cerebella viventium. Qui animated corpse, cricket
            bat max brucks terribilem incessu zomby. The voodoo sacerdos
            flesh eater, suscitat mortuos comedere carnem virus. */}
          </h1>
        </div>
        <div className="land__col">
					<h1 className="text-2">
						How it works
					</h1>
					<div className="land__tuto">
						{this.handleTutorial()}
						<div>
							<h3 className="land__tuto-header" onClick={() => this.setState({ tutoSection: 1})}>One</h3>
							<h3 className="land__tuto-header" onClick={() => this.setState({ tutoSection: 2})}>Two</h3>
							<h3 className="land__tuto-header" onClick={() => this.setState({ tutoSection: 3})}>Three</h3>
						</div>
					</div>
				</div>
        <div className="land__col">
					<h1 className="text-2">
						Join a community of wise investors with the same interest as you
					</h1>
				</div>
        <div className="land__col">
					<div className="land__cards">
						<div className="land__card">
							<img src="" alt=""/>
							<p></p>
						</div>
						<div className="land__card">
							<img src="" alt=""/>
							<p></p>
						</div>
						<div className="land__card">
							<img src="" alt=""/>
							<p></p>
						</div>
					</div>
					<div className="land__card">
						<button className="big-btn">JOIN</button>
					</div>
				</div>
      </div>;
  }
}

const mstp = ({ auth }) => {
  return { auth };
};

export default connect(mstp)(Landing);
