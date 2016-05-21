import React, { Component } from "react";

export default class LikeButton extends Component {
	constructor(props) {
		super(props);

		console.log('wtf!');

		this.state = {
			hovered: false,
			count: 999,
			liked: false
		}
	}
	styles() {
		return {
			container: {
				fontFamily: "helvetica",
				fontSize: 11
			},
			like: {
				display: "inline-block",
				background: "#3b5998",
				padding: "0 5px",
				borderRadius: 2,
				color: "#fff",
				cursor: "pointer",
				float: "left",
				height: 20,
				lineHeight: "20px"
			},
			likeHover: {
				background: "#444"
			},
			counterBefore: {
				display: "block",
				float: "left",
				width: 6,
				height: 6,
				background: "#fafafa",
				margin: "6px 0 0 -12px",
				borderRight: 10,
				transform: "rotate(45deg)",
				WebkitTransform: "rotate(45deg)",
				borderLeft: "1px solid #aaa",
				borderBottom: "1px solid #aaa"
			},
			counter: {
		        display: "block",
		        background: "#fafafa",
		        boxSizing: "border-box",
		        border: "1px solid #aaa",
		        float: "left",
		        padding: "0px 8px",
		        borderRadius: 2,
		        marginLeft: 8,
		        height: 20,
		        lineHeight: "20px"
		    }
		}
	}
	onMouseEnter() {
		this.setState({hovered: true});
	}
	onMouseLeave() {
		this.setState({hovered: false});
	}
	onClick() {
		this.setState({
			count: this.state.count + (this.state.liked ? -1 : 1),
			liked: !this.state.liked
		})
	}
	render() {
		const styles = this.styles();
		const likeStyle = this.state.hovered ? {...styles.like, ...styles.likeHover} : styles.like;
		console.log(this.state);
		return (
			<span style={styles.container}>
				<span
					style={likeStyle}
					onMouseEnter={::this.onMouseEnter}
					onMouseLeave={::this.onMouseLeave}
					onClick={::this.onClick}>{this.state.liked ? "✔" : ""}いいね！</span>
				<span style={styles.counter}>
					<span style={styles.counterBefore}>{" "}</span>999
				</span>
			</span>
		);
	}
}