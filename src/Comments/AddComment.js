import * as React from "react";
import { Wrapper, Textarea, Button, Error } from "./styled";

class AddComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			error: false,
			errorMessage: ""
		};
		this.handleTextareaChange = this.handleTextareaChange.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	handleTextareaChange(event) {
		this.setState({ comment: event.target.value });
	}

	addComment() {
		const { parentCommentId, handleAddComment, toggleShowForm } = this.props;
		const { comment } = this.state;

		if (!comment) {
			this.setState({ error: true, errorMessage: "Comment can not be empty" });
			return;
		}
		handleAddComment(parentCommentId, comment);
		this.setState({error: false, errorMessage: "", comment: ""});
		if (toggleShowForm) {
			toggleShowForm();
		}
	}

	render() {
		const { parentCommentId, toggleShowForm } = this.props;
		const { comment, error, errorMessage } = this.state;
		return (
			<Wrapper>
				<Textarea
					value={comment}
					className="margin-bottom-20"
					onChange={this.handleTextareaChange}
					placeholder={`Yoooo what's up?`}
				/>
				<Button type="button" onClick={this.addComment}>
					Submit
				</Button>
				{parentCommentId > 0 && (
					<Button className="no-bg margin-left" type="button" onClick={toggleShowForm}>
						Cancel
					</Button>
				)}
				{error && errorMessage && <Error>{errorMessage}</Error>}
			</Wrapper>
		);
	}
}

export { AddComment };
