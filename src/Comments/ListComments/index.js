import * as React from "react";
import { Wrapper } from "../styled";
import { Comment } from "./Comment/";
import * as _ from "lodash";

class ListComments extends React.Component {
	render() {
		const { users, comments, sortBy, handleAddComment } = this.props;
		if (!comments.length) {
			return null;
		}

		const _sortFields =
			sortBy === "points"
				? ["points", "timestamp"]
				: ["timestamp", "points"];
		const _sortedComments = _.orderBy(comments, _sortFields, ["desc", "desc"]);
		const commentContent = _sortedComments.map((comment) => {
			return (
				<Wrapper key={comment.commentId} className="margin-bottom-20">
					<Comment users={users} commentInfo={comment} handleAddComment={handleAddComment} />
					{comment.children.length > 0 && (
						<Wrapper className="padding-left-20">
							<ListComments
								users={users}
								comments={comment.children}
								sortBy={sortBy}
								handleAddComment={handleAddComment}
							/>
						</Wrapper>
					)}
				</Wrapper>
			);
		});

		return <Wrapper>{commentContent}</Wrapper>;
	}
}

export { ListComments };
