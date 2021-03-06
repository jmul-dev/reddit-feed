import * as React from "react";
import { Wrapper, Title, Hr } from "./styled";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { AddComment } from "./AddComment";
import { ListComments } from "./ListComments/";
import * as _ from "lodash";

const buildCommentsHierarchy = (comments) => {
	if (!comments.length) {
		return [];
	}

	const _comments = [];
	comments.forEach((comment) => {
		_comments.push({ ...comment, children: [] });
	});

	const treeData = _comments.reduce((r, a) => {
		const getParent = (s, b) => {
			return b.commentId === a.parentCommentId ? b : b.children && b.children.reduce(getParent, s);
		};

		let index = 0,
			node;
		if (a.parentCommentId > 0) {
			node = r.reduce(getParent, {});
		}
		if (node && Object.keys(node).length) {
			node.children = node.children || [];
			node.children.push(a);
		} else {
			while (index < r.length) {
				if (r[index].parentCommentId === a.commentId) {
					a.children = (a.children || []).concat(r.splice(index, 1));
				} else {
					index++;
				}
			}
			r.push(a);
		}
		return r;
	}, []);

	return treeData;
};

class Comments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			course: 'Intro to HTML',
			users: [
				{
					id: 1,
					name: 'Iron Man',
					points: 100
				},
				{
					id: 2,
					name: 'Spiderman',
					points: 60
				},
				{
					id: 3,
					name: 'Captain America',
					points: 70
				},
				{
					id: 4,
					name: 'Nick Fury',
					points: 150
				}
			],
			loggedInUserId: 4,
			comments: [
				{
					userId: 1,
					commentId: 1,
					parentCommentId: 0,
					comment: 'Ayo mari kita belajar HTML',
					timestamp: Math.floor(Date.now() / 1000) - 3600
				},
				{
					userId: 2,
					commentId: 2,
					parentCommentId: 1,
					comment: 'Yuk lah',
					timestamp: Math.floor(Date.now() / 1000) - 60
				},
				{
					userId: 3,
					commentId: 3,
					parentCommentId: 2,
					comment: 'Lo dah sign up blm gan?',
					timestamp: Math.floor(Date.now() / 1000) - 10
				},
				{
					userId: 2,
					commentId: 4,
					parentCommentId: 0,
					comment: 'Eh ayo mari gabung dengan kita!',
					timestamp: Math.floor(Date.now() / 1000) - 2
				}
			],
			sortBy: "timestamp"
		};
		this.initialState = this.state;
		this.sortBy = this.sortBy.bind(this);
		this.handleAddComment = this.handleAddComment.bind(this);
	}

	sortBy(key) {
		this.setState({ sortBy: key });
	}

	handleAddComment(parentCommentId, comment) {
		const { comments, loggedInUserId } = this.state;
		const _comment = {
			userId: loggedInUserId,
			commentId: comments.length+1,
			parentCommentId: parentCommentId || 0,
			comment,
			timestamp: Math.floor(Date.now() / 1000)
		};
		comments.push(_comment);
		this.setState({ comments });
	}

	render() {
		const { course, users, comments, sortBy, loggedInUserId } = this.state;
		const userInfo = users.find(user => user.id === loggedInUserId);

		let _commentsHierarchy = [];
		if (comments && comments.length) {
			const _comments = [];
			comments.forEach((_comment) => {
				const _user = users.find((user) => user.id === _comment.userId);
				if (_user) {
					_comments.push({
						name: _user.name,
						points: _user.points,
						..._comment
					});
				}
			});
			const _sortedComments = _.orderBy(_comments, ["timestamp"], ["asc"]);
			_commentsHierarchy = buildCommentsHierarchy(_sortedComments);
		}

		return (
			<Wrapper className="padding-40">
				<Wrapper className="margin-bottom-20">
					<Title className="medium margin-top-20 margin-bottom-0">{course}</Title>
					Currently Logged-in as: <b>{userInfo.name}</b>
				</Wrapper>
				<AddComment handleAddComment={this.handleAddComment} />
				<Hr />
				{_commentsHierarchy.length > 0 && (
					<Wrapper>
						<Wrapper className="margin-bottom-20">
							<DropdownButton id="sort-button" title="Sort By" size="sm">
								<Dropdown.Item as="button" onSelect={() => this.sortBy("points")}>
									Points
								</Dropdown.Item>
								<Dropdown.Item as="button" onSelect={() => this.sortBy("commentId")}>
									Timestamp
								</Dropdown.Item>
							</DropdownButton>
						</Wrapper>
						<ListComments users={users} comments={_commentsHierarchy} sortBy={sortBy} handleAddComment={this.handleAddComment} />
					</Wrapper>
				)}
			</Wrapper>
		);
	}
}

export { Comments };
