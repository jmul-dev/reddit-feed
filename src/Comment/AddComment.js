import * as React from "react";
import { Wrapper, Textarea, Button, Error } from "./styled";

class AddComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			error: false,
			errorMessage: "",
			formLoading: false
		};
		this.handleTextareaChange = this.handleTextareaChange.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	handleTextareaChange(event) {
		this.setState({ comment: event.target.value });
	}

	addComment() {
		const { parentCommentId } = this.props;
		const { comment } = this.state;

		if (!comment) {
			this.setState({ error: true, errorMessage: "Comment can not be empty", formLoading: false });
			return;
		}
		this.props.handleAddComment(parentCommentId, comment);
	}

	render() {
		const { parentCommentId } = this.props;
		const { comment, error, errorMessage, formLoading } = this.state;
		return (
			<Wrapper>
				<Textarea
					value={comment}
					className="margin-bottom-20"
					onChange={this.handleTextareaChange}
					placeholder={`Yoooo what's up?`}
				/>
				<Button type="button" disabled={formLoading} onClick={this.addComment}>
					{formLoading ? "Loading..." : "Submit"}
				</Button>
				{parentCommentId > 0 && (
					<Button className="no-bg margin-left" type="button" disabled={formLoading} onClick={this.props.toggleShowForm}>
						Cancel
					</Button>
				)}
				{error && errorMessage && <Error>{errorMessage}</Error>}
			</Wrapper>
		);
	}
}

export { AddComment };
