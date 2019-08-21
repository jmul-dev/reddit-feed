import * as React from "react";
import { Wrapper, MediumEditor, Button, Error } from "./styled";

class AddComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			error: false,
			errorMessage: "",
			formLoading: false
		};
		this.handleEditorChange = this.handleEditorChange.bind(this);
	}

	handleEditorChange(comment) {
		this.setState({ comment });
	}

	/*
	async addThought() {
		const { taoId, nameId, parentThoughtId } = this.props;
		const { thought } = this.state;
		if (!taoId || !nameId) {
			return;
		}

		this.setState({ formLoading: true });
		if (!thought) {
			this.setState({ error: true, errorMessage: "Thoughts can not be empty", formLoading: false });
			return;
		}
		try {
			const response = await graphqlInsertTAOThought(nameId, taoId, parentThoughtId || 0, thought);
			if (!response.errors) {
				this.setState({
					error: false,
					errorMessage: "",
					formLoading: false,
					thought: ""
				});
				this.props.getTAOThoughts();
				//this.props.setSuccess("Success!", `Thought was added successfully`);
				if (parentThoughtId) {
					this.props.toggleShowForm();
				}
			} else {
				this.setState({ error: true, errorMessage: response.errors[0].message, formLoading: false });
			}
		} catch (e) {
			this.setState({ error: true, errorMessage: e.message, formLoading: false });
		}
	}
	*/

	render() {
		const { parentCommentId } = this.props;
		const { comment, error, errorMessage, formLoading } = this.state;
		return (
			<Wrapper>
				<MediumEditor
					className="margin-bottom-20"
					text={comment}
					onChange={this.handleEditorChange}
					options={{ placeholder: { text: "Have any questions?" } }}
				/>
				<Button type="button" disabled={formLoading} onClick={() => this.props.addComment(comment)}>
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
