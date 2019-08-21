import * as React from "react";
import { Wrapper } from "../../styled";
import { UserContainer, PointsContainer, Divider, TimeContainer, Reply } from "./styled";
import { AddComment } from "../../AddComment";

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
		const { users, commentInfo } = this.props;
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
					/>
				)}
			</Wrapper>
		);
	}
}

export { Comment };
