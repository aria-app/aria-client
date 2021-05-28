export type InteractionOverlay = (baseBgColor: string) => string;

export const interactionOverlay: InteractionOverlay = (baseBgColor) => `
	&::after {
		background-color: ${baseBgColor};
		bottom: 0;
		content: '';
		display: block;
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
	}
	&:hover::after {
		opacity: 0.075;
	}
	&:active::after {
		opacity: 0.15;
	}
`;
