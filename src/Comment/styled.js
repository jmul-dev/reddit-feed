import styled from "styled-components";

export const Wrapper = styled.div`
	font-size: 1em;

	&.padding-left-20 {
		padding-left: 20px;
	}
	&.margin-top-20 {
		margin-top: 20px;
	}
	&.margin-top-30 {
		margin-top: 30px;
	}
	&.margin-top-40 {
		margin-top: 40px;
	}
	&.margin-bottom-20 {
		margin-bottom: 20px;
	}
	&.margin-bottom-30 {
		margin-bottom: 30px;
	}
	&.margin-bottom-40 {
		margin-bottom: 40px;
	}
	&.padding-40 {
		padding: 40px;
	}
	&.padding-20 {
		padding: 20px;
	}
	&.dark-bg {
		background-color: #000000;
	}
	&.center {
		text-align: center;
	}
	&.white {
		color: #ffffff;
	}
	&.small {
		font-size: 0.875em;
	}
	&.tx-hash {
		font-size: 0.75em;
		margin-top: 10px;
		width: 90%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	&.tx-hash-small {
		font-size: 0.7em;
		margin-top: 3px;
		width: 90%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
`;

export const Title = styled.div`
	font-size: 1.5em;
	font-weight: 500;
	margin-bottom: 40px;

	&.small {
		font-size: 0.875em;
	}
	&.medium {
		font-size: 2.5em;
	}
	&.big {
		font-size: 4em;
		margin-bottom: 5px;
	}
	&.margin-bottom-0 {
		margin-bottom: 0;
	}
	&.margin-top {
		margin-top: 40px;
	}
	&.margin-top-20 {
		margin-top: 20px;
	}
`;

export const Header = styled.div`
	font-size: 0.875em;
	margin: 10px 0;

	&.strong {
		font-weight: 800;
	}
`;

export const Hr = styled.hr`
	background-color: rgba(255, 255, 255, 0.2);
`;
