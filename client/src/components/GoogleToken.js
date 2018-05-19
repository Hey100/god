import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/index'

class GoogleToken extends Component {
	componentDidMount() {
		const { boo, id } = this.props.match.params
		const { history } = this.props
		console.log(this.props.match.params)
		const token =  this.props.match.params.id
		localStorage.setItem('token', token)
		console.log( typeof boo)
		boo == 'true' ? history.push('/dashboard') : this.props.googleSignUp(history)
	}
	
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default connect(null, actions)(GoogleToken)
