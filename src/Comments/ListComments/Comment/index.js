import * as React from "react";
import { Wrapper } from "../../styled";
import { UserContainer, PointsContainer, Divider, TimeContainer, Reply } from "./styled";
import { AddComment } from "../../AddComment";

const timeSince = (timestamp) => {
	const seconds = Math.floor((new Date() - timestamp * 1000) / 1000);
	if (seconds < 1) {
		return "0 seconds";
	}
	let interval = Math.floor(seconds / 31536000);
	if (interval >= 1) {
		return interval + " years";
	}
	interval = Math.floor(seconds / 2592000);
	if (interval >= 1) {
		return interval + " months";
	}
	interval = Math.floor(seconds / 86400);
	if (interval >= 1) {
		return interval + " days";
	}
	interval = Math.floor(seconds / 3600);
	if (interval >= 1) {
		return interval + " hours";
	}
	interval = Math.floor(seconds / 60);
	if (interval >= 1) {
		return interval + " minutes";
	}
	return Math.floor(seconds) + " seconds";
};

class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showForm: false };
		this.toggleShowForm = this.toggleShowForm.bind(this);
	}

	toggleShowForm() {
		this.setState({ showForm: !this.state.showForm });
	}

	render() {
		const { users, commentInfo, handleAddComment } = this.props;
		const { showForm } = this.state;
		if (!users || !commentInfo) {
			return null;
		}
		const userInfo = users.find((user) => user.id === commentInfo.userId);
		if (!userInfo) {
			return null;
		}
		return (
			<Wrapper className="margin-bottom-20">
				<Wrapper className="small">
					<UserContainer>{userInfo.name}</UserContainer>
					<PointsContainer>{userInfo.points} points</PointsContainer>
					<Divider>&#183;</Divider>
					<TimeContainer>{timeSince(commentInfo.timestamp)} ago</TimeContainer>
				</Wrapper>
				<Wrapper className="small">{commentInfo.comment}</Wrapper>
				{!showForm ? (
					<Reply onClick={this.toggleShowForm}>
						Reply
					</Reply>
				) : (
					<AddComment
						parentCommentId={commentInfo.commentId}
						toggleShowForm={this.toggleShowForm}
						handleAddComment={handleAddComment}
					/>
				)}
			</Wrapper>
		);
	}
}

export { Comment };
